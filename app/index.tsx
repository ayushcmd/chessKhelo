import { Redirect } from 'expo-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../shared/theme/colors';

export default function Index() {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.bg.primary }}>
        <ActivityIndicator color={colors.green.primary} size="large" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? '/home' : '/auth'} />;
}