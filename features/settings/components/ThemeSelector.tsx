import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BoardTheme } from '../../../shared/constants/appConfig';
import { SETTINGS_CONFIG } from '../constants/settingsConfig';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface ThemeSelectorProps {
  selected: BoardTheme;
  onSelect: (theme: BoardTheme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {SETTINGS_CONFIG.boardThemes.map((theme) => {
        const themeColors = SETTINGS_CONFIG.boardThemeColors[theme];
        const isSelected = selected === theme;

        return (
          <TouchableOpacity
            key={theme}
            style={[styles.themeItem, isSelected && styles.selectedItem]}
            onPress={() => onSelect(theme)}
            activeOpacity={0.75}
          >
            {/* Mini board preview */}
            <View style={styles.preview}>
              <View style={styles.previewRow}>
                <View style={[styles.previewSquare, { backgroundColor: themeColors.light }]} />
                <View style={[styles.previewSquare, { backgroundColor: themeColors.dark }]} />
              </View>
              <View style={styles.previewRow}>
                <View style={[styles.previewSquare, { backgroundColor: themeColors.dark }]} />
                <View style={[styles.previewSquare, { backgroundColor: themeColors.light }]} />
              </View>
            </View>
            <Text style={[styles.themeLabel, isSelected && styles.selectedLabel]}>
              {SETTINGS_CONFIG.boardThemeLabels[theme]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  themeItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  selectedItem: {
    borderColor: colors.green.primary,
    backgroundColor: colors.green.dim,
  },
  preview: {
    width: 40,
    height: 40,
    borderRadius: spacing.borderRadius.sm,
    overflow: 'hidden',
  },
  previewRow: {
    flex: 1,
    flexDirection: 'row',
  },
  previewSquare: {
    flex: 1,
  },
  themeLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    fontWeight: '500',
  },
  selectedLabel: {
    color: colors.green.primary,
  },
});