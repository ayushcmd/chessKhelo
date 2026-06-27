import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import { icons } from 'lucide-react-native';

interface HomeCardProps {
  label: string;
  icon: keyof typeof icons;
  onPress: () => void;
}

export const HomeCard: React.FC<HomeCardProps> = ({
  label,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={styles.container}
    >
      <View style={styles.iconBox}>
        <LucideIcon
          name={icon}
          size={18}
          color={colors.text.secondary}
        />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontWeight: '500',
  },
});