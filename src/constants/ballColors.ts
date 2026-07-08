// Couleurs standard des boules de billard américain (0 = blanche, 1-7 unies, 8 noire, 9-15 rayées).
// Décoratif uniquement : aucune règle de jeu ici.
export interface BallStyle {
  color: string;
  striped: boolean;
}

export const BALL_STYLES: Record<number, BallStyle> = {
  0: { color: '#F5F1E6', striped: false },
  1: { color: '#F4C430', striped: false },
  2: { color: '#1F5FBF', striped: false },
  3: { color: '#C62828', striped: false },
  4: { color: '#6A3D9A', striped: false },
  5: { color: '#E8720C', striped: false },
  6: { color: '#1B7A3D', striped: false },
  7: { color: '#7B2D26', striped: false },
  8: { color: '#111111', striped: false },
  9: { color: '#F4C430', striped: true },
  10: { color: '#1F5FBF', striped: true },
  11: { color: '#C62828', striped: true },
  12: { color: '#6A3D9A', striped: true },
  13: { color: '#E8720C', striped: true },
  14: { color: '#1B7A3D', striped: true },
  15: { color: '#7B2D26', striped: true },
};
