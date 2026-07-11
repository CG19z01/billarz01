import { Image } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Path, Rect } from 'react-native-svg';

import { CHARACTER_IMAGE_OVERRIDES } from '../../constants/characterAssets';
import { colors } from '../../theme';

// 'default' = pas encore assigné à une équipe, 'active' = en cours de saisie /
// mis en avant, un nombre = index dans colors.team (couleur de l'équipe).
export type CharacterVariant = 'default' | 'active' | number;

interface CharacterGraphicProps {
  variant: CharacterVariant;
  size: number;
}

function resolveColor(variant: CharacterVariant): string {
  if (variant === 'active') {
    return colors.accent.default;
  }
  if (typeof variant === 'number') {
    return colors.team[variant % colors.team.length];
  }
  return colors.text.muted;
}

export function CharacterGraphic({ variant, size }: CharacterGraphicProps) {
  const imageOverride = CHARACTER_IMAGE_OVERRIDES[variant];

  if (imageOverride) {
    return (
      <Image source={imageOverride} style={{ width: size, height: size }} resizeMode="contain" />
    );
  }

  const color = resolveColor(variant);
  const center = size / 2;
  const headRadius = size * 0.24;
  const headCenterY = size * 0.32;
  const clipId = `character-clip-${variant}`;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <ClipPath id={clipId}>
          <Circle cx={center} cy={center} r={center} />
        </ClipPath>
      </Defs>

      <Circle cx={center} cy={center} r={center} fill={colors.background.surface} />

      <Circle cx={center} cy={headCenterY} r={headRadius} fill={color} />

      <Path
        d={`M ${center} ${size * 0.52}
            C ${size * 0.2} ${size * 0.52}, ${size * 0.08} ${size * 0.78}, ${size * 0.08} ${size}
            L ${size * 0.92} ${size}
            C ${size * 0.92} ${size * 0.78}, ${size * 0.8} ${size * 0.52}, ${center} ${size * 0.52}
            Z`}
        fill={color}
        clipPath={`url(#${clipId})`}
      />

      <Rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill="transparent"
        stroke={colors.border.subtle}
        strokeWidth={1}
        rx={center}
        ry={center}
      />
    </Svg>
  );
}
