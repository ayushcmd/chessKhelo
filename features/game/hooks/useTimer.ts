import { useState, useEffect, useCallback, useRef } from 'react';

export type PlayerColor = 'w' | 'b';

interface TimerState {
  whiteTime: number;
  blackTime: number;
  activePlayer: PlayerColor;
  isRunning: boolean;
}

export const useTimer = (initialTime: number) => {
  const [state, setState] = useState<TimerState>({
    whiteTime: initialTime,
    blackTime: initialTime,
    activePlayer: 'w',
    isRunning: false,
  });

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (state.isRunning) {
      intervalRef.current = setInterval(() => {
        setState((prev) => {
          const newTime =
            prev.activePlayer === 'w'
              ? prev.whiteTime - 1
              : prev.blackTime - 1;

          if (newTime <= 0) {
            return {
              ...prev,
              whiteTime: prev.activePlayer === 'w' ? 0 : prev.whiteTime,
              blackTime: prev.activePlayer === 'b' ? 0 : prev.blackTime,
              isRunning: false,
            };
          }

          return {
            ...prev,
            whiteTime:
              prev.activePlayer === 'w' ? newTime : prev.whiteTime,
            blackTime:
              prev.activePlayer === 'b' ? newTime : prev.blackTime,
          };
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.isRunning, state.activePlayer]);

  const start = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: true }));
  }, []);

  const pause = useCallback(() => {
    setState((prev) => ({ ...prev, isRunning: false }));
  }, []);

  const switchPlayer = useCallback(() => {
    setState((prev) => ({
      ...prev,
      activePlayer: prev.activePlayer === 'w' ? 'b' : 'w',
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      whiteTime: initialTime,
      blackTime: initialTime,
      activePlayer: 'w',
      isRunning: false,
    });
  }, [initialTime]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    whiteTime: state.whiteTime,
    blackTime: state.blackTime,
    activePlayer: state.activePlayer,
    isRunning: state.isRunning,
    formattedWhiteTime: formatTime(state.whiteTime),
    formattedBlackTime: formatTime(state.blackTime),
    start,
    pause,
    switchPlayer,
    reset,
  };
};