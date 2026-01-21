---
layout: exercices
routeAlias: 'module4-exercices'
---

# Exercices Pratiques
## Module 4 - State Management avec Pinia

---

# Exercice 1 - Store Products

### Objectif
Créer un store pour gérer une liste de produits

### Fonctionnalités

- State: products[], loading, error
- Actions: fetchProducts(), addProduct(), deleteProduct(), updateProduct()
- Getters: productCount, totalValue, getProductById
- Intégration API (JSONPlaceholder ou mockAPI)

---

# Exercice 2 - Store Cart (Panier)

### Objectif
Créer un store pour gérer un panier d'achat

### Fonctionnalités

- State: items[] (avec quantity)
- Actions: addToCart(), removeFromCart(), updateQuantity(), clearCart()
- Getters: itemCount, totalItems, totalPrice, cartSummary
- Vérifier le stock avant d'ajouter

---

# Exercice 3 - Store Auth

### Objectif
Créer un store d'authentification

### Fonctionnalités

- State: user, token, isLoggedIn, permissions
- Actions: login(), logout(), refreshToken(), checkAuth()
- Getters: userFullName, hasPermission(perm)
- Persistence du token dans localStorage

---

# Exercice 4 - Interaction entre stores

### Objectif
Faire communiquer les stores entre eux

### Scénarios

- Cart doit vérifier si user est logged in (Auth store)
- Cart doit vérifier le stock (Products store)
- Products affiche différemment selon le role (Auth store)
- Actions admin disponibles selon permissions

---

# Exercice 5 - Plugin de persistence

### Objectif
Créer un plugin Pinia pour la persistence

### Fonctionnalités

- Auto-save dans localStorage
- Auto-load au démarrage
- Configuration par store (quels stores persister)
- Expiration optionnelle

---

# Projet Fil Rouge - Partie 4

### Intégrer Pinia dans l'application de produits

**Objectifs**:

1. Migrer le state local vers Pinia
2. Créer les stores: products, cart, auth
3. Implémenter la persistence du panier
4. Ajouter l'authentification simulée
5. Gérer les permissions (admin/user)
6. Intégrer les DevTools Vue

**Checklist**:
- ✅ Installation et configuration de Pinia
- ✅ Store products avec CRUD
- ✅ Store cart avec calculs
- ✅ Store auth avec permissions
- ✅ Persistence localStorage
- ✅ Communication entre stores
- ✅ TypeScript (bonus)
