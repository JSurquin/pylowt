---
layout: new-section
routeAlias: 'projet-final'
---

<a name="projet-final" id="projet-final"></a>

# Projet Final
## Application de gestion de produits complète

---


# Présentation du projet

### Application e-commerce simplifiée

Une application web moderne de gestion de produits avec :

- 🛍️ Catalogue de produits
- 🛒 Panier d'achat
- 👤 Authentification utilisateur
- 🔐 Espace administration
- 📊 Tableau de bord
- 🔍 Recherche et filtres
- 📱 Design responsive

---

# Stack technique

### Technologies utilisées

- **Framework** : Vue.js 3
- **Build Tool** : Vite
- **Routing** : Vue Router 4
- **State Management** : Pinia
- **Tests** : Vitest + @vue/test-utils
- **Style** : CSS / SCSS (ou Tailwind CSS)
- **TypeScript** : Optionnel mais recommandé
- **API** : JSONPlaceholder ou MockAPI

---

# Architecture du projet

```
mon-app/
├── src/
│   ├── assets/          # Images, fonts, styles globaux
│   ├── components/      # Composants réutilisables
│   │   ├── common/      # Badge, Button, Card, Modal...
│   │   ├── product/     # ProductCard, ProductList...
│   │   └── layout/      # Header, Footer, Sidebar...
│   ├── views/           # Pages/Vues
│   │   ├── Home.vue
│   │   ├── Products.vue
│   │   ├── ProductDetail.vue
│   │   ├── Cart.vue
│   │   └── Dashboard.vue
│   ├── stores/          # Stores Pinia
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── cart.js
│   ├── router/          # Configuration Router
│   │   └── index.js
│   ├── composables/     # Logique réutilisable
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useCart.js
│   ├── directives/      # Directives personnalisées
│   ├── utils/           # Fonctions utilitaires
│   └── types/           # Types TypeScript (si utilisé)
└── tests/               # Tests
```

---

# Fonctionnalités - Module Produits

### Catalogue

- Liste de tous les produits
- Grille responsive
- Images, nom, prix, description courte
- Bouton "Voir détails"
- Bouton "Ajouter au panier"

### Détail produit

- Image principale
- Informations complètes
- Stock disponible
- Sélecteur de quantité
- Ajouter au panier
- Produits similaires

---

# Fonctionnalités - Recherche et Filtres

### Barre de recherche

- Recherche par nom
- Recherche en temps réel
- Mise en évidence des résultats

### Filtres

- Par catégorie
- Par fourchette de prix
- Par disponibilité (en stock / rupture)
- Tri (prix croissant/décroissant, nom A-Z)

---

# Fonctionnalités - Panier

### Gestion du panier

- Liste des articles
- Quantité modifiable
- Suppression d'articles
- Calcul du total
- Frais de livraison
- Code promo (bonus)
- Validation de commande

### Persistance

- Sauvegarde dans localStorage
- Récupération au chargement
- Synchronisation entre onglets

---

# Fonctionnalités - Authentification

### Connexion / Inscription

- Formulaire de connexion
- Formulaire d'inscription
- Validation des champs
- Gestion des erreurs
- JWT token (simulé)

### Profil utilisateur

- Informations personnelles
- Historique des commandes
- Adresses de livraison
- Modification du profil

---

# Fonctionnalités - Dashboard Admin

### Gestion des produits

- Liste des produits (tableau)
- CRUD complet (Create, Read, Update, Delete)
- Upload d'images (simulé)
- Gestion du stock

### Statistiques

- Nombre total de produits
- Valeur du stock
- Ventes du mois
- Graphiques (bonus)

---

# Routes de l'application

```javascript
const routes = [
  { path: '/', component: Home },
  { path: '/products', component: Products },
  { path: '/product/:id', component: ProductDetail },
  { path: '/cart', component: Cart },
  { path: '/checkout', component: Checkout },
  
  // Auth
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  
  // Protégées
  { 
    path: '/profile', 
    component: Profile,
    meta: { requiresAuth: true }
  },
  
  // Admin (protégé + role admin)
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', component: DashboardHome },
      { path: 'products', component: DashboardProducts },
      { path: 'orders', component: DashboardOrders },
      { path: 'users', component: DashboardUsers }
    ]
  },
  
  // 404
  { path: '/:pathMatch(.*)*', component: NotFound }
];
```

---

# Store Products

```javascript
// stores/products.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const filters = reactive({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 1000,
    inStock: false
  });
  
  // Getters
  const filteredProducts = computed(() => {
    // Logique de filtrage
  });
  
  const productCount = computed(() => products.value.length);
  const totalValue = computed(() => {
    return products.value.reduce((sum, p) => sum + p.prix * p.stock, 0);
  });
  
  // Actions
  const fetchProducts = async () => { /* ... */ };
  const addProduct = async (product) => { /* ... */ };
  const updateProduct = async (id, data) => { /* ... */ };
  const deleteProduct = async (id) => { /* ... */ };
  
  return { 
    products, loading, error, filters,
    filteredProducts, productCount, totalValue,
    fetchProducts, addProduct, updateProduct, deleteProduct
  };
});
```

---

# Store Cart - State & Getters

```javascript
// stores/cart.js
export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref([]);
  
  // Getters
  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0);
  });
  
  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => {
      return sum + (item.prix * item.quantity);
    }, 0);
  });
```

---

# Store Cart - Actions

```javascript
  // Actions
  const addToCart = (product, quantity = 1) => {
    const existing = items.value.find(i => i.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ ...product, quantity });
    }
  };
  
  const removeFromCart = (productId) => {
    const index = items.value.findIndex(i => i.id === productId);
    if (index > -1) {
      items.value.splice(index, 1);
    }
  };
  
  const updateQuantity = (productId, quantity) => {
    const item = items.value.find(i => i.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  };
  
  const clearCart = () => {
    items.value = [];
  };
  
  return { 
    items, totalItems, totalPrice,
    addToCart, removeFromCart, updateQuantity, clearCart
  };
});
```

---

# Store Auth - State & Getters

```javascript
// stores/auth.js
export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null);
  const token = ref(localStorage.getItem('token') || '');
  
  // Getters
  const isLoggedIn = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');
```

---

# Store Auth - Actions

```javascript
  // Actions
  const login = async (email, password) => {
    try {
      // Simuler appel API
      const response = await fakeLogin(email, password);
      user.value = response.user;
      token.value = response.token;
      localStorage.setItem('token', response.token);
      return true;
    } catch (error) {
      throw new Error('Échec de connexion');
    }
  };
  
  const logout = () => {
    user.value = null;
    token.value = '';
    localStorage.removeItem('token');
  };
  
  const checkAuth = async () => {
    if (token.value) {
      // Vérifier la validité du token
      try {
        const response = await fetchUserProfile();
        user.value = response;
      } catch {
        logout();
      }
    }
  };
  
  return { user, token, isLoggedIn, isAdmin, login, logout, checkAuth };
});
```

---

# Guards de navigation

```javascript
// router/index.js
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Vérifier l'authentification
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login');
    return;
  }
  
  // Vérifier le rôle admin
  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    next('/');
    return;
  }
  
  // Rediriger si déjà connecté
  if ((to.path === '/login' || to.path === '/register') && authStore.isLoggedIn) {
    next('/');
    return;
  }
  
  next();
});
```

---

# Composants clés

### ProductCard

```vue
<script>
import { useCartStore } from '@/stores/cart';
import Card from '@/components/Card.vue';
import Button from '@/components/Button.vue';

export default {
  components: {
    Card,
    Button
  },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart'],
  computed: {
    cartStore() {
      return useCartStore();
    }
  },
  methods: {
    addToCart() {
      this.cartStore.addToCart(this.product);
      this.$emit('add-to-cart', this.product);
    }
  }
}
</script>

<template>
  <Card>
    <template #header>
      <img :src="product.image" :alt="product.nom" />
    </template>
    
    <h3>{{ product.nom }}</h3>
    <p>{{ product.prix }}€</p>
    
    <template #footer>
      <Button @click="addToCart">Ajouter au panier</Button>
      <RouterLink :to="`/product/${product.id}`">
        Détails
      </RouterLink>
    </template>
  </Card>
</template>
```

---

# Tests

### Tests unitaires

```javascript
// stores/__tests__/cart.test.js
describe('Cart Store', () => {
  it('should add product to cart', () => {
    const store = useCartStore();
    const product = { id: 1, nom: 'Laptop', prix: 899 };
    
    store.addToCart(product);
    
    expect(store.items).toHaveLength(1);
    expect(store.totalPrice).toBe(899);
  });
  
  it('should increment quantity if product exists', () => {
    const store = useCartStore();
    const product = { id: 1, nom: 'Laptop', prix: 899 };
    
    store.addToCart(product);
    store.addToCart(product);
    
    expect(store.items).toHaveLength(1);
    expect(store.items[0].quantity).toBe(2);
  });
});
```

---

# Tests de composants

```javascript
// components/__tests__/ProductCard.test.js
describe('ProductCard', () => {
  it('should display product info', () => {
    const product = {
      id: 1,
      nom: 'Laptop',
      prix: 899,
      image: '/laptop.jpg'
    };
    
    const wrapper = mount(ProductCard, {
      props: { product }
    });
    
    expect(wrapper.text()).toContain('Laptop');
    expect(wrapper.text()).toContain('899€');
  });
  
  it('should emit add-to-cart event', async () => {
    const wrapper = mount(ProductCard, {
      props: { product: { id: 1, nom: 'Laptop', prix: 899 } }
    });
    
    await wrapper.find('button').trigger('click');
    
    expect(wrapper.emitted('add-to-cart')).toBeTruthy();
  });
});
```

---

# Fonctionnalités bonus

### Niveau Intermédiaire

- 🎨 Dark mode
- 🌍 i18n (internationalisation)
- 🔔 Notifications toast
- ⭐ Système de favoris
- 💬 Avis et notes produits
- 📧 Partage par email
- 🔖 Liste de souhaits

### Niveau Avancé

- 📊 Graphiques et statistiques (Chart.js)
- 🔄 Pagination et infinite scroll
- 🎯 Drag & drop pour réorganiser
- 📱 PWA (Progressive Web App)
- 🌐 SSR avec Nuxt.js
- 🔐 OAuth (Google, GitHub)
- 💳 Intégration paiement (Stripe)

---

# Déploiement

### Plateformes recommandées

**Vercel** (Recommandé)
```bash
npm install -g vercel
vercel
```

---

# Déploiement - Netlify

**Netlify**
```bash
npm run build
# Déployer le dossier dist/
```

---

# Déploiement - GitHub Pages

**GitHub Pages**
```javascript
// vite.config.js
export default {
  base: '/mon-repo/',
  build: {
    outDir: 'docs'
  }
};
```

---

# Checklist du projet

### Fonctionnalités

- ✅ Liste de produits avec filtres
- ✅ Détail produit
- ✅ Panier d'achat fonctionnel
- ✅ Authentification simulée
- ✅ Dashboard admin (CRUD produits)
- ✅ Recherche en temps réel
- ✅ Persistence localStorage
- ✅ Design responsive

### Technique

- ✅ Vue Router configuré avec guards
- ✅ Pinia avec 3+ stores
- ✅ Composables réutilisables
- ✅ Directives personnalisées (au moins 2)
- ✅ Tests Vitest (> 70% coverage)
- ✅ TypeScript (optionnel)
- ✅ Code propre et commenté
- ✅ README avec instructions

---

# Critères d'évaluation

### Code (40%)

- Architecture et organisation
- Qualité du code
- Bonnes pratiques Vue.js
- Gestion d'erreurs

### Fonctionnalités (30%)

- Complétude des fonctionnalités
- Expérience utilisateur
- Gestion de l'état
- Navigation fluide

### Tests (15%)

- Coverage
- Qualité des tests
- Tests pertinents

### Design (15%)

- UI/UX
- Responsive
- Cohérence visuelle
- Accessibilité

---

# Ressources et support

### Documentation

- [Vue.js 3 Docs](https://vuejs.org/)
- [Pinia Docs](https://pinia.vuejs.org/)
- [Vue Router Docs](https://router.vuejs.org/)
- [Vitest Docs](https://vitest.dev/)

### Tutoriels

- Vue Mastery
- Vue School
- Frontend Masters

### API Mock

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
- [FakeStore API](https://fakestoreapi.com/)
- [MockAPI](https://mockapi.io/)

---

# Livrables attendus

### Code source

- 📁 Repository Git (GitHub/GitLab)
- 📝 README.md complet
- 🔧 .env.example
- 📦 package.json avec scripts

### Documentation

- 📖 Guide d'installation
- 🚀 Guide de déploiement
- 🏗️ Architecture du projet
- 📸 Screenshots

### Démonstration

- 🌐 Application déployée (URL)
- 🎥 Vidéo de démonstration (optionnel)
- 📊 Présentation du projet

---

# Timeline suggérée

### Semaine 1 : Setup & Structure

- Configuration du projet
- Architecture des dossiers
- Router et stores de base
- Composants principaux

### Semaine 2 : Fonctionnalités

- Module produits complet
- Panier d'achat
- Authentification
- Dashboard admin

### Semaine 3 : Finition & Tests

- Tests unitaires et composants
- Optimisations
- Design responsive
- Documentation

### Semaine 4 : Déploiement

- Corrections finales
- Déploiement
- Préparation présentation

---

# Conseils de réussite

### ✅ À faire

- Commencer simple, itérer ensuite
- Commits réguliers et descriptifs
- Tester au fur et à mesure
- Demander de l'aide si bloqué
- Utiliser les DevTools Vue
- Lire la documentation officielle

### ❌ À éviter

- Vouloir tout faire d'un coup
- Négliger les tests
- Copier/coller sans comprendre
- Ignorer les warnings
- Oublier la gestion d'erreurs
- Négliger le responsive

---

# Dernier conseil avant de vous lancer 💚

### 🎓 Vous avez TOUT ce qu'il faut !

Sérieusement, en 3 jours vous avez appris ce que certains mettent des mois à comprendre !

### 🧠 Le syndrome de l'imposteur

Si vous pensez : *"Je ne suis pas assez bon..."*

**C'EST FAUX !** Tout le monde ressent ça. Même les seniors.

### 💪 La vraie différence entre un junior et un senior ?

- **Junior** : "Je ne sais pas comment faire ça"
- **Senior** : "Je ne sais pas comment faire ça... **ENCORE** !"

### 🎯 Votre plan d'action

**Semaine 1-2** : Suivez le plan, créez les fonctionnalités de base
**Semaine 3** : Ajoutez du style, des animations, rendez-le beau !
**Semaine 4** : Tests, documentation, déploiement

### 🚀 Après cette formation

**Vous êtes capables de** :
- Postuler pour des postes **Vue.js Junior**
- Créer vos propres projets perso
- Contribuer à l'open source
- Continuer à apprendre (Nuxt.js, TypeScript avancé...)

### 🌟 Mon dernier message pour vous

> "Vous ne serez JAMAIS 100% prêts. Lancez-vous quand même ! 
> L'échec n'est pas de tomber, c'est de ne pas se relever.
> Chaque ligne de code vous rend meilleur.
> VOUS. POUVEZ. LE. FAIRE." ❤️

### 🙏 Merci et... **BON CODE !**

*- Votre formateur qui croit en vous*

---

# Questions ? On est là pour vous !

Contactez votre formateur ou consultez les ressources en ligne.

### 🎊 Et maintenant... **À VOS CLAVIERS !** 🚀

**Bonne chance, vous allez déchirer !** 🔥
