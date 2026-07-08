import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../theme';
import { AppText } from './AppText';

interface AppModalProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function AppModal({ visible, title, onClose, children }: AppModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <AppText variant="heading2" style={styles.title}>
            {title}
          </AppText>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: colors.background.elevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border.default,
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.lg,
  },
});
