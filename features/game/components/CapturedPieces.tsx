import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface CapturedPiecesProps {
  pieces: string[];
  advantage: number;
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({
  pieces,
  advantage,
}) => {
  if (pieces.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.pieces}>
        {pieces.slice(0, 10).join('')}
      </Text>
      {advantage > 0 && (
        <Text style={styles.advantage}>+{advantage}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.xs,
    minHeight: 20,
  },
  pieces: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    opacity: 0.8,
  },
  advantage: {
    fontSize: typography.sizes.xs,
    color: colors.green.primary,
    fontWeight: '600',
  },
});