# Images des personnages (joueurs)

Par défaut, les personnages sont dessinés en SVG par `CharacterGraphic`
(`src/components/characters/CharacterGraphic.tsx`) : une silhouette buste, dans
une des couleurs suivantes selon son état.

## Pour remplacer par de vraies images

1. Déposez vos fichiers dans ce dossier, avec ces noms :
   - `character_default.png` — joueur pas encore assigné à une équipe.
   - `character_active.png` — joueur mis en avant (ex. champ de saisie du nom
     actuellement sélectionné).
   - `character_team_1.png`, `character_team_2.png`, `character_team_3.png`,
     `character_team_4.png` — un visuel par couleur d'équipe (dans l'ordre de
     `colors.team` dans `src/theme/colors.ts` : laiton, émeraude, grenat, ardoise).
2. Référencez-les dans `src/constants/characterAssets.ts` :

   ```ts
   export const CHARACTER_IMAGE_OVERRIDES: Partial<Record<CharacterVariant, ImageSourcePropType>> = {
     default: require('../assets/images/characters/character_default.png'),
     active: require('../assets/images/characters/character_active.png'),
     0: require('../assets/images/characters/character_team_1.png'),
     1: require('../assets/images/characters/character_team_2.png'),
     2: require('../assets/images/characters/character_team_3.png'),
     3: require('../assets/images/characters/character_team_4.png'),
   };
   ```

3. `CharacterGraphic` utilisera automatiquement l'image à la place du rendu
   vectoriel — aucun autre fichier à modifier. Vous pouvez ne renseigner que
   certaines clés : les autres garderont le rendu SVG.
