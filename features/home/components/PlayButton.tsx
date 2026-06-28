import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

type PlayButtonVariant = 'green' | 'brown';

interface PlayButtonProps {
  label: string;
  subtitle: string;
  icon: string;
  variant: PlayButtonVariant;
  onPress: () => void;
}

const variantConfig = {
  green: {
    bg: colors.green.dim,
    border: colors.green.border,
    borderTop: 'rgba(82,183,136,0.5)',
    iconBg: 'rgba(82,183,136,0.15)',
    iconColor: colors.green.primary,
    subtitleColor: 'rgba(82,183,136,0.7)',
    arrowColor: 'rgba(82,183,136,0.6)',
  },
  brown: {
    bg: colors.brown.dim,
    border: colors.brown.border,
    borderTop: 'rgba(196,154,108,0.4)',
    iconBg: 'rgba(139,94,60,0.15)',
    iconColor: colors.brown.light,
    subtitleColor: 'rgba(196,154,108,0.7)',
    arrowColor: 'rgba(196,154,108,0.6)',
  },
};

export const PlayButton: React.FC<PlayButtonProps> = ({
  label,
  subtitle,
  icon,
  variant,
  onPress,
}) => {
  const config = variantConfig[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.container,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          borderTopColor: config.borderTop,
        },
      ]}
    >
      <View style={[styles.iconBox, { backgroundColor: config.iconBg }]}>
        <LucideIcon name={icon} size={22} color={config.iconColor} />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.subtitle, { color: config.subtitleColor }]}>
          {subtitle}
        </Text>
      </View>
      <LucideIcon name="ChevronRight" size={16} color={config.arrowColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderTopWidth: 1.5,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: spacing.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.sm,
  },
});