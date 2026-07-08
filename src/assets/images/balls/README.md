# Images des boules de billard

`ball_1.png` à `ball_15.png` sont de vraies images, en place et déjà référencées
dans `src/constants/ballAssets.ts`. `BilliardBall` les utilise automatiquement
partout où le composant apparaît.

Seule la boule blanche (`0`, boule de choc) n'a pas d'image : elle garde le
rendu vectoriel (SVG), fidèle aux couleurs standard du billard américain.

## Pour remplacer une image

1. Déposez le nouveau fichier dans ce dossier (même nom ou nouveau nom).
2. Mettez à jour la référence correspondante dans `src/constants/ballAssets.ts` :

   ```ts
   export const BALL_IMAGE_OVERRIDES: Partial<Record<number, ImageSourcePropType>> = {
     1: require('../assets/images/balls/ball_1.png'),
   };
   ```

3. `BilliardBall` utilisera automatiquement la nouvelle image — aucun autre
   fichier à modifier.

## Pour ajouter la boule blanche (0)

Ajoutez `ball_0.png` ici puis `0: require('../assets/images/balls/ball_0.png')`
dans `ballAssets.ts`.
