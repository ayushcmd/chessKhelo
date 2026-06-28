import { useMemo } from 'react';
import { Chess } from 'chess.js';
import { PIECE_SYMBOLS, PIECE_VALUES } from '../constants/pieceConfig';

export const useCapturedPieces = (chess: Chess) => {
  const captured = useMemo(() => {
    const history = chess.history({ verbose: true });

    const whiteCaptured: string[] = [];
    const blackCaptured: string[] = [];

    history.forEach((move) => {
      if (move.captured) {
        const pieceKey =
          move.color === 'w'
            ? `b${move.captured.toUpperCase()}`
            : `w${move.captured.toUpperCase()}`;
        const symbol = PIECE_SYMBOLS[pieceKey] ?? '?';

        if (move.color === 'w') {
          whiteCaptured.push(symbol);
        } else {
          blackCaptured.push(symbol);
        }
      }
    });

    const whiteAdvantage = whiteCaptured.reduce((sum, symbol) => {
      const key = Object.keys(PIECE_SYMBOLS).find(
        (k) => PIECE_SYMBOLS[k] === symbol
      );
      return sum + (key ? PIECE_VALUES[key[1].toLowerCase()] ?? 0 : 0);
    }, 0);

    const blackAdvantage = blackCaptured.reduce((sum, symbol) => {
      const key = Object.keys(PIECE_SYMBOLS).find(
        (k) => PIECE_SYMBOLS[k] === symbol
      );
      return sum + (key ? PIECE_VALUES[key[1].toLowerCase()] ?? 0 : 0);
    }, 0);

    return {
      whiteCaptured,
      blackCaptured,
      whiteAdvantage,
      blackAdvantage,
    };
  }, [chess.fen()]);

  return captured;
};