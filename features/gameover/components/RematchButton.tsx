import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface RematchButtonProps {
  onRematch: () => void;
}

export const RematchButton: React.FC<RematchButtonProps> = ({ onRematch }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onRematch}
      activeOpacity={0.75}
    >
      <LucideIcon name="RotateCcw" size={18} color={colors.green.primary} />
      <Text style={styles.label}>Rematch</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.green.dim,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.green.border,
    borderTopColor: 'rgba(82,183,136,0.5)',
    borderRadius: spacing.borderRadius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxl,
  },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.green.primary,
  },
});