import { useState, useCallback } from 'react';
import { APP_CONFIG, Difficulty, BoardTheme } from '../../../shared/constants/appConfig';

interface SettingsState {
  difficulty: Difficulty;
  timerDuration: number;
  boardTheme: BoardTheme;
  moveSoundEnabled: boolean;
  ambienceEnabled: boolean;
  showHints: boolean;
}

const DEFAULT_SETTINGS: SettingsState = {
  difficulty: APP_CONFIG.game.defaultDifficulty,
  timerDuration: APP_CONFIG.game.defaultTimer,
  boardTheme: APP_CONFIG.board.defaultTheme,
  moveSoundEnabled: APP_CONFIG.sound.moveSoundEnabled,
  ambienceEnabled: APP_CONFIG.sound.ambienceEnabled,
  showHints: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setSettings((prev) => ({ ...prev, difficulty }));
  }, []);

  const setTimerDuration = useCallback((timerDuration: number) => {
    setSettings((prev) => ({ ...prev, timerDuration }));
  }, []);

  const setBoardTheme = useCallback((boardTheme: BoardTheme) => {
    setSettings((prev) => ({ ...prev, boardTheme }));
  }, []);

  const toggleMoveSound = useCallback(() => {
    setSettings((prev) => ({ ...prev, moveSoundEnabled: !prev.moveSoundEnabled }));
  }, []);

  const toggleAmbience = useCallback(() => {
    setSettings((prev) => ({ ...prev, ambienceEnabled: !prev.ambienceEnabled }));
  }, []);

  const toggleHints = useCallback(() => {
    setSettings((prev) => ({ ...prev, showHints: !prev.showHints }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    setDifficulty,
    setTimerDuration,
    setBoardTheme,
    toggleMoveSound,
    toggleAmbience,
    toggleHints,
    resetSettings,
  };
};