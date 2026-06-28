import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ResultModal } from '../features/gameover/components/ResultModal';
import { RematchButton } from '../features/gameover/components/RematchButton';
import { StatsDisplay } from '../features/gameover/components/StatsDisplay';
import { useGameResult } from '../features/gameover/hooks/useGameResult';
import { LucideIcon } from '../shared/components/LucideIcon';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function GameOverScreen() {
  const router = useRouter();
  const { gameResult, winner, totalMoves, duration, capturedCount } =
    useLocalSearchParams<{
      gameResult: string;
      winner: string;
      totalMoves: string;
      duration: string;
      capturedCount: string;
    }>();

  const { title, subtitle, icon, isWin, isDraw, isLoss } = useGameResult({
    gameResult: gameResult ?? null,
    winner: (winner as 'w' | 'b') ?? null,
  });

  const handleRematch = () => {
    router.push('/game?mode=ai');
  };

  const handleHome = () => {
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={handleHome}>
            <LucideIcon name="House" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Game Over</Text>
        </View>

        <View style={[styles.content, isDesktop && styles.desktopContent]}>
          {/* Result card */}
          <View style={[styles.card, isDesktop && styles.desktopCard]}>
            <ResultModal
              title={title}
              subtitle={subtitle}
              icon={icon}
              isWin={isWin}
              isDraw={isDraw}
            />

            {/* Stats */}
            <StatsDisplay
              totalMoves={Number(totalMoves ?? 0)}
              duration={duration ?? '00:00'}
              capturedCount={Number(capturedCount ?? 0)}
            />

            {/* Buttons */}
            <View style={styles.buttons}>
              <RematchButton onRematch={handleRematch} />

              <TouchableOpacity
                style={styles.homeBtn}
                onPress={handleHome}
                activeOpacity={0.75}
              >
                <LucideIcon name="House" size={18} color={colors.text.secondary} />
                <Text style={styles.homeBtnText}>Back to Home</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Result message */}
          {isDesktop && (
            <View style={styles.desktopSide}>
              <Text style={styles.desktopQuote}>
                {isWin
                  ? '"Every chess master was once a beginner."'
                  : isDraw
                  ? '"A draw is the finest achievement."'
                  : '"Defeat is simply the addition of time to a willingness to try again."'}
              </Text>
              <Text style={styles.desktopQuoteAuthor}>
                {isWin ? '— Irving Chernev' : isDraw ? '— Savielly Tartakower' : '— Denis Waitley'}
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: '700',
    color: colors.text.primary,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.xxl,
  },
  desktopContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 60,
  },
  card: {
    gap: spacing.xl,
  },
  desktopCard: {
    flex: 1,
    maxWidth: 480,
  },
  buttons: {
    gap: spacing.md,
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.lg,
    paddingVertical: spacing.lg,
  },
  homeBtnText: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  desktopSide: {
    flex: 1,
    maxWidth: 360,
    gap: spacing.md,
    paddingLeft: spacing.xl,
    borderLeftWidth: 1,
    borderLeftColor: colors.glass.border,
  },
  desktopQuote: {
    fontSize: typography.sizes.xl,
    color: colors.text.secondary,
    fontStyle: 'italic',
    lineHeight: 32,
  },
  desktopQuoteAuthor: {
    fontSize: typography.sizes.md,
    color: colors.text.muted,
  },
});