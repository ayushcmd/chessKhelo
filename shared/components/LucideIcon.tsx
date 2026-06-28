import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Bot,
  Users,
  Settings2,
  Trophy,
  User,
  Flag,
  RotateCcw,
  RefreshCw,
  ScrollText,
  Sword,
  Timer,
  Volume2,
  VolumeX,
  Brain,
  House,
} from 'lucide-react-native';
import { colors } from '../theme/colors';

const ICONS: Record<string, any> = {
  ChevronLeft,
  ChevronRight,
  Bot,
  Users,
  Settings2,
  Trophy,
  User,
  Flag,
  RotateCcw,
  RefreshCw,
  ScrollText,
  Sword,
  Timer,
  Volume2,
  VolumeX,
  Brain,
  House,
};

interface LucideIconProps {
  name: string;
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
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />;
};