import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface SignupScreenProps {
  onSwitchToLogin: () => void;
  onSuccess: () => void;
}

export const SignupScreen: React.FC<SignupScreenProps> = ({
  onSwitchToLogin,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { signUp, loading, error } = useAuth();

  const handleSignup = async () => {
    if (!email || !password || !username) return;
    await signUp(email, password, username);
    onSuccess();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join chessKhelo</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={colors.text.muted}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={colors.text.muted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={colors.text.muted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          activeOpacity={0.75}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.green.primary} />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onSwitchToLogin}>
        <Text style={styles.switchText}>
          Already have an account?{' '}
          <Text style={styles.switchLink}>Sign In</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.title,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  error: {
    fontSize: typography.sizes.sm,
    color: colors.danger.primary,
    textAlign: 'center',
    backgroundColor: colors.danger.dim,
    padding: spacing.md,
    borderRadius: spacing.borderRadius.md,
  },
  form: {
    gap: spacing.md,
  },
  input: {
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    color: colors.text.primary,
    fontSize: typography.sizes.md,
  },
  button: {
    backgroundColor: colors.green.dim,
    borderWidth: 1,
    borderColor: colors.green.border,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.green.primary,
  },
  switchText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  switchLink: {
    color: colors.green.primary,
    fontWeight: '600',
  },
});