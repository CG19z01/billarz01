import { Image, type ImageSourcePropType } from 'react-native';
import Svg, { Circle, ClipPath, Defs, Rect, Text as SvgText } from 'react-native-svg';

import { BALL_IMAGE_OVERRIDES } from '../../constants/ballAssets';
import { BALL_STYLES } from '../../constants/ballColors';
import { fontFamily } from '../../theme';

interface BilliardBallGraphicProps {
  number: number;
  size: number;
}

const CENTER_BADGE_FILL = '#F5F1E6';
const CENTER_BADGE_TEXT_COLOR = '#141414';

export function BilliardBallGraphic({ number, size }: BilliardBallGraphicProps) {
  const imageOverride: ImageSourcePropType | undefined = BALL_IMAGE_OVERRIDES[number];

  if (imageOverride) {
    return (
      <Image source={imageOverride} style={{ width: size, height: size }} resizeMode="contain" />
    );
  }

  const style = BALL_STYLES[number] ?? BALL_STYLES[0];
  const center = size / 2;
  const radius = center;
  const badgeRadius = radius * 0.42;
  const clipId = `ball-clip-${number}`;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <ClipPath id={clipId}>
          <Circle cx={center} cy={center} r={radius} />
        </ClipPath>
      </Defs>

      <Circle
        cx={center}
        cy={center}
        r={radius}
        fill={style.striped ? CENTER_BADGE_FILL : style.color}
      />

      {style.striped ? (
        <Rect
          x={0}
          y={center - radius * 0.38}
          width={size}
          height={radius * 0.76}
          fill={style.color}
          clipPath={`url(#${clipId})`}
        />
      ) : null}

      {number !== 0 ? (
        <>
          <Circle cx={center} cy={center} r={badgeRadius} fill={CENTER_BADGE_FILL} />
          <SvgText
            x={center}
            y={center}
            fontSize={badgeRadius * 1.15}
            fontFamily={fontFamily.bodySemiBold}
            fill={CENTER_BADGE_TEXT_COLOR}
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {number}
          </SvgText>
        </>
      ) : null}
    </Svg>
  );
}
