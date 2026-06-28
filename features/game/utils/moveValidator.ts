import { Chess, Square, Move } from 'chess.js';

export const isValidMove = (
  chess: Chess,
  from: Square,
  to: Square
): boolean => {
  const moves = chess.moves({ square: from, verbose: true });
  return moves.some((move) => move.to === to);
};

export const makeMove = (
  chess: Chess,
  from: Square,
  to: Square
): Move | null => {
  try {
    const move = chess.move({ from, to, promotion: 'q' });
    return move;
  } catch {
    return null;
  }
};

export const isPromotion = (
  chess: Chess,
  from: Square,
  to: Square
): boolean => {
  const piece = chess.get(from);
  if (!piece || piece.type !== 'p') return false;
  const toRank = to[1];
  if (piece.color === 'w' && toRank === '8') return true;
  if (piece.color === 'b' && toRank === '1') return true;
  return false;
};

export const isInCheck = (chess: Chess): boolean => {
  return chess.inCheck();
};

export const getCheckedKingSquare = (chess: Chess): Square | null => {
  if (!chess.inCheck()) return null;
  const board = chess.board();
  const currentTurn = chess.turn();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece && piece.type === 'k' && piece.color === currentTurn) {
        const file = String.fromCharCode(97 + col);
        const rank = String.fromCharCode(49 + (7 - row));
        return `${file}${rank}` as Square;
      }
    }
  }
  return null;
};