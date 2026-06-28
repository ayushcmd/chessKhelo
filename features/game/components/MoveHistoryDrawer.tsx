import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface MoveRecord {
  moveNumber: number;
  white: string;
  black: string;
}

interface MoveHistoryDrawerProps {
  history: MoveRecord[];
  totalMoves: number;
}

export const MoveHistoryDrawer: React.FC<MoveHistoryDrawerProps> = ({
  history,
  totalMoves,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Move History</Text>
        <Text style={styles.totalMoves}>{totalMoves} moves</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {history.length === 0 ? (
          <Text style={styles.emptyText}>No moves yet</Text>
        ) : (
          history.map((record) => (
            <View key={record.moveNumber} style={styles.moveRow}>
              <Text style={styles.moveNumber}>{record.moveNumber}.</Text>
              <Text style={styles.whiteMove}>{record.white}</Text>
              <Text style={styles.blackMove}>{record.black}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    maxHeight: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  headerText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  totalMoves: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
  scroll: {
    maxHeight: 150,
  },
  emptyText: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  moveRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  moveNumber: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    width: 24,
  },
  whiteMove: {
    fontSize: typography.sizes.xs,
    color: colors.text.primary,
    flex: 1,
  },
  blackMove: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    flex: 1,
  },
});