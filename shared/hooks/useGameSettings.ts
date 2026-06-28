import { useState, useCallback } from 'react';
import { Difficulty, BoardTheme, APP_CONFIG } from '../constants/appConfig';

interface GameSettings {
  difficulty: Difficulty;
  timerDuration: number;
  boardTheme: BoardTheme;
  moveSoundEnabled: boolean;
  ambienceEnabled: boolean;
  showHints: boolean;
}

const DEFAULT_SETTINGS: GameSettings = {
  difficulty: APP_CONFIG.game.defaultDifficulty,
  timerDuration: APP_CONFIG.game.defaultTimer,
  boardTheme: APP_CONFIG.board.defaultTheme,
  moveSoundEnabled: APP_CONFIG.sound.moveSoundEnabled,
  ambienceEnabled: APP_CONFIG.sound.ambienceEnabled,
  showHints: true,
};

// Global settings store — persists across screens
let globalSettings: GameSettings = { ...DEFAULT_SETTINGS };
const listeners: Array<() => void> = [];

const notifyListeners = () => {
  listeners.forEach((fn) => fn());
};

export const useGameSettings = () => {
  const [, forceUpdate] = useState(0);

  const subscribe = useCallback(() => {
    const listener = () => forceUpdate((n) => n + 1);
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  useState(() => {
    return subscribe();
  });

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    globalSettings = { ...globalSettings, difficulty };
    notifyListeners();
  }, []);

  const setTimerDuration = useCallback((timerDuration: number) => {
    globalSettings = { ...globalSettings, timerDuration };
    notifyListeners();
  }, []);

  const setBoardTheme = useCallback((boardTheme: BoardTheme) => {
    globalSettings = { ...globalSettings, boardTheme };
    notifyListeners();
  }, []);

  const toggleMoveSound = useCallback(() => {
    globalSettings = {
      ...globalSettings,
      moveSoundEnabled: !globalSettings.moveSoundEnabled,
    };
    notifyListeners();
  }, []);

  const toggleAmbience = useCallback(() => {
    globalSettings = {
      ...globalSettings,
      ambienceEnabled: !globalSettings.ambienceEnabled,
    };
    notifyListeners();
  }, []);

  const toggleHints = useCallback(() => {
    globalSettings = {
      ...globalSettings,
      showHints: !globalSettings.showHints,
    };
    notifyListeners();
  }, []);

  const resetSettings = useCallback(() => {
    globalSettings = { ...DEFAULT_SETTINGS };
    notifyListeners();
  }, []);

  return {
    settings: globalSettings,
    setDifficulty,
    setTimerDuration,
    setBoardTheme,
    toggleMoveSound,
    toggleAmbience,
    toggleHints,
    resetSettings,
  };
};