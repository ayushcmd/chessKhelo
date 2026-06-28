import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { DifficultySelector } from '../features/settings/components/DifficultySelector';
import { SoundToggle } from '../features/settings/components/SoundToggle';
import { ThemeSelector } from '../features/settings/components/ThemeSelector';
import { useGameSettings } from '../shared/hooks/useGameSettings';
import { LucideIcon } from '../shared/components/LucideIcon';
import { colors } from '../shared/theme/colors';
import { spacing } from '../shared/theme/spacing';
import { typography } from '../shared/theme/typography';

const { width } = Dimensions.get('window');
const isDesktop = width > 768;

export default function SettingsScreen() {
  const router = useRouter();
  const {
    settings,
    setDifficulty,
    setTimerDuration,
    setBoardTheme,
    toggleMoveSound,
    toggleAmbience,
    toggleHints,
    resetSettings,
  } = useGameSettings();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.push('/home')}
          >
            <LucideIcon name="ChevronLeft" size={18} color={colors.text.secondary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <TouchableOpacity onPress={resetSettings}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            isDesktop && styles.desktopContent,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* GAMEPLAY */}
          <View style={isDesktop ? styles.desktopColumn : styles.section}>
            <Text style={styles.sectionTitle}>Gameplay</Text>

            {/* Difficulty */}
            <View style={styles.settingRow}>
              <View style={styles.rowHeader}>
                <View style={[styles.iconBox, { backgroundColor: colors.green.dim, borderColor: colors.green.border }]}>
                  <LucideIcon name="Brain" size={15} color={colors.green.primary} />
                </View>
                <View>
                  <Text style={styles.rowLabel}>AI Difficulty</Text>
                  <Text style={styles.rowSub}>
                    Current: {settings.difficulty}
                  </Text>
                </View>
              </View>
              <DifficultySelector
                selected={settings.difficulty}
                onSelect={setDifficulty}
              />
            </View>

            {/* Timer */}
            <View style={styles.settingRow}>
              <View style={styles.rowHeader}>
                <View style={[styles.iconBox, { backgroundColor: colors.brown.dim, borderColor: colors.brown.border }]}>
                  <LucideIcon name="Timer" size={15} color={colors.brown.light} />
                </View>
                <View>
                  <Text style={styles.rowLabel}>Game Timer</Text>
                  <Text style={styles.rowSub}>Time per player</Text>
                </View>
              </View>
              <View style={styles.chipRow}>
                {[3 * 60, 5 * 60, 10 * 60].map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.chip,
                      settings.timerDuration === time && styles.activeChip,
                    ]}
                    onPress={() => setTimerDuration(time)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        settings.timerDuration === time && styles.activeChipText,
                      ]}
                    >
                      {time / 60}m
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Hints toggle */}
            <SoundToggle
              label="Show Hints"
              subtitle="Highlight valid moves"
              enabled={settings.showHints}
              onToggle={toggleHints}
              icon="Brain"
            />
          </View>

          {/* APPEARANCE */}
          <View style={isDesktop ? styles.desktopColumn : styles.section}>
            <Text style={styles.sectionTitle}>Appearance</Text>

            <View style={styles.settingRow}>
              <View style={styles.rowHeader}>
                <View style={[styles.iconBox, { backgroundColor: colors.brown.dim, borderColor: colors.brown.border }]}>
                  <LucideIcon name="Trophy" size={15} color={colors.brown.light} />
                </View>
                <View>
                  <Text style={styles.rowLabel}>Board Theme</Text>
                  <Text style={styles.rowSub}>Current: {settings.boardTheme}</Text>
                </View>
              </View>
              <ThemeSelector
                selected={settings.boardTheme}
                onSelect={setBoardTheme}
              />
            </View>

            {/* SOUND */}
            <Text style={styles.sectionTitle}>Sound</Text>

            <SoundToggle
              label="Move Sounds"
              subtitle="Piece click and capture"
              enabled={settings.moveSoundEnabled}
              onToggle={toggleMoveSound}
              icon="Volume2"
            />

            <SoundToggle
              label="Forest Ambience"
              subtitle="Background nature sounds"
              enabled={settings.ambienceEnabled}
              onToggle={toggleAmbience}
              icon="Volume2"
            />
          </View>
        </ScrollView>
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
  resetText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.xl,
    paddingBottom: spacing.xl,
  },
  desktopContent: {
    flexDirection: 'row',
    gap: spacing.xxl,
    alignItems: 'flex-start',
  },
  desktopColumn: {
    flex: 1,
    gap: spacing.md,
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.text.muted,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.xs,
  },
  settingRow: {
    backgroundColor: colors.glass.dark,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.glass.border,
    borderTopColor: colors.glass.borderTop,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  rowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: spacing.borderRadius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: typography.sizes.md,
    fontWeight: '500',
    color: colors.text.primary,
  },
  rowSub: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    marginTop: 2,
    textTransform: 'capitalize',
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: colors.green.dim,
    borderColor: colors.green.border,
  },
  chipText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  activeChipText: {
    color: colors.green.primary,
    fontWeight: '600',
  },
});