# Formation React

## Installation

```sh
npm install
cp .env.local.example .env.local
npm run seed
npm run dev
```

## TP de validation des acquis

Nous avons implémenté durant cette formation un CRM basique permettant la gestion des commandes.
Il est demandé aux stagiaires d'implémenter la gestion des clients selon le même procédé en suivant ce cahier des charges:

- Création d'une route pour afficher l'ensemble des clients: `/customers`.
- La liste des clients sera affichée sous forme d'un tableau dont voici les colonnes: ID, Name (nom/prénom avec photo de profil), Email, Total Spent (somme totale dépensée par le client en agrégeant toutes ses commandes), Customer since (date de création du client).
- Les actions contextuelles de chaque ligne devront permettre de copier l'email du client, de le modifier ou de le supprimer.
- Avant la suppression d'un client, une boîte de dialogue permettant de confirmer l'action sera affichée.
- Le bouton "Add customer" déclenche l'ouverture d'une boîte de dialogue permettant la création d'un nouveau client par la saisie d'un formulaire.
- L'édition du client se fera via l'affichage d'une boîte de dialogue contenant un formulaire d'édition, en ré-utilisant celui développé à l'étape précédente.
- On doit pouvoir filtrer les clients par email grâce à un champ de recherche.
- Les lignes du tableau doivent être cliquables et rediriger sur la route permettant d'afficher les détails du client: `/customers/:id`.
- Sur la page d'un client, on affichera le formulaire d'édition du client en ré-utilisant celui implémenté précédemment.
- Bonus: pagination du tableau des clients, sélection de plusieurs clients dans le tableau pour les supprimer en batch, ajout des KPI clients sur le dashboard.
