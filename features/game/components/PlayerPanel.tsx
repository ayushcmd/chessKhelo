import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface PlayerPanelProps {
  name: string;
  isAI?: boolean;
  isActive: boolean;
  formattedTime: string;
  capturedPieces: string[];
  advantage: number;
}

export const PlayerPanel: React.FC<PlayerPanelProps> = ({
  name,
  isAI = false,
  isActive,
  formattedTime,
  capturedPieces,
  advantage,
}) => {
  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      {/* Left: Avatar + Info */}
      <View style={styles.left}>
        <View style={[styles.avatar, isAI && styles.aiAvatar]}>
          <Text style={styles.avatarText}>
            {isAI ? '⚙' : name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.statusRow}>
            {isActive && <View style={styles.activeDot} />}
            <Text style={styles.statusText}>
              {isActive ? 'Your turn' : isAI ? 'Thinking...' : 'Waiting'}
            </Text>
          </View>
          {/* Captured pieces */}
          {capturedPieces.length > 0 && (
            <View style={styles.capturedRow}>
              <Text style={styles.capturedPieces}>
                {capturedPieces.slice(0, 8).join('')}
              </Text>
              {advantage > 0 && (
                <Text style={styles.advantage}>+{advantage}</Text>
              )}
            </View>
          )}
        </View>
      </View>

      {/* Right: Timer */}
      <View style={[styles.timerBox, isActive && styles.activeTimerBox]}>
        <Text style={[styles.timer, isActive && styles.activeTimer]}>
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  activeContainer: {
    borderColor: 'rgba(82,183,136,0.2)',
    borderTopColor: 'rgba(82,183,136,0.4)',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.brown.dim,
    borderWidth: 1,
    borderColor: colors.brown.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiAvatar: {
    backgroundColor: colors.green.dim,
    borderColor: colors.green.border,
  },
  avatarText: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.brown.light,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.green.primary,
  },
  statusText: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },
  capturedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  capturedPieces: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  advantage: {
    fontSize: typography.sizes.xs,
    color: colors.green.primary,
    fontWeight: '600',
  },
  timerBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: spacing.borderRadius.sm,
    padding: spacing.sm,
    minWidth: 70,
    alignItems: 'center',
  },
  activeTimerBox: {
    backgroundColor: 'rgba(82,183,136,0.1)',
  },
  timer: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text.secondary,
  },
  activeTimer: {
    color: colors.text.primary,
  },
});