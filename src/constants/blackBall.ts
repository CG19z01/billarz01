// Utilisé uniquement par le moteur "libre" (freeScoring), sans conséquence sur le score.
export type BlackBallShotType = 'direct' | 'one-cushion' | 'two-cushions';

export const BLACK_BALL_SHOT_OPTIONS: { value: BlackBallShotType; label: string }[] = [
  { value: 'direct', label: 'Directe (0 bande)' },
  { value: 'one-cushion', label: '1 bande' },
  { value: 'two-cushions', label: '2 bandes' },
];
