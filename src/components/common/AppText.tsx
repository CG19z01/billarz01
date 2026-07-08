import { Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyVariant } from '../../theme';

interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: string;
}

export function AppText({
  variant = 'body',
  color = colors.text.primary,
  style,
  ...rest
}: AppTextProps) {
  return <Text style={[typography[variant], { color }, style]} {...rest} />;
}
