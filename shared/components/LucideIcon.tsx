import React from 'react';
import { icons } from 'lucide-react-native';
import { colors } from '../theme/colors';

interface LucideIconProps {
  name: keyof typeof icons;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  size = 20,
  color = colors.text.primary,
  strokeWidth = 1.8,
}) => {
  const Icon = icons[name];

  if (!Icon) return null;

  return <Icon size={size} color={color} strokeWidth={strokeWidth} />;
};