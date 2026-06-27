import { APP_CONFIG } from '../../../shared/constants/appConfig';

export const HOME_CONFIG = {
  appName: APP_CONFIG.name,
  tagline: 'FOREST EDITION',

  buttons: [
    {
      id: 'ai',
      label: 'Play vs AI',
      subtitle: 'Stockfish · 3 difficulty levels',
      icon: 'Bot',
      variant: 'green',
    },
    {
      id: 'friend',
      label: 'Play vs Friend',
      subtitle: 'Pass & play · Same device',
      icon: 'Users',
      variant: 'brown',
    },
  ] as const,

  bottomTabs: [
    { id: 'settings', label: 'Settings', icon: 'Settings2' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'Trophy' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ] as const,
};