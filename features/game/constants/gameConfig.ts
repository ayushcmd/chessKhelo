import { APP_CONFIG } from '../../../shared/constants/appConfig';

export const GAME_CONFIG = {
  defaultTimer: APP_CONFIG.game.defaultTimer,
  timerOptions: APP_CONFIG.game.timerOptions,
  defaultDifficulty: APP_CONFIG.game.defaultDifficulty,
  difficulties: APP_CONFIG.game.difficulties,

  stockfish: {
    depth: {
      easy: 2,
      medium: 8,
      hard: 18,
    },
  },

  board: {
    size: 8,
    lightSquare: '#f0d9b5',
    darkSquare: '#8B5E3C',
    highlightLight: 'rgba(180,220,100,0.75)',
    highlightDark: 'rgba(130,180,60,0.65)',
    selectedLight: 'rgba(100,180,255,0.5)',
    selectedDark: 'rgba(60,140,220,0.5)',
  },
};