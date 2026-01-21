---
layout: exercices
routeAlias: 'module5-exercices'
---

# Exercices Pratiques
## Module 5 - Vue Router

---

# Exercice 1 - Configuration de base

### Objectif
Installer et configurer Vue Router

### Tâches

1. Installer Vue Router 4
2. Créer le dossier `router/`
3. Configurer les routes de base (Home, About, Contact)
4. Intégrer dans `main.js`
5. Ajouter RouterView et RouterLink dans App.vue

---

# Exercice 2 - Routes dynamiques

### Objectif
Créer des pages de détails avec routes dynamiques

### Tâches

- Route `/product/:id` pour les produits
- Route `/user/:username` pour les profils
- Afficher les paramètres dans le composant
- Navigation avec boutons (router.push)

---

# Exercice 3 - Lazy Loading

### Objectif
Optimiser le chargement avec lazy loading

### Tâches

- Convertir toutes les routes en lazy loading
- Vérifier dans Network tab du navigateur
- Ajouter des groupes de chunks (webpackChunkName)

---

# Exercice 4 - Guards d'authentification

### Objectif
Protéger les routes avec des guards

### Tâches

- Guard global `beforeEach`
- Protéger `/admin` et `/profile`
- Rediriger vers `/login` si non authentifié
- Utiliser le store Auth de Pinia
- Guard dans le composant avec `onBeforeRouteLeave`

---

# Exercice 5 - Routes imbriquées

### Objectif
Créer un dashboard avec routes imbriquées

### Routes

- `/dashboard` (layout)
  - `/dashboard` (overview)
  - `/dashboard/stats` (statistiques)
  - `/dashboard/settings` (paramètres)
  - `/dashboard/users` (utilisateurs)

---

# Exercice 6 - Page 404

### Objectif
Gérer les routes inexistantes

### Tâches

- Créer un composant NotFound.vue
- Route catch-all pour 404
- Design personnalisé
- Bouton retour à l'accueil

---

# Projet Fil Rouge - Partie 5

### Ajouter le routing à l'application

**Structure des routes** :

```
/ - Accueil (liste produits)
/products - Liste produits
/product/:id - Détail produit
/cart - Panier
/auth/login - Connexion
/auth/register - Inscription
/dashboard - Dashboard admin (protégé)
  /dashboard/products - Gestion produits
  /dashboard/users - Gestion utilisateurs
  /dashboard/orders - Commandes
/profile - Profil utilisateur (protégé)
/404 - Page not found
```

**Checklist** :
- ✅ Configuration Vue Router
- ✅ Routes dynamiques
- ✅ Lazy loading
- ✅ Guards d'authentification
- ✅ Routes imbriquées pour le dashboard
- ✅ Page 404
- ✅ Navigation programmatique
- ✅ Meta fields pour les titres de page
