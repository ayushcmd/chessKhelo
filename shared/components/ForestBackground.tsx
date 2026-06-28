import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export const ForestBackground: React.FC = () => {
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {/* Base dark green bg */}
        <View style={styles.baseBg} />
        {/* Radial glow top center */}
        <View style={styles.glowTop} />
        {/* Radial glow bottom green */}
        <View style={styles.glowBottom} />
        {/* Dark overlay */}
        <View style={styles.overlay} />
        {/* Tree silhouettes using views */}
        <View style={styles.treesContainer}>
          {/* Back trees */}
          <View style={[styles.tree, { left: '5%', height: height * 0.3, width: 60, bottom: 0, opacity: 0.5 }]} />
          <View style={[styles.tree, { left: '20%', height: height * 0.35, width: 70, bottom: 0, opacity: 0.55 }]} />
          <View style={[styles.tree, { left: '38%', height: height * 0.28, width: 55, bottom: 0, opacity: 0.45 }]} />
          <View style={[styles.tree, { right: '20%', height: height * 0.35, width: 70, bottom: 0, opacity: 0.55 }]} />
          <View style={[styles.tree, { right: '5%', height: height * 0.3, width: 60, bottom: 0, opacity: 0.5 }]} />
          {/* Front trees - darker */}
          <View style={[styles.treeFront, { left: '-2%', height: height * 0.4, width: 80, bottom: 0 }]} />
          <View style={[styles.treeFront, { left: '15%', height: height * 0.45, width: 90, bottom: 0 }]} />
          <View style={[styles.treeFront, { right: '15%', height: height * 0.45, width: 90, bottom: 0 }]} />
          <View style={[styles.treeFront, { right: '-2%', height: height * 0.4, width: 80, bottom: 0 }]} />
          {/* Ground */}
          <View style={styles.ground} />
        </View>
      </View>
    );
  }

  // Native — use SVG version
  const Svg = require('react-native-svg').default;
  const { Polygon, Rect, Defs, LinearGradient, Stop } =
    require('react-native-svg');

  return (
    <View style={styles.container}>
      <View style={styles.baseBg} />
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />
      <Svg
        style={styles.treesContainer}
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
        <Polygon points="0,300 25,160 50,300" fill="#081508" opacity="0.7" />
        <Polygon points="220,300 245,150 270,300" fill="#081508" opacity="0.7" />
        <Polygon points="15,300 50,110 85,300" fill="#0a1f0b" opacity="0.9" />
        <Polygon points="60,300 95,80 130,300" fill="#0d2510" opacity="0.95" />
        <Polygon points="150,300 182,90 214,300" fill="#0a1f0b" opacity="0.9" />
        <Polygon points="195,300 230,100 265,300" fill="#0d2510" opacity="0.95" />
        <Rect x="59" y="250" width="7" height="50" fill="#2a1508" opacity="0.9" />
        <Rect x="88" y="242" width="8" height="58" fill="#2a1508" opacity="0.9" />
        <Rect x="171" y="246" width="7" height="54" fill="#2a1508" opacity="0.9" />
        <Rect x="223" y="240" width="8" height="60" fill="#2a1508" opacity="0.9" />
        <Rect x="0" y="280" width={width} height="20" fill="url(#groundGrad)" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  baseBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#060f07',
  },
  glowTop: {
    position: 'absolute',
    top: -60,
    left: '50%',
    marginLeft: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(200,230,180,0.04)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -40,
    left: '30%',
    width: 400,
    height: 300,
    borderRadius: 200,
    backgroundColor: 'rgba(82,183,136,0.06)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(6,15,7,0.3)',
  },
  treesContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tree: {
    position: 'absolute',
    backgroundColor: '#091809',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
  },
  treeFront: {
    position: 'absolute',
    backgroundColor: '#060f07',
    borderTopLeftRadius: 999,
    borderTopRightRadius: 999,
    opacity: 0.95,
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: '#040a05',
  },
});