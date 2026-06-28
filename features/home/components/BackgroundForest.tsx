import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ForestBackground } from '../../../shared/components/ForestBackground';

export const BackgroundForest: React.FC = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <ForestBackground />
    </View>
  );
};

export default BackgroundForest;