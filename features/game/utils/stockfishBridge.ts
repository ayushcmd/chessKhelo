import { Chess } from 'chess.js';
import { GAME_CONFIG } from '../constants/gameConfig';
import { Difficulty } from '../../../shared/constants/appConfig';

// Stockfish runs via WebAssembly in React Native
// For now we use a simple random move AI as placeholder
// Real Stockfish WASM will be integrated in next phase

export const getBestMove = async (
  chess: Chess,
  difficulty: Difficulty
): Promise<string | null> => {
  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) return null;

  if (difficulty === 'easy') {
    // Random move
    const randomMove = moves[Math.floor(Math.random() * moves.length)];
    return `${randomMove.from}${randomMove.to}`;
  }

  if (difficulty === 'medium') {
    // Prefer captures
    const captures = moves.filter((m) => m.captured);
    const pool = captures.length > 0 ? captures : moves;
    const move = pool[Math.floor(Math.random() * pool.length)];
    return `${move.from}${move.to}`;
  }

  // Hard — prefer captures + checks
  const captures = moves.filter((m) => m.captured);
  const checks = moves.filter((m) => m.san.includes('+'));
  const pool =
    checks.length > 0 ? checks : captures.length > 0 ? captures : moves;
  const move = pool[Math.floor(Math.random() * pool.length)];
  return `${move.from}${move.to}`;
};

export const parseMoveString = (
  moveStr: string
): { from: string; to: string } => {
  return {
    from: moveStr.slice(0, 2),
    to: moveStr.slice(2, 4),
  };
};