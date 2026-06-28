import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface SoundToggleProps {
  label: string;
  subtitle: string;
  enabled: boolean;
  onToggle: () => void;
  icon: string;
}

export const SoundToggle: React.FC<SoundToggleProps> = ({
  label,
  subtitle,
  enabled,
  onToggle,
  icon,
}) => {
  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={[styles.iconBox, enabled && styles.iconBoxActive]}>
        <LucideIcon
          name={icon}
          size={15}
          color={enabled ? colors.green.primary : colors.text.secondary}
        />
      </View>

      {/* Text */}
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {/* Toggle */}
      <TouchableOpacity
        onPress={onToggle}
        activeOpacity={0.75}
        style={[styles.toggle, enabled ? styles.toggleOn : styles.toggleOff]}
      >
        <View
          style={[
            styles.thumb,
            enabled ? styles.thumbOn : styles.thumbOff,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBoxActive: {
    backgroundColor: colors.green.dim,
    borderColor: colors.green.border,
  },
  textBox: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
  toggle: {
    width: 40,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1,
  },
  toggleOn: {
    backgroundColor: 'rgba(82,183,136,0.4)',
    borderColor: colors.green.primary,
  },
  toggleOff: {
    backgroundColor: colors.glass.light,
    borderColor: colors.glass.border,
  },
  thumb: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#fff',
  },
  thumbOn: {
    alignSelf: 'flex-end',
  },
  thumbOff: {
    alignSelf: 'flex-start',
  },
});