import type { ReactNode } from 'react';
import { type PressableProps, StyleSheet, View } from 'react-native';

import { borderWidth, colors, radius, spacing } from '../../theme';
import { AnimatedPressable } from './AnimatedPressable';
import { AppText } from './AppText';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends Omit<PressableProps, 'style' | 'children'> {
  label: string;
  variant?: ButtonVariant;
  icon?: ReactNode;
}

export function Button({ label, variant = 'primary', icon, disabled, ...rest }: ButtonProps) {
  return (
    <AnimatedPressable
      disabled={disabled}
      style={[styles.base, variantStyles[variant], disabled && styles.disabled]}
      {...rest}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <AppText variant="button" color={labelColorByVariant[variant]}>
        {label}
      </AppText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    marginRight: spacing.sm,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.accent.default,
    borderWidth: borderWidth.thick,
    borderColor: colors.accent.pressed,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },
  secondary: {
    backgroundColor: colors.leather.default,
    borderWidth: borderWidth.thick,
    borderColor: colors.border.strong,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
});

const labelColorByVariant: Record<ButtonVariant, string> = {
  primary: colors.text.onAccent,
  secondary: colors.text.primary,
  ghost: colors.accent.default,
};
