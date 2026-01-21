---
layout: exercices
routeAlias: 'module6-exercices'
---

# Exercices Pratiques
## Module 6 - Tests avec Vitest

---

# Exercice 1 - Configuration Vitest

### Objectif
Installer et configurer Vitest dans le projet

### Tâches

1. Installer Vitest et @vue/test-utils
2. Configurer vite.config.js
3. Ajouter les scripts npm
4. Créer le premier test simple
5. Lancer les tests en watch mode

---

# Exercice 2 - Tester un composable

### Objectif
Tester useCounter et useFetch

### Tests à écrire pour useCounter

- Initialisation avec valeur par défaut
- Initialisation avec valeur custom
- increment()
- decrement()
- reset()
- Valeurs min/max

### Tests à écrire pour useFetch

- État initial (loading, data, error)
- Fetch réussi
- Fetch avec erreur
- Retry

---

# Exercice 3 - Tester des composants

### Counter.vue

- Rendu initial
- Affichage de la valeur
- Increment au clic
- Decrement au clic
- Props initialValue

### UserCard.vue

- Affichage du nom et email
- Événement delete au clic
- Événement edit au clic
- Props validation

### TodoList.vue

- Affichage de la liste
- Ajout d'une tâche
- Toggle d'une tâche
- Suppression d'une tâche
- Filtre actif/terminé

---

# Exercice 4 - Tester avec Pinia

### Store Products

- État initial
- fetchProducts()
- addProduct()
- updateProduct()
- deleteProduct()
- Getters (productCount, totalValue)

### Store Cart

- addToCart()
- removeFromCart()
- updateQuantity()
- clearCart()
- totalPrice
- itemCount

---

# Exercice 5 - Tester avec Vue Router

### Navigation Component

- Liens de navigation
- Navigation programmatique
- Route active (classe CSS)
- RouterLink

### Guards

- beforeEach (auth)
- beforeEnter (permissions)
- onBeforeRouteLeave

---

# Exercice 6 - Mocks et API

### Objectif
Mocker les appels API

### Tests

- Fetch users (succès)
- Fetch users (erreur)
- Create user
- Update user
- Delete user
- Loading states

---

# Exercice 7 - Coverage

### Objectif
Atteindre un bon coverage

### Tâches

1. Générer le rapport de coverage
2. Identifier les zones non testées
3. Ajouter des tests manquants
4. Viser > 80% de coverage
5. Configurer les seuils minimums

---

# Projet Fil Rouge - Partie 6

### Suite de tests complète

**Tests à implémenter** :

1. **Composables**
   - useCounter
   - useProduct
   - useFetch
   - useAuth

2. **Composants**
   - ProductCard
   - ProductList
   - Cart
   - UserCard
   - Modal
   - Tabs

3. **Stores Pinia**
   - productsStore
   - cartStore
   - authStore

4. **Router**
   - Navigation
   - Guards
   - Routes dynamiques

**Objectifs** :
- ✅ > 80% coverage
- ✅ Tests rapides (< 2s)
- ✅ Tests isolés
- ✅ Mocks appropriés
- ✅ AAA pattern
- ✅ Noms descriptifs
