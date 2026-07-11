# Roadmap

Ce document liste les évolutions prévues pour **Billard Score**, classées par
thème. Aucun élément listé ici n'est implémenté : c'est un plan, pas un état
des lieux. L'avancement réel se suit dans [CHANGELOG.md](./CHANGELOG.md).

## Configuration d'une partie

- **Configuration des équipes** — empêcher de sélectionner un nombre d'équipes
  inférieur au nombre de joueurs déjà choisi, pour éviter une répartition
  impossible.
- **Nom des équipes** — permettre de personnaliser le nom de chaque équipe
  (fonctionnalité absente aujourd'hui, les équipes portent un nom générique).
- **Réinitialisation d'une partie** — corriger le comportement actuel : quand
  une partie est commencée puis abandonnée (retour en arrière), sa
  configuration reste enregistrée et est réutilisée pour la partie suivante.
  Une nouvelle partie doit toujours démarrer sur une configuration propre.

## Écran des équipes

- Refonte complète de l'écran de composition des équipes.
- Contrainte à conserver : pas de défilement (scroll) sur cet écran.
- Toutes les informations et indications doivent rester visibles à l'écran
  malgré cette contrainte.

## Pendant une partie

- **Fin de partie** — ajouter un bouton « Fin de partie » accessible pendant
  le déroulement d'une partie. Un appui demande une confirmation ; une fois
  confirmée, l'utilisateur est redirigé vers la page d'accueil.
- **Navigation** — supprimer la flèche de retour de l'écran de partie.

## Visuel et design

- **Design des boules** — améliorer la qualité visuelle des boules de
  billard : le détourage actuel est presque correct mais reste imparfait.
- **Design général** — revoir le design général de l'application pour
  renforcer sa cohérence, son ergonomie et son esthétique d'ensemble.

## Idées à plus long terme

- Statistiques de progression par joueur
- Synchronisation cloud multi-appareils
- Profils joueurs persistants (avatar, historique individuel)
- Thèmes clair / sombre configurables
- Export PDF d'une feuille de match
- Export CSV de l'historique
- Support multilingue (i18n)
