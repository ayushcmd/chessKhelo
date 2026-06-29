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
import { useProfile } from '../features/auth/hooks/useProfile';
import { LucideIcon } from '../shared/components/LucideIcon';
import { ForestBackground } from '../shared/components/ForestBackground';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';

interface LeaderboardEntry {
  username: string;
  games_won: number;
  games_played: number;
}

export default function LeaderboardScreen() {
  const router = useRouter();
  const { getLeaderboard } = useProfile();
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    setLoading(true);
    const result = await getLeaderboard();
    setData(result);
    setLoading(false);
  };

  const getRankColor = (index: number) => {
    if (index === 0) return '#FFD700';
    if (index === 1) return '#C0C0C0';
    if (index === 2) return '#CD7F32';
    return colors.text.secondary;
  };

  const getWinRate = (won: number, played: number) => {
    if (played === 0) return '0%';
    return `${Math.round((won / played) * 100)}%`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ForestBackground />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/home')}
          >
            <LucideIcon name="ChevronLeft" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <TouchableOpacity onPress={loadLeaderboard}>
            <LucideIcon name="RefreshCw" size={18} color={colors.text.secondary} />
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
            {data.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No players yet.</Text>
                <Text style={styles.emptySubText}>Play a game to appear here!</Text>
              </View>
            ) : (
              data.map((entry, index) => (
                <View key={entry.username} style={styles.row}>
                  <Text style={[styles.rank, { color: getRankColor(index) }]}>
                    #{index + 1}
                  </Text>
                  <View style={styles.playerInfo}>
                    <Text style={styles.username}>{entry.username}</Text>
                    <Text style={styles.gamesPlayed}>
                      {entry.games_played} games played
                    </Text>
                  </View>
                  <View style={styles.stats}>
                    <Text style={styles.wins}>{entry.games_won} wins</Text>
                    <Text style={styles.winRate}>
                      {getWinRate(entry.games_won, entry.games_played)}
                    </Text>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    gap: spacing.sm,
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    color: colors.text.primary,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: typography.sizes.md,
    color: colors.text.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  rank: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    width: 36,
  },
  playerInfo: {
    flex: 1,
    gap: 2,
  },
  username: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.text.primary,
  },
  gamesPlayed: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
  stats: {
    alignItems: 'flex-end',
    gap: 2,
  },
  wins: {
    fontSize: typography.sizes.md,
    fontWeight: '600',
    color: colors.green.primary,
  },
  winRate: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
  },
});