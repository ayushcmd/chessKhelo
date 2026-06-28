import { useMemo } from 'react';
import { RESULT_CONFIG } from '../constants/resultConfig';

type ResultType = keyof typeof RESULT_CONFIG.messages;

interface GameResultProps {
  gameResult: string | null;
  winner: 'w' | 'b' | null;
  isResigned?: boolean;
  isTimeout?: boolean;
}

export const useGameResult = ({
  gameResult,
  winner,
  isResigned,
  isTimeout,
}: GameResultProps) => {
  const resultKey = useMemo((): ResultType => {
    if (isResigned) return 'resign';
    if (isTimeout) return 'timeout';
    if (gameResult === 'checkmate') {
      return winner === 'w' ? 'checkmate_win' : 'checkmate_lose';
    }
    if (gameResult === 'stalemate') return 'stalemate';
    if (
      gameResult === 'draw' ||
      gameResult === 'threefold' ||
      gameResult === 'insufficient'
    )
      return 'draw';
    return 'draw';
  }, [gameResult, winner, isResigned, isTimeout]);

  const result = RESULT_CONFIG.messages[resultKey];

  return {
    title: result.title,
    subtitle: result.subtitle,
    icon: result.icon,
    isWin: resultKey === 'checkmate_win',
    isDraw: resultKey === 'draw' || resultKey === 'stalemate',
    isLoss: resultKey === 'checkmate_lose' || resultKey === 'resign' || resultKey === 'timeout',
  };
};