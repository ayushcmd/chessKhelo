import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface LanGameModalProps {
  visible: boolean;
  onClose: () => void;
  onStartLanGame: (params: {
    roomCode: string;
    role: 'host' | 'guest';
    side: 'w' | 'b';
    timeMinutes: number;
  }) => void;
}

const generateRoomCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const LanGameModal: React.FC<LanGameModalProps> = ({
  visible,
  onClose,
  onStartLanGame,
}) => {
  const [activeTab, setActiveTab] = useState<'host' | 'join'>('host');
  const [roomCode, setRoomCode] = useState(generateRoomCode);
  const [joinCode, setJoinCode] = useState('');
  const [selectedSide, setSelectedSide] = useState<'w' | 'b'>('w');
  const [timeMinutes, setTimeMinutes] = useState<number>(10);
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleHostStart = () => {
    onStartLanGame({
      roomCode,
      role: 'host',
      side: selectedSide,
      timeMinutes,
    });
  };

  const handleJoinStart = () => {
    if (!joinCode.trim()) return;
    onStartLanGame({
      roomCode: joinCode.trim(),
      role: 'guest',
      side: 'b',
      timeMinutes,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.wifiIconBadge}>
                <LucideIcon name="Wifi" size={18} color={colors.green.primary} />
              </View>
              <Text style={styles.headerTitle}>WiFi LAN Multiplayer</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Subtitle */}
          <Text style={styles.headerSub}>
            Play locally with another phone, PC, or tablet on the same WiFi network.
          </Text>

          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'host' && styles.activeTab]}
              onPress={() => setActiveTab('host')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'host' && styles.activeTabText,
                ]}
              >
                Host Game
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'join' && styles.activeTab]}
              onPress={() => setActiveTab('join')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'join' && styles.activeTabText,
                ]}
              >
                Join Game
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content: Host */}
          {activeTab === 'host' ? (
            <View style={styles.content}>
              <View style={styles.codeCard}>
                <Text style={styles.codeLabel}>YOUR LAN ROOM CODE</Text>
                <View style={styles.codeRow}>
                  <Text style={styles.codeText}>{roomCode}</Text>
                  <TouchableOpacity
                    style={styles.copyBtn}
                    onPress={handleCopyCode}
                  >
                    <LucideIcon
                      name={copied ? 'Check' : 'Copy'}
                      size={16}
                      color={copied ? colors.green.primary : colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.copyBtnText,
                        copied && { color: colors.green.primary },
                      ]}
                    >
                      {copied ? 'Copied' : 'Copy'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.codeHelp}>
                  Share this 4-digit code with your friend on the same WiFi.
                </Text>
              </View>

              {/* Side Selection */}
              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Your Side:</Text>
                <View style={styles.sideButtons}>
                  <TouchableOpacity
                    style={[
                      styles.sideBtn,
                      selectedSide === 'w' && styles.activeSideBtn,
                    ]}
                    onPress={() => setSelectedSide('w')}
                  >
                    <Text
                      style={[
                        styles.sideBtnText,
                        selectedSide === 'w' && styles.activeSideBtnText,
                      ]}
                    >
                      ♔ White
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sideBtn,
                      selectedSide === 'b' && styles.activeSideBtn,
                    ]}
                    onPress={() => setSelectedSide('b')}
                  >
                    <Text
                      style={[
                        styles.sideBtnText,
                        selectedSide === 'b' && styles.activeSideBtnText,
                      ]}
                    >
                      ♚ Black
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Time Control */}
              <View style={styles.optionRow}>
                <Text style={styles.optionLabel}>Time Control:</Text>
                <View style={styles.timeButtons}>
                  {[5, 10, 15].map((mins) => (
                    <TouchableOpacity
                      key={mins}
                      style={[
                        styles.timeBtn,
                        timeMinutes === mins && styles.activeTimeBtn,
                      ]}
                      onPress={() => setTimeMinutes(mins)}
                    >
                      <Text
                        style={[
                          styles.timeBtnText,
                          timeMinutes === mins && styles.activeTimeBtnText,
                        ]}
                      >
                        {mins}m
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Action Button */}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={handleHostStart}
                activeOpacity={0.8}
              >
                <LucideIcon name="Wifi" size={18} color="#060f07" />
                <Text style={styles.actionBtnText}>Launch LAN Game Room</Text>
              </TouchableOpacity>
            </View>
          ) : (
            /* Tab Content: Join */
            <View style={styles.content}>
              <View style={styles.joinInputBox}>
                <Text style={styles.codeLabel}>ENTER 4-DIGIT ROOM CODE</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="e.g. 4819"
                  placeholderTextColor={colors.text.muted}
                  value={joinCode}
                  onChangeText={setJoinCode}
                  keyboardType="number-pad"
                  maxLength={6}
                  autoFocus
                />
              </View>

              <Text style={styles.codeHelp}>
                Enter the code displayed on the host's screen to connect over WiFi.
              </Text>

              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  !joinCode.trim() && styles.disabledBtn,
                ]}
                onPress={handleJoinStart}
                disabled={!joinCode.trim()}
                activeOpacity={0.8}
              >
                <LucideIcon name="Wifi" size={18} color="#060f07" />
                <Text style={styles.actionBtnText}>Connect & Join Game</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Footer note */}
          <View style={styles.footerNote}>
            <LucideIcon name="House" size={14} color={colors.text.muted} />
            <Text style={styles.footerNoteText}>
              Requires both players to be on the same WiFi router or hotspot.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  container: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#0c2212',
    borderWidth: 1.5,
    borderColor: 'rgba(82,183,136,0.3)',
    borderTopColor: colors.green.primary,
    borderRadius: spacing.borderRadius.xl,
    padding: spacing.xl,
    gap: spacing.md,
    shadowColor: colors.green.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  wifiIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(82,183,136,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(82,183,136,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.text.primary,
    letterSpacing: 0.5,
  },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  headerSub: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: spacing.borderRadius.md,
    padding: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: spacing.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: 'rgba(82,183,136,0.2)',
    borderWidth: 1,
    borderColor: colors.green.border,
  },
  tabText: {
    fontSize: typography.sizes.sm,
    fontWeight: '600',
    color: colors.text.muted,
  },
  activeTabText: {
    color: colors.green.primary,
  },
  content: {
    gap: spacing.md,
  },
  codeCard: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(82,183,136,0.2)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  codeLabel: {
    fontSize: typography.sizes.xs,
    color: colors.text.muted,
    letterSpacing: 1.5,
    fontWeight: '600',
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: 4,
  },
  codeText: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.green.primary,
    letterSpacing: 6,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.sm,
  },
  copyBtnText: {
    fontSize: typography.sizes.xs,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  codeHelp: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  sideButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  sideBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  activeSideBtn: {
    backgroundColor: 'rgba(82,183,136,0.25)',
    borderColor: colors.green.primary,
  },
  sideBtnText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  activeSideBtnText: {
    color: colors.green.primary,
  },
  timeButtons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  timeBtn: {
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  activeTimeBtn: {
    backgroundColor: 'rgba(82,183,136,0.25)',
    borderColor: colors.green.primary,
  },
  timeBtnText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  activeTimeBtnText: {
    color: colors.green.primary,
  },
  joinInputBox: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(82,183,136,0.2)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
  },
  textInput: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.green.primary,
    textAlign: 'center',
    letterSpacing: 4,
    width: '100%',
    paddingVertical: 8,
  },
  actionBtn: {
    backgroundColor: colors.green.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: spacing.borderRadius.lg,
    marginTop: spacing.xs,
  },
  actionBtnText: {
    fontSize: typography.sizes.md,
    fontWeight: '700',
    color: '#060f07',
  },
  disabledBtn: {
    opacity: 0.4,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  footerNoteText: {
    fontSize: typography.sizes.xs - 1,
    color: colors.text.muted,
  },
});
