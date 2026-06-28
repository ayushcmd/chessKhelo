import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Modal } from 'react-native';
import { LucideIcon } from '../../../shared/components/LucideIcon';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

interface ResignButtonProps {
  onResign: () => void;
}

export const ResignButton: React.FC<ResignButtonProps> = ({ onResign }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowConfirm(true)}
        activeOpacity={0.75}
      >
        <LucideIcon name="Flag" size={15} color={colors.danger.primary} />
        <Text style={styles.label}>Resign</Text>
      </TouchableOpacity>

      {/* Confirm Modal */}
      <Modal transparent visible={showConfirm} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Resign Game?</Text>
            <Text style={styles.modalSub}>
              Are you sure you want to resign?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resignBtn}
                onPress={() => {
                  setShowConfirm(false);
                  onResign();
                }}
              >
                <Text style={styles.resignText}>Resign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: colors.danger.dim,
    borderWidth: 1,
    borderTopWidth: 1.5,
    borderColor: colors.danger.border,
    borderTopColor: 'rgba(220,80,80,0.35)',
    borderRadius: spacing.borderRadius.md,
    padding: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: typography.sizes.xs,
    color: colors.danger.primary,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#0d1f10',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: spacing.borderRadius.lg,
    padding: spacing.xl,
    width: 280,
    gap: spacing.md,
  },
  modalTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
  },
  modalSub: {
    fontSize: typography.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: colors.glass.light,
    borderWidth: 1,
    borderColor: colors.glass.border,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  cancelText: {
    color: colors.text.primary,
    fontSize: typography.sizes.md,
    fontWeight: '500',
  },
  resignBtn: {
    flex: 1,
    backgroundColor: colors.danger.dim,
    borderWidth: 1,
    borderColor: colors.danger.border,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  resignText: {
    color: colors.danger.primary,
    fontSize: typography.sizes.md,
    fontWeight: '600',
  },
});