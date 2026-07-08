import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppModal, AppText, Button, ScreenContainer } from '../../components/common';
import { useSettings } from '../../hooks/useSettings';
import { colors, spacing } from '../../theme';

export function SettingsScreen() {
  const { clearHistory } = useSettings();
  const [confirmVisible, setConfirmVisible] = useState(false);

  function handleConfirmClear() {
    clearHistory();
    setConfirmVisible(false);
  }

  return (
    <ScreenContainer>
      <AppText variant="label" color={colors.accent.default}>
        Paramètres
      </AppText>
      <AppText variant="heading1" style={styles.title}>
        Paramètres
      </AppText>

      <View style={styles.section}>
        <AppText variant="subtitle">Apparence</AppText>
        <AppText variant="body" color={colors.text.secondary} style={styles.sectionBody}>
          Thème sombre activé en permanence, pour une expérience fidèle à l&apos;ambiance d&apos;une
          salle de billard.
        </AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="subtitle">Données</AppText>
        <AppText variant="body" color={colors.text.secondary} style={styles.sectionBody}>
          L&apos;historique conserve automatiquement les parties des 3 dernières heures.
        </AppText>
        <Button
          label="Vider l'historique"
          variant="secondary"
          onPress={() => setConfirmVisible(true)}
        />
      </View>

      <AppModal
        visible={confirmVisible}
        title="Vider l'historique ?"
        onClose={() => setConfirmVisible(false)}
      >
        <AppText variant="body" color={colors.text.secondary} style={styles.confirmText}>
          Toutes les parties enregistrées seront supprimées définitivement.
        </AppText>
        <View style={styles.confirmButtons}>
          <Button label="Annuler" variant="ghost" onPress={() => setConfirmVisible(false)} />
          <Button label="Confirmer" variant="primary" onPress={handleConfirmClear} />
        </View>
      </AppModal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionBody: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  confirmText: {
    marginBottom: spacing.xl,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
  },
});
