import { useMemo } from 'react';
import { Chess } from 'chess.js';

interface MoveRecord {
  moveNumber: number;
  white: string;
  black: string;
}

export const useMoveHistory = (chess: Chess) => {
  const history = useMemo(() => {
    const moves = chess.history();
    const records: MoveRecord[] = [];

    for (let i = 0; i < moves.length; i += 2) {
      records.push({
        moveNumber: Math.floor(i / 2) + 1,
        white: moves[i] ?? '',
        black: moves[i + 1] ?? '',
      });
    }

    return records;
  }, [chess.fen()]);

  const lastMove = useMemo(() => {
    const moves = chess.history();
    return moves.length > 0 ? moves[moves.length - 1] : null;
  }, [chess.fen()]);

  const totalMoves = chess.history().length;

  return {
    history,
    lastMove,
    totalMoves,
  };
};