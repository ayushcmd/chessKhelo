export const APP_CONFIG = {
  name: 'chessKhelo',
  version: '1.0.0',
  author: 'ayushcmd',

  game: {
    defaultTimer: 5 * 60, // 5 minutes in seconds
    timerOptions: [3 * 60, 5 * 60, 10 * 60],
    defaultDifficulty: 'hard' as const,
    difficulties: ['easy', 'medium', 'hard'] as const,
  },

  board: {
    themes: ['wood', 'classic', 'ocean', 'mono'] as const,
    defaultTheme: 'wood' as const,
  },

  sound: {
    moveSoundEnabled: true,
    ambienceEnabled: false,
  },
};

export type Difficulty = typeof APP_CONFIG.game.difficulties[number];
export type BoardTheme = typeof APP_CONFIG.board.themes[number];