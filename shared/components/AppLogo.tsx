import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  size = 'md',
  showTagline = true,
}) => {
  const iconSize = size === 'sm' ? 36 : size === 'lg' ? 76 : 56;
  const titleSize = size === 'sm' ? 18 : size === 'lg' ? 36 : 26;

  return (
    <View style={styles.container}>
      {/* Emblem container */}
      <View
        style={[
          styles.emblemContainer,
          {
            width: iconSize + 16,
            height: iconSize + 16,
            borderRadius: (iconSize + 16) / 2,
          },
        ]}
      >
        <View
          style={[
            styles.emblemInner,
            {
              width: iconSize + 8,
              height: iconSize + 8,
              borderRadius: (iconSize + 8) / 2,
            },
          ]}
        >
          <Image
            source={require('../../assets/icon.png')}
            style={{ width: iconSize, height: iconSize, borderRadius: iconSize / 2 }}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Brand title */}
      <View style={styles.textContainer}>
        <View style={styles.titleRow}>
          <Text style={[styles.titleChess, { fontSize: titleSize }]}>chess</Text>
          <Text style={[styles.titleKhelo, { fontSize: titleSize }]}>Khelo</Text>
        </View>

        {showTagline && (
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <Text style={styles.taglineText}>FOREST EDITION · LOCAL & LAN</Text>
            <View style={styles.taglineLine} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emblemContainer: {
    backgroundColor: 'rgba(82,183,136,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(82,183,136,0.4)',
    borderTopColor: colors.brown.light,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.green.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  emblemInner: {
    backgroundColor: colors.bg.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  textContainer: {
    alignItems: 'center',
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleChess: {
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 2,
  },
  titleKhelo: {
    fontWeight: '800',
    color: colors.green.primary,
    letterSpacing: 2,
  },
  taglineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  taglineLine: {
    height: 1,
    width: 20,
    backgroundColor: 'rgba(196,154,108,0.4)',
  },
  taglineText: {
    fontSize: typography.sizes.xs - 1,
    color: 'rgba(196,154,108,0.85)',
    letterSpacing: 2,
    fontWeight: '600',
  },
});
