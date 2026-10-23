import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../features/auth/hooks/useAuth';
import { useProfile } from '../features/auth/hooks/useProfile';
import { supabase } from '../shared/lib/supabase';
import { ForestBackground } from '../shared/components/ForestBackground';
import { LucideIcon } from '../shared/components/LucideIcon';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';

interface GameHistory {
  id: string;
  result: string;
  opponent: string;
  difficulty: string;
  total_moves: number;
  duration: string;
  played_at: string;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { profile, loading } = useProfile();
  const [gameHistory, setGameHistory] = useState<GameHistory[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    if (user) fetchGameHistory();
  }, [user]);

  const fetchGameHistory = async () => {
    if (!user) return;
    setHistoryLoading(true);
    const { data } = await supabase
      .from('game_history')
      .select('*')
      .eq('player_id', user.id)
      .order('played_at', { ascending: false })
      .limit(10);
    setGameHistory(data ?? []);
    setHistoryLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth');
  };

  const getWinRate = () => {
    if (!profile || profile.games_played === 0) return '0%';
    return `${Math.round((profile.games_won / profile.games_played) * 100)}%`;
  };

  const getResultColor = (result: string) => {
    if (result === 'win') return colors.green.primary;
    if (result === 'loss' || result === 'resign') return colors.danger.primary;
    return colors.brown.light;
  };

  const getResultLabel = (result: string) => {
    if (result === 'win') return 'Win';
    if (result === 'loss') return 'Loss';
    if (result === 'resign') return 'Resigned';
    return 'Draw';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ForestBackground />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/home')}
          >
            <LucideIcon name="ChevronLeft" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.green.primary} size="large" />
          </View>
        ) : (
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar + Username */}
            <View style={styles.avatarSection}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {profile?.username?.charAt(0).toUpperCase() ?? 'A'}
                </Text>
              </View>
              <Text style={styles.username}>{profile?.username ?? 'Player'}</Text>
              <Text style={styles.email}>{user?.email}</Text>
            </View>

            {/* Stats Grid */}
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{profile?.games_played ?? 0}</Text>
                <Text style={styles.statLabel}>Played</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.green.primary }]}>
                  {profile?.games_won ?? 0}
                </Text>
                <Text style={styles.statLabel}>Won</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.danger.primary }]}>
                  {profile?.games_lost ?? 0}
                </Text>
                <Text style={styles.statLabel}>Lost</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statValue, { color: colors.brown.light }]}>
                  {profile?.games_drawn ?? 0}
                </Text>
                <Text style={styles.statLabel}>Drawn</Text>
              </View>
            </View>

            {/* Win Rate */}
            <View style={styles.winRateCard}>
              <Text style={styles.winRateLabel}>Win Rate</Text>
              <Text style={styles.winRateValue}>{getWinRate()}</Text>
            </View>

            {/* Game History */}
            <Text style={styles.sectionTitle}>Recent Games</Text>

            {historyLoading ? (
              <ActivityIndicator color={colors.green.primary} />
            ) : gameHistory.length === 0 ? (
              <Text style={styles.emptyText}>No games played yet.</Text>
            ) : (
              gameHistory.map((game) => (
                <View key={game.id} style={styles.historyRow}>
                  <View style={styles.historyLeft}>
                    <Text style={[styles.resultBadge, { color: getResultColor(game.result) }]}>
                      {getResultLabel(game.result)}
                    </Text>
                    <Text style={styles.historyOpponent}>vs {game.opponent}</Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historyMoves}>{game.total_moves} moves</Text>
                    <Text style={styles.historyDate}>{formatDate(game.played_at)}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
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
  signOutText: {
    fontSize: typography.sizes.sm,
    color: colors.danger.primary,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.green.dim,
    borderWidth: 2,
    borderColor: colors.green.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.green.primary,
  },
  username: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  email: {
    fontSize: typography.sizes.sm,
    color: colors.text.muted,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.text.primary,
  },
  statLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
  winRateCard: {
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  winRateLabel: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  winRateValue: {
    fontSize: typography.sizes.xxl,
    fontWeight: '700',
    color: colors.green.primary,
  },
  sectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.text.muted,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
  },
  emptyText: {
    fontSize: typography.sizes.md,
    color: colors.text.muted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
  historyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
  },
  historyLeft: {
    gap: 4,
  },
  resultBadge: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
  },
  historyOpponent: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
  historyRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  historyMoves: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  historyDate: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
});