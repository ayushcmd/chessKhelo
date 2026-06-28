import { Chess } from 'chess.js';
import { Difficulty } from '../../../shared/constants/appConfig';
import { stockfishEngine } from './stockfishWorker';
import { Platform } from 'react-native';

const DEPTH_MAP: Record<Difficulty, number> = {
  easy: 2,
  medium: 8,
  hard: 18,
};

let engineInitialized = false;

const initEngine = () => {
  if (!engineInitialized && Platform.OS === 'web') {
    stockfishEngine.init();
    engineInitialized = true;
  }
};

// Fallback AI for native or when Stockfish fails
const getFallbackMove = (
  chess: Chess,
  difficulty: Difficulty
): string | null => {
  const moves = chess.moves({ verbose: true });
  if (moves.length === 0) return null;

  if (difficulty === 'easy') {
    const move = moves[Math.floor(Math.random() * moves.length)];
    return `${move.from}${move.to}`;
  }

  if (difficulty === 'medium') {
    const captures = moves.filter((m) => m.captured);
    const pool = captures.length > 0 ? captures : moves;
    const move = pool[Math.floor(Math.random() * pool.length)];
    return `${move.from}${move.to}`;
  }

  // Hard
  const captures = moves.filter((m) => m.captured);
  const checks = moves.filter((m) => m.san.includes('+'));
  const pool =
    checks.length > 0
      ? checks
      : captures.length > 0
      ? captures
      : moves;
  const move = pool[Math.floor(Math.random() * pool.length)];
  return `${move.from}${move.to}`;
};

export const getBestMove = (
  chess: Chess,
  difficulty: Difficulty
): Promise<string | null> => {
  return new Promise((resolve) => {
    // Easy always uses fallback — faster, less computation
    if (difficulty === 'easy') {
      setTimeout(() => {
        resolve(getFallbackMove(chess, difficulty));
      }, 300);
      return;
    }

    if (Platform.OS === 'web') {
      try {
        initEngine();
        const depth = DEPTH_MAP[difficulty];
        stockfishEngine.setDepth(depth);

        const timeout = setTimeout(() => {
          resolve(getFallbackMove(chess, difficulty));
        }, 5000);

        stockfishEngine.getBestMove(chess.fen(), (move) => {
          clearTimeout(timeout);
          if (move && move.length >= 4) {
            resolve(move);
          } else {
            resolve(getFallbackMove(chess, difficulty));
          }
        });
      } catch {
        resolve(getFallbackMove(chess, difficulty));
      }
    } else {
      // Native — use fallback AI
      setTimeout(() => {
        resolve(getFallbackMove(chess, difficulty));
      }, 500);
    }
  });
};

export const parseMoveString = (
  moveStr: string
): { from: string; to: string } => {
  return {
    from: moveStr.slice(0, 2),
    to: moveStr.slice(2, 4),
  };
};