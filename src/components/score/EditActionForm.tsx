import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button, Stepper } from '../../components/common';
import type { BlackBallShotType } from '../../constants/blackBall';
import type { MatchAction } from '../../models';
import { spacing } from '../../theme';
import { BlackBallShotPicker } from './BlackBallShotPicker';

interface EditActionFormProps {
  action: MatchAction;
  onConfirm: (payload: Record<string, unknown>) => void;
  onCancel: () => void;
}

export function EditActionForm({ action, onConfirm, onCancel }: EditActionFormProps) {
  const isPointAction = action.type === 'point-added' || action.type === 'point-removed';
  const [points, setPoints] = useState(Number(action.payload?.points ?? 1));
  const [shotType, setShotType] = useState<BlackBallShotType>(
    (action.payload?.blackBallShotType as BlackBallShotType) ?? 'direct',
  );

  return (
    <View>
      {isPointAction ? (
        <Stepper value={points} onChange={setPoints} min={1} />
      ) : (
        <BlackBallShotPicker value={shotType} onSelect={setShotType} />
      )}

      <View style={styles.buttons}>
        <Button label="Annuler" variant="ghost" onPress={onCancel} />
        <Button
          label="Enregistrer"
          variant="primary"
          onPress={() => onConfirm(isPointAction ? { points } : { blackBallShotType: shotType })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
});
