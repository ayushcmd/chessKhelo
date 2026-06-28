import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface StatItem {
  label: string;
  value: string;
}

interface StatsDisplayProps {
  totalMoves: number;
  duration: string;
  capturedCount: number;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({
  totalMoves,
  duration,
  capturedCount,
}) => {
  const stats: StatItem[] = [
    { label: 'Total Moves', value: String(totalMoves) },
    { label: 'Duration', value: duration },
    { label: 'Pieces Captured', value: String(capturedCount) },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          style={[
            styles.statItem,
            index < stats.length - 1 && styles.statBorder,
          ]}
        >
          <Text style={styles.statValue}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  statBorder: {
    borderRightWidth: 1,
    borderRightColor: colors.glass.border,
  },
  statValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    textAlign: 'center',
  },
});