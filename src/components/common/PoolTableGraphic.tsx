import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';

import { colors, radius } from '../../theme';

interface PoolTableGraphicProps {
  height?: number;
  children?: ReactNode;
}

// Coordonnées exprimées dans le système du viewBox (300×100), pas en pixels
// réels — le SVG est ensuite étiré à la taille voulue via `height`.
const RAIL = 6;
const POCKET_RADIUS = 7;

export function PoolTableGraphic({ height = 140, children }: PoolTableGraphicProps) {
  return (
    <View style={[styles.wrapper, { height }]}>
      <Svg width="100%" height="100%" viewBox="0 0 300 100" preserveAspectRatio="none">
        <Rect x={0} y={0} width={300} height={100} rx={10} fill={colors.leather.default} />
        <Rect
          x={RAIL}
          y={RAIL}
          width={300 - RAIL * 2}
          height={100 - RAIL * 2}
          rx={6}
          fill={colors.background.felt}
        />
        {[
          [RAIL, RAIL],
          [150, RAIL * 0.6],
          [300 - RAIL, RAIL],
          [RAIL, 100 - RAIL],
          [150, 100 - RAIL * 0.6],
          [300 - RAIL, 100 - RAIL],
        ].map(([cx, cy], index) => (
          <Circle key={index} cx={cx} cy={cy} r={POCKET_RADIUS} fill={colors.background.default} />
        ))}
      </Svg>
      {children ? <View style={StyleSheet.absoluteFill}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: radius.md,
    overflow: 'hidden',
  },
});
