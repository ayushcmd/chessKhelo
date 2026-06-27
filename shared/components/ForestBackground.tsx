import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Rect, Defs, LinearGradient, Stop, RadialGradient } from 'react-native-svg';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export const ForestBackground: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Base gradient */}
      <View style={styles.baseBg} />

      {/* Fog layers */}
      <View style={styles.fogBottom} />
      <View style={styles.fogAccent} />

      {/* Moonlight glow */}
      <View style={styles.moonGlow} />

      {/* SVG Trees */}
      <Svg
        style={styles.trees}
        width={width}
        height={height * 0.45}
        viewBox={`0 0 ${width} 300`}
        preserveAspectRatio="none"
      >
        <Defs>
          <LinearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#040a05" stopOpacity="0.95" />
            <Stop offset="100%" stopColor="#020502" stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Back trees - lighter */}
        <Polygon points="0,300 25,160 50,300" fill="#081508" opacity="0.7" />
        <Polygon points="220,300 245,150 270,300" fill="#081508" opacity="0.7" />
        <Polygon points="100,300 120,140 140,300" fill="#091809" opacity="0.6" />

        {/* Mid trees */}
        <Polygon points="15,300 50,110 85,300" fill="#0a1f0b" opacity="0.9" />
        <Polygon points="60,300 95,80 130,300" fill="#0d2510" opacity="0.95" />
        <Polygon points="150,300 182,90 214,300" fill="#0a1f0b" opacity="0.9" />
        <Polygon points="195,300 230,100 265,300" fill="#0d2510" opacity="0.95" />

        {/* Front trees - darkest */}
        <Polygon points="0,300 30,180 60,300" fill="#071208" opacity="0.85" />
        <Polygon points="210,300 240,170 270,300" fill="#071208" opacity="0.85" />

        {/* Trunks */}
        <Rect x="59" y="250" width="7" height="50" fill="#2a1508" opacity="0.9" />
        <Rect x="88" y="242" width="8" height="58" fill="#2a1508" opacity="0.9" />
        <Rect x="171" y="246" width="7" height="54" fill="#2a1508" opacity="0.9" />
        <Rect x="223" y="240" width="8" height="60" fill="#2a1508" opacity="0.9" />

        {/* Ground */}
        <Rect x="0" y="280" width={width} height="20" fill="url(#groundGrad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  baseBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.bg.primary,
  },
  fogBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.4,
    backgroundColor: 'transparent',
  },
  fogAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.3,
    backgroundColor: 'rgba(82,183,136,0.04)',
  },
  moonGlow: {
    position: 'absolute',
    top: 0,
    left: width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(200,230,180,0.05)',
  },
  trees: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});