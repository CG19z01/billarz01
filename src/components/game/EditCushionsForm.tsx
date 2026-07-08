import { StyleSheet, View } from 'react-native';

import { Button } from '../../components/common';
import { spacing } from '../../theme';
import { CushionPicker } from './CushionPicker';

interface EditCushionsFormProps {
  onConfirm: (payload: Record<string, unknown>) => void;
  onCancel: () => void;
}

export function EditCushionsForm({ onConfirm, onCancel }: EditCushionsFormProps) {
  return (
    <View>
      <CushionPicker onSelect={(cushions) => onConfirm({ cushions })} />
      <View style={styles.buttons}>
        <Button label="Annuler" variant="ghost" onPress={onCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.xl,
  },
});
