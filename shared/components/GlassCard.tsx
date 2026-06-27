import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type GlassVariant = 'light' | 'dark' | 'green' | 'brown' | 'danger';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: GlassVariant;
  style?: ViewStyle;
  borderRadius?: number;
  padding?: number;
}

const variantStyles: Record<GlassVariant, ViewStyle> = {
  light: {
    backgroundColor: colors.glass.light,
    borderColor: colors.glass.border,
  },
  dark: {
    backgroundColor: colors.glass.dark,
    borderColor: colors.glass.border,
  },
  green: {
    backgroundColor: colors.green.dim,
    borderColor: colors.green.border,
  },
  brown: {
    backgroundColor: colors.brown.dim,
    borderColor: colors.brown.border,
  },
  danger: {
    backgroundColor: colors.danger.dim,
    borderColor: colors.danger.border,
  },
};

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'light',
  style,
  borderRadius = spacing.borderRadius.lg,
  padding = spacing.lg,
}) => {
  return (
    <View
      style={[
        styles.base,
        variantStyles[variant],
        { borderRadius, padding },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderTopColor: colors.glass.borderTop,
  },
});