import type { ScoreEntry } from '../../utils/matchSelectors';
import { ScoreEntryRow } from './ScoreEntryRow';

interface ScoreBoardProps {
  entries: ScoreEntry[];
  scores: Record<string, number>;
  onAddPoint: (entryId: string) => void;
  onRemovePoint: (entryId: string) => void;
  onPressBlackBall: (entryId: string) => void;
}

export function ScoreBoard({
  entries,
  scores,
  onAddPoint,
  onRemovePoint,
  onPressBlackBall,
}: ScoreBoardProps) {
  return (
    <>
      {entries.map((entry) => (
        <ScoreEntryRow
          key={entry.id}
          entry={entry}
          score={scores[entry.id] ?? 0}
          onAddPoint={() => onAddPoint(entry.id)}
          onRemovePoint={() => onRemovePoint(entry.id)}
          onPressBlackBall={() => onPressBlackBall(entry.id)}
        />
      ))}
    </>
  );
}
