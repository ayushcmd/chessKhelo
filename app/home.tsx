import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useHomeNavigation } from '../features/home/hooks/useHomeNavigation';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';
import { BackgroundForest } from '../features/home/components/BackgroundForest';
import { AppLogo } from '../shared/components/AppLogo';
import { LanGameModal } from '../features/home/components/LanGameModal';
import { LucideIcon } from '../shared/components/LucideIcon';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function HomeScreen() {
  const router = useRouter();
  const {
    navigateToAIGame,
    navigateToFriendGame,
    navigateToSettings,
  } = useHomeNavigation();

  const [lanModalVisible, setLanModalVisible] = useState(false);

  const handleStartLanGame = (params: {
    roomCode: string;
    role: 'host' | 'guest';
    side: 'w' | 'b';
    timeMinutes: number;
  }) => {
    setLanModalVisible(false);
    router.push({
      pathname: '/game',
      params: {
        mode: 'lan',
        room: params.roomCode,
        role: params.role,
        side: params.side,
        time: String(params.timeMinutes),
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <BackgroundForest />

      <SafeAreaView style={styles.safeArea}>
        {isDesktop ? (
          <View style={styles.desktopLayout}>
            {/* Desktop Left: Logo & Description */}
            <View style={styles.desktopLeft}>
              <AppLogo size="lg" showTagline={true} />
              <Text style={styles.desktopDesc}>
                A premium chess experience with forest ambience, Stockfish AI, and direct WiFi LAN multiplayer.
              </Text>
            </View>

            {/* Desktop Right: Game Modes */}
            <View style={styles.desktopRight}>
              <Text style={styles.desktopSubheading}>CHOOSE YOUR GAME</Text>

              {/* 1. Play vs AI */}
              <TouchableOpacity
                style={[styles.playButton, styles.greenButton]}
                onPress={navigateToAIGame}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, styles.greenIconBox]}>
                  <LucideIcon name="Bot" size={24} color={colors.green.primary} />
                </View>
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Play vs AI</Text>
                  <Text style={styles.buttonSub}>Stockfish Engine · 3 difficulty levels</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              {/* 2. WiFi LAN Multiplayer */}
              <TouchableOpacity
                style={[styles.playButton, styles.lanButton]}
                onPress={() => setLanModalVisible(true)}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, styles.lanIconBox]}>
                  <LucideIcon name="Wifi" size={24} color="#70e000" />
                </View>
                <View style={styles.buttonText}>
                  <View style={styles.badgeRow}>
                    <Text style={styles.buttonLabel}>WiFi LAN Multiplayer</Text>
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>LOCAL LAN</Text>
                    </View>
                  </View>
                  <Text style={styles.buttonSub}>2 Devices · Same WiFi Network · Zero Latency</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              {/* 3. Pass & Play (Local vs Local on same device) */}
              <TouchableOpacity
                style={[styles.playButton, styles.brownButton]}
                onPress={navigateToFriendGame}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, styles.brownIconBox]}>
                  <LucideIcon name="Users" size={24} color={colors.brown.light} />
                </View>
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Pass & Play</Text>
                  <Text style={styles.buttonSub}>Local vs Local · Same Screen / Device</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              {/* Bottom Row */}
              <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.card} onPress={navigateToSettings}>
                  <LucideIcon name="Settings2" size={16} color={colors.text.secondary} />
                  <Text style={styles.cardLabel}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => setLanModalVisible(true)}
                >
                  <LucideIcon name="Wifi" size={16} color={colors.green.primary} />
                  <Text style={styles.cardLabel}>Join LAN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          /* Mobile Layout */
          <>
            <View style={styles.logoSection}>
              <AppLogo size="md" showTagline={true} />
            </View>

            <View style={styles.buttonsSection}>
              {/* 1. Play vs AI */}
              <TouchableOpacity
                style={[styles.playButton, styles.greenButton]}
                onPress={navigateToAIGame}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, styles.greenIconBox]}>
                  <LucideIcon name="Bot" size={22} color={colors.green.primary} />
                </View>
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Play vs AI</Text>
                  <Text style={styles.buttonSub}>Stockfish · 3 difficulty levels</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              {/* 2. WiFi LAN Multiplayer */}
              <TouchableOpacity
                style={[styles.playButton, styles.lanButton]}
                onPress={() => setLanModalVisible(true)}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, styles.lanIconBox]}>
                  <LucideIcon name="Wifi" size={22} color="#70e000" />
                </View>
                <View style={styles.buttonText}>
                  <View style={styles.badgeRow}>
                    <Text style={styles.buttonLabel}>WiFi LAN System</Text>
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>LOCAL LAN</Text>
                    </View>
                  </View>
                  <Text style={styles.buttonSub}>Play with a friend on same WiFi</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              {/* 3. Pass & Play */}
              <TouchableOpacity
                style={[styles.playButton, styles.brownButton]}
                onPress={navigateToFriendGame}
                activeOpacity={0.75}
              >
                <View style={[styles.iconBox, styles.brownIconBox]}>
                  <LucideIcon name="Users" size={22} color={colors.brown.light} />
                </View>
                <View style={styles.buttonText}>
                  <Text style={styles.buttonLabel}>Pass & Play</Text>
                  <Text style={styles.buttonSub}>Local vs Local · Same device</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>

              {/* Bottom Row */}
              <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.card} onPress={navigateToSettings}>
                  <LucideIcon name="Settings2" size={16} color={colors.text.secondary} />
                  <Text style={styles.cardLabel}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => setLanModalVisible(true)}
                >
                  <LucideIcon name="Wifi" size={16} color={colors.green.primary} />
                  <Text style={styles.cardLabel}>Connect LAN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        <Text style={styles.footer}>chessKhelo · Forest Edition</Text>
      </SafeAreaView>

      {/* LAN Game Setup Modal */}
      <LanGameModal
        visible={lanModalVisible}
        onClose={() => setLanModalVisible(false)}
        onStartLanGame={handleStartLanGame}
      />
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
    maxWidth: isDesktop ? 960 : 420,
    justifyContent: isDesktop ? 'center' : 'space-between',
  },
  desktopLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 60,
  },
  desktopLeft: {
    flex: 1,
    alignItems: 'flex-start',
    gap: spacing.lg,
  },
  desktopRight: {
    flex: 1.1,
    gap: spacing.md,
  },
  desktopDesc: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    lineHeight: 24,
    marginTop: spacing.xs,
  },
  desktopSubheading: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    letterSpacing: 2,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  buttonsSection: {
    gap: spacing.md,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md + 4,
    borderRadius: spacing.borderRadius.lg,
    borderWidth: 1.5,
    gap: spacing.md,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: spacing.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenIconBox: {
    backgroundColor: 'rgba(82,183,136,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(82,183,136,0.3)',
  },
  greenButton: {
    backgroundColor: 'rgba(82,183,136,0.12)',
    borderColor: colors.green.border,
    borderTopColor: 'rgba(82,183,136,0.5)',
  },
  lanIconBox: {
    backgroundColor: 'rgba(112,224,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(112,224,0,0.35)',
  },
  lanButton: {
    backgroundColor: 'rgba(112,224,0,0.10)',
    borderColor: 'rgba(112,224,0,0.35)',
    borderTopColor: 'rgba(112,224,0,0.6)',
  },
  brownIconBox: {
    backgroundColor: 'rgba(139,94,60,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139,94,60,0.3)',
  },
  brownButton: {
    backgroundColor: colors.brown.dim,
    borderColor: colors.brown.border,
    borderTopColor: 'rgba(196,154,108,0.4)',
  },
  buttonText: {
    flex: 1,
    gap: 3,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  newBadge: {
    backgroundColor: 'rgba(112,224,0,0.2)',
    borderWidth: 1,
    borderColor: '#70e000',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
  },
  newBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#70e000',
    letterSpacing: 0.5,
  },
  buttonLabel: {
    fontSize: typography.sizes.md + 1,
    fontWeight: '700',
    color: colors.text.primary,
  },
  buttonSub: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
  },
  arrow: {
    fontSize: 22,
    color: colors.text.secondary,
  },
  bottomRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  card: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  cardLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  footer: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.md,
    letterSpacing: 1,
  },
});
