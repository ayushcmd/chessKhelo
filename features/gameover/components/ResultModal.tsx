import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface ResultModalProps {
  title: string;
  subtitle: string;
  icon: string;
  isWin: boolean;
  isDraw: boolean;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  title,
  subtitle,
  icon,
  isWin,
  isDraw,
}) => {
  const iconColor = isWin
    ? colors.green.primary
    : isDraw
    ? colors.brown.light
    : colors.danger.primary;

  const iconBg = isWin
    ? colors.green.dim
    : isDraw
    ? colors.brown.dim
    : colors.danger.dim;

  const iconBorder = isWin
    ? colors.green.border
    : isDraw
    ? colors.brown.border
    : colors.danger.border;

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View
        style={[
          styles.iconBox,
          { backgroundColor: iconBg, borderColor: iconBorder },
        ]}
      >
        <LucideIcon name={icon} size={36} color={iconColor} />
      </View>

      {/* Title */}
      <Text style={[styles.title, { color: iconColor }]}>{title}</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.sizes.title,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});