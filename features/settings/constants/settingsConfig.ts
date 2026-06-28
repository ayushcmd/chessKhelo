import { APP_CONFIG } from '../../../shared/constants/appConfig';

export const SETTINGS_CONFIG = {
  difficulties: APP_CONFIG.game.difficulties,
  timerOptions: APP_CONFIG.game.timerOptions,
  boardThemes: APP_CONFIG.board.themes,

  timerLabels: {
    [3 * 60]: '3 min',
    [5 * 60]: '5 min',
    [10 * 60]: '10 min',
  },

  difficultyLabels: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  },

  boardThemeLabels: {
    wood: 'Wood',
    classic: 'Classic',
    ocean: 'Ocean',
    mono: 'Mono',
  },

  boardThemeColors: {
    wood: { light: '#f0d9b5', dark: '#8B5E3C' },
    classic: { light: '#eeeed2', dark: '#769656' },
    ocean: { light: '#dee3e6', dark: '#8ca2ad' },
    mono: { light: '#f9f9f9', dark: '#333333' },
  },
};