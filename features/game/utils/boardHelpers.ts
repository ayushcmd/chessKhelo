import { Chess, Square } from 'chess.js';
import { FILES, RANKS } from '../constants/pieceConfig';
import { GAME_CONFIG } from '../constants/gameConfig';

export const getSquareColor = (row: number, col: number): string => {
  const isLight = (row + col) % 2 === 0;
  return isLight ? GAME_CONFIG.board.lightSquare : GAME_CONFIG.board.darkSquare;
};

export const getHighlightColor = (row: number, col: number): string => {
  const isLight = (row + col) % 2 === 0;
  return isLight
    ? GAME_CONFIG.board.highlightLight
    : GAME_CONFIG.board.highlightDark;
};

export const getSelectedColor = (row: number, col: number): string => {
  const isLight = (row + col) % 2 === 0;
  return isLight
    ? GAME_CONFIG.board.selectedLight
    : GAME_CONFIG.board.selectedDark;
};

export const rowColToSquare = (row: number, col: number): Square => {
  const file = FILES[col];
  const rank = RANKS[row];
  return `${file}${rank}` as Square;
};

export const squareToRowCol = (square: Square): { row: number; col: number } => {
  const file = square[0];
  const rank = square[1];
  const col = FILES.indexOf(file);
  const row = RANKS.indexOf(rank);
  return { row, col };
};

export const getLegalMovesForSquare = (
  chess: Chess,
  square: Square
): Square[] => {
  const moves = chess.moves({ square, verbose: true });
  return moves.map((move) => move.to as Square);
};

export const isGameOver = (chess: Chess): boolean => {
  return chess.isGameOver();
};

export const getGameResult = (chess: Chess): string => {
  if (chess.isCheckmate()) return 'checkmate';
  if (chess.isDraw()) return 'draw';
  if (chess.isStalemate()) return 'stalemate';
  if (chess.isThreefoldRepetition()) return 'threefold';
  if (chess.isInsufficientMaterial()) return 'insufficient';
  return 'unknown';
};