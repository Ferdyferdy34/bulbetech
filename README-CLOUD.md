# Bulbe Tech — version Cloud

Cette version ajoute une fondation cloud avec Supabase, connexion administrateur, synchronisation automatique, reçus imprimables en PDF et statistiques avancées.

## 1. Créer la base cloud
1. Créer un projet Supabase.
2. Ouvrir SQL Editor et exécuter `sql/supabase.sql`.
3. Dans Authentication > Providers, activer Email/Password.
4. Dans `config.js`, renseigner `supabaseUrl`, `supabaseAnonKey` et passer `cloudEnabled` à `true`.

## 2. Fonctionnement
- Sans configuration Supabase : fonctionnement local hors connexion.
- Avec Supabase : connexion administrateur + synchronisation du portefeuille de données par compte.
- Les politiques RLS empêchent un compte de lire les données d’un autre compte.
- Une modification distante déclenche un rafraîchissement local.

## 3. PDF
Dans une réparation, le bouton `PDF` ouvre une version imprimable du reçu. Sur Android/Chrome ou ordinateur, choisir « Enregistrer au format PDF ».

## 4. Mise en production
Servir le dossier en HTTPS. Ne jamais mettre la clé `service_role` Supabase dans le navigateur : seule la clé `anon` doit être utilisée côté PWA.
