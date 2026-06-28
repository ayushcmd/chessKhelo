import { useState, useCallback } from 'react';
import { Chess, Square } from 'chess.js';
import { Difficulty } from '../../../shared/constants/appConfig';
import { makeMove, isValidMove, getCheckedKingSquare } from '../utils/moveValidator';
import { getLegalMovesForSquare, isGameOver, getGameResult } from '../utils/boardHelpers';
import { getBestMove, parseMoveString } from '../utils/stockfishBridge';

export type GameMode = 'ai' | 'friend';

interface ChessEngineState {
  chess: Chess;
  selectedSquare: Square | null;
  legalMoves: Square[];
  checkedKing: Square | null;
  isGameOver: boolean;
  gameResult: string | null;
  winner: 'w' | 'b' | null;
  isAIThinking: boolean;
  lastMove: { from: Square; to: Square } | null;
}

export const useChessEngine = (mode: GameMode, difficulty: Difficulty) => {
  const [state, setState] = useState<ChessEngineState>({
    chess: new Chess(),
    selectedSquare: null,
    legalMoves: [],
    checkedKing: null,
    isGameOver: false,
    gameResult: null,
    winner: null,
    isAIThinking: false,
    lastMove: null,
  });

  const handleSquarePress = useCallback(
    async (square: Square) => {
      if (state.isGameOver || state.isAIThinking) return;

      // If AI mode and it's black's turn, ignore
      if (mode === 'ai' && state.chess.turn() === 'b') return;

      const { chess, selectedSquare } = state;

      // If a square is already selected
      if (selectedSquare) {
        // Try to make move
        if (isValidMove(chess, selectedSquare, square)) {
          const move = makeMove(chess, selectedSquare, square);
          if (move) {
            const checkedKing = getCheckedKingSquare(chess);
            const gameOver = isGameOver(chess);
            const result = gameOver ? getGameResult(chess) : null;
            const winner = gameOver
              ? result === 'checkmate'
                ? (chess.turn() === 'w' ? 'b' : 'w')
                : null
              : null;

            setState((prev) => ({
              ...prev,
              selectedSquare: null,
              legalMoves: [],
              checkedKing,
              isGameOver: gameOver,
              gameResult: result,
              winner,
              lastMove: { from: selectedSquare, to: square },
              isAIThinking: mode === 'ai' && !gameOver,
            }));

            // AI move
            if (mode === 'ai' && !gameOver) {
              setTimeout(async () => {
                const bestMove = await getBestMove(chess, difficulty);
                if (bestMove) {
                  const { from, to } = parseMoveString(bestMove);
                  makeMove(chess, from as Square, to as Square);
                  const afterCheckedKing = getCheckedKingSquare(chess);
                  const afterGameOver = isGameOver(chess);
                  const afterResult = afterGameOver ? getGameResult(chess) : null;
                  const afterWinner = afterGameOver
                    ? afterResult === 'checkmate'
                      ? (chess.turn() === 'w' ? 'b' : 'w')
                      : null
                    : null;

                  setState((prev) => ({
                    ...prev,
                    isAIThinking: false,
                    checkedKing: afterCheckedKing,
                    isGameOver: afterGameOver,
                    gameResult: afterResult,
                    winner: afterWinner,
                    lastMove: { from: from as Square, to: to as Square },
                  }));
                }
              }, 500);
            }
            return;
          }
        }

        // Clicked same square — deselect
        if (selectedSquare === square) {
          setState((prev) => ({ ...prev, selectedSquare: null, legalMoves: [] }));
          return;
        }

        // Clicked own piece — select new piece
        const piece = chess.get(square);
        if (piece && piece.color === chess.turn()) {
          const legalMoves = getLegalMovesForSquare(chess, square);
          setState((prev) => ({ ...prev, selectedSquare: square, legalMoves }));
          return;
        }

        // Clicked empty/enemy with no valid move — deselect
        setState((prev) => ({ ...prev, selectedSquare: null, legalMoves: [] }));
        return;
      }

      // No square selected — select piece
      const piece = chess.get(square);
      if (piece && piece.color === chess.turn()) {
        const legalMoves = getLegalMovesForSquare(chess, square);
        setState((prev) => ({ ...prev, selectedSquare: square, legalMoves }));
      }
    },
    [state, mode, difficulty]
  );

  const resetGame = useCallback(() => {
    setState({
      chess: new Chess(),
      selectedSquare: null,
      legalMoves: [],
      checkedKing: null,
      isGameOver: false,
      gameResult: null,
      winner: null,
      isAIThinking: false,
      lastMove: null,
    });
  }, []);

  return {
    chess: state.chess,
    selectedSquare: state.selectedSquare,
    legalMoves: state.legalMoves,
    checkedKing: state.checkedKing,
    isGameOver: state.isGameOver,
    gameResult: state.gameResult,
    winner: state.winner,
    isAIThinking: state.isAIThinking,
    lastMove: state.lastMove,
    handleSquarePress,
    resetGame,
    currentTurn: state.chess.turn(),
  };
};