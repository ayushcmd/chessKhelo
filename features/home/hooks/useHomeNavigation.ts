import { useRouter } from 'expo-router';

export const useHomeNavigation = () => {
  const router = useRouter();

  const navigateToAIGame = () => {
    router.push('/game?mode=ai');
  };

  const navigateToFriendGame = () => {
    router.push('/game?mode=friend');
  };

  const navigateToSettings = () => {
    router.push('/settings');
  };

  const navigateToGameOver = () => {
    router.push('/gameover');
  };

  return {
    navigateToAIGame,
    navigateToFriendGame,
    navigateToSettings,
    navigateToGameOver,
  };
};