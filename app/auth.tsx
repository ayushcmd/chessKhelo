import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LoginScreen } from '../features/auth/components/LoginScreen';
import { SignupScreen } from '../features/auth/components/SignupScreen';
import { ForestBackground } from '../shared/components/ForestBackground';
import { colors } from '../shared/theme/colors';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSuccess = () => {
    router.replace('/home');
  };

  return (
    <View style={styles.container}>
      <ForestBackground />
      {isLogin ? (
        <LoginScreen
          onSwitchToSignup={() => setIsLogin(false)}
          onSuccess={handleSuccess}
        />
      ) : (
        <SignupScreen
          onSwitchToLogin={() => setIsLogin(true)}
          onSuccess={handleSuccess}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
});