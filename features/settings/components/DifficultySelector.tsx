import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Difficulty } from '../../../shared/constants/appConfig';
import { SETTINGS_CONFIG } from '../constants/settingsConfig';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {SETTINGS_CONFIG.difficulties.map((difficulty) => (
        <TouchableOpacity
          key={difficulty}
          style={[
            styles.chip,
            selected === difficulty && styles.activeChip,
          ]}
          onPress={() => onSelect(difficulty)}
          activeOpacity={0.75}
        >
          <Text
            style={[
              styles.chipText,
              selected === difficulty && styles.activeChipText,
            ]}
          >
            {SETTINGS_CONFIG.difficultyLabels[difficulty]}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: colors.green.dim,
    borderColor: colors.green.border,
  },
  chipText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  activeChipText: {
    color: colors.green.primary,
    fontWeight: '600',
  },
});