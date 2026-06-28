import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useHomeNavigation } from '../features/home/hooks/useHomeNavigation';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';
import { BackgroundForest } from '../features/home/components/BackgroundForest';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function HomeScreen() {
  const {
    navigateToAIGame,
    navigateToFriendGame,
    navigateToSettings,
  } = useHomeNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
       <BackgroundForest />
      <SafeAreaView style={styles.safeArea}>

        {/* Desktop: side by side layout */}
        {isDesktop ? (
          <View style={styles.desktopLayout}>
            {/* Left: Logo */}
            <View style={styles.desktopLeft}>
              <Text style={styles.chessPiece}>♟</Text>
              <Text style={styles.appName}>CHESS</Text>
              <View style={styles.taglineRow}>
                <View style={styles.taglineLine} />
                <Text style={styles.tagline}>FOREST EDITION</Text>
                <View style={styles.taglineLine} />
              </View>
              <Text style={styles.desktopDesc}>
                A premium chess experience with{'\n'}forest ambience and AI opponent.
              </Text>
            </View>

            {/* Right: Buttons */}
            <View style={styles.desktopRight}>
              <Text style={styles.desktopSubheading}>Choose your game</Text>
              <TouchableOpacity
                style={[styles.playButton, styles.greenButton]}
                onPress={navigateToAIGame}
                activeOpacity={0.75}
              >
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Play vs AI</Text>
                  <Text style={styles.buttonSub}>Stockfish · 3 difficulty levels</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.playButton, styles.brownButton]}
                onPress={navigateToFriendGame}
                activeOpacity={0.75}
              >
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Play vs Friend</Text>
                  <Text style={styles.buttonSub}>Pass & play · Same device</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.card} onPress={navigateToSettings}>
                  <Text style={styles.cardLabel}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => {}}>
                  <Text style={styles.cardLabel}>Leaderboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => {}}>
                  <Text style={styles.cardLabel}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          /* Mobile: stacked layout */
          <>
            <View style={styles.logoSection}>
              <Text style={styles.chessPiece}>♟</Text>
              <Text style={styles.appName}>CHESS</Text>
              <View style={styles.taglineRow}>
                <View style={styles.taglineLine} />
                <Text style={styles.tagline}>FOREST EDITION</Text>
                <View style={styles.taglineLine} />
              </View>
            </View>

            <View style={styles.buttonsSection}>
              <TouchableOpacity
                style={[styles.playButton, styles.greenButton]}
                onPress={navigateToAIGame}
                activeOpacity={0.75}
              >
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Play vs AI</Text>
                  <Text style={styles.buttonSub}>Stockfish · 3 difficulty levels</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.playButton, styles.brownButton]}
                onPress={navigateToFriendGame}
                activeOpacity={0.75}
              >
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Play vs Friend</Text>
                  <Text style={styles.buttonSub}>Pass & play · Same device</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.card} onPress={navigateToSettings}>
                  <Text style={styles.cardLabel}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => {}}>
                  <Text style={styles.cardLabel}>Leaderboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card} onPress={() => {}}>
                  <Text style={styles.cardLabel}>Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <Text style={styles.footer}>v1.0 · ayushcmd</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: isDesktop ? 'center' : 'flex-start',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: isDesktop ? 900 : 400,
    justifyContent: isDesktop ? 'center' : 'flex-start',
  },

  // Desktop layout
  desktopLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
  },
  desktopLeft: {
    flex: 1,
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  desktopRight: {
    flex: 1,
    gap: spacing.md,
  },
  desktopDesc: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  desktopSubheading: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },

  // Mobile layout
  logoSection: {
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  buttonsSection: {
    gap: spacing.md,
  },

  // Shared
  chessPiece: {
    fontSize: isDesktop ? 64 : 42,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  appName: {
    fontSize: isDesktop ? 42 : typography.sizes.title,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 4,
    marginBottom: spacing.sm,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  taglineLine: {
    height: 1,
    width: 24,
    backgroundColor: 'rgba(196,154,108,0.4)',
  },
  tagline: {
    fontSize: typography.sizes.xs,
    color: 'rgba(196,154,108,0.7)',
    letterSpacing: 3,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1,
    borderTopWidth: 1.5,
  },
  greenButton: {
    backgroundColor: colors.green.dim,
    borderColor: colors.green.border,
    borderTopColor: 'rgba(82,183,136,0.5)',
  },
  brownButton: {
    backgroundColor: colors.brown.dim,
    borderColor: colors.brown.border,
    borderTopColor: 'rgba(196,154,108,0.4)',
  },
  buttonText: {
    flex: 1,
    gap: 2,
  },
  buttonLabel: {
    fontSize: typography.sizes.lg,
    fontWeight: '600',
    color: colors.text.primary,
  },
  buttonSub: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  arrow: {
    fontSize: 22,
    color: colors.text.secondary,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  card: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  footer: {
    textAlign: 'center',
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    marginTop: spacing.lg,
    letterSpacing: 1,
  },
});