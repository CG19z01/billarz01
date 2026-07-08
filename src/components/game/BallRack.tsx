import { StyleSheet, View } from 'react-native';

import { BilliardBall } from '../../components/balls';
import { spacing } from '../../theme';

interface BallRackProps {
  ballNumbers: number[];
  onPressBall?: (ballNumber: number) => void;
  size?: number;
}

export function BallRack({ ballNumbers, onPressBall, size = 40 }: BallRackProps) {
  return (
    <View style={styles.grid}>
      {ballNumbers.map((ballNumber) => (
        <BilliardBall
          key={ballNumber}
          number={ballNumber}
          size={size}
          onPress={onPressBall ? () => onPressBall(ballNumber) : undefined}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
