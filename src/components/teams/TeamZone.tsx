import type { ReactNode } from 'react';
import { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '../../components/common';
import type { ZoneRect } from '../../hooks/useTeamZonesLayout';
import { colors, radius, spacing } from '../../theme';

interface TeamZoneProps {
  teamId: string;
  name: string;
  color: string;
  onLayoutRect: (teamId: string, rect: ZoneRect) => void;
  children: ReactNode;
}

export function TeamZone({ teamId, name, color, onLayoutRect, children }: TeamZoneProps) {
  const viewRef = useRef<View>(null);

  const measure = () => {
    viewRef.current?.measureInWindow((x, y, width, height) => {
      onLayoutRect(teamId, { x, y, width, height });
    });
  };

  return (
    <View ref={viewRef} style={styles.card} onLayout={measure}>
      <View style={styles.header}>
        <View style={[styles.colorDot, { backgroundColor: color }]} />
        <AppText variant="subtitle">{name}</AppText>
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const DOT_SIZE = 10;

const styles = StyleSheet.create({
  card: {
    flexBasis: '48%',
    flexGrow: 1,
    backgroundColor: colors.background.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.subtle,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  colorDot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: radius.pill,
    marginRight: spacing.sm,
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    minHeight: 72,
  },
});
