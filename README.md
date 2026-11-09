# Bulbe Tech — PWA de gestion de réparation

Application web progressive (PWA) autonome pour une boutique de réparation de téléphones et ordinateurs.

## Fonctions incluses
- Tableau de bord mensuel : CA, dépenses, solde estimé, réparations actives.
- Réparations : appareil, panne, diagnostic, devis, coût pièces, main-d'œuvre, IMEI/série, statut et notes.
- Clients : coordonnées, historique des réparations et relance WhatsApp.
- Stock : articles, pièces, accessoires, seuil minimum, prix d'achat/vente et fournisseur.
- Fournisseurs : coordonnées et notes.
- Finance : recettes, dépenses, catégories et journal mensuel.
- Relances WhatsApp : messages préremplis selon le statut du dossier.
- Sauvegarde/restauration JSON.
- Hors connexion grâce au Service Worker.
- Installation Android via le navigateur.

## Lancer localement
Un service worker ne fonctionne pas correctement via `file://`. Lancez un serveur local :

```bash
python3 -m http.server 8080
```

Puis ouvrez `http://localhost:8080`.

## Déploiement
Le dossier peut être publié sur n'importe quel hébergement statique HTTPS (GitHub Pages, Netlify, Vercel, serveur web, etc.).

## Données
Les données sont conservées dans `localStorage` sur l'appareil/navigateur. Utilisez régulièrement l'export JSON. Cette version est volontairement locale : elle ne synchronise pas automatiquement plusieurs appareils.
