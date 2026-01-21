---
layout: exercices
routeAlias: 'module1-exercices'
---

# Exercices Pratiques
## Module 1 - Introduction à Vue.js et bases fondamentales

---

# Exercice 1 - Setup de l'environnement

### Objectif
Mettre en place votre environnement de développement Vue.js

### Instructions

1. Vérifier l'installation de Node.js (v20+)
2. Créer un nouveau projet avec Vite
3. Explorer la structure du projet
4. Lancer le serveur de développement
5. Modifier le composant App.vue

### Commandes

```bash
node --version
npm create vite@latest mon-projet-vue -- --template vue
cd mon-projet-vue
npm install
npm run dev
```

---

# Exercice 2 - Compteur simple

### Objectif
Créer un composant compteur avec les fonctionnalités de base

### Fonctionnalités à implémenter

- Afficher la valeur du compteur
- Bouton pour incrémenter (+1)
- Bouton pour décrémenter (-1)
- Bouton pour réinitialiser à 0
- Afficher si le nombre est pair ou impair

### Bonus

- Ajouter un bouton +5 et -5
- Bloquer le décrement si compteur = 0
- Changer la couleur selon positif/négatif

---

# Exercice 2 - Solution de base

```vue
<script>
export default {
  data() {
    return {
      compteur: 0
    }
  },
  computed: {
    estPair() {
      return this.compteur % 2 === 0;
    }
  },
  methods: {
    increment() {
      this.compteur++;
    },
    decrement() {
      this.compteur--;
    },
    reset() {
      this.compteur = 0;
    }
  }
}
</script>

<template>
  <div>
    <h1>Compteur: {{ compteur }}</h1>
    <p>{{ estPair ? 'Pair' : 'Impair' }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Exercice 3 - Todo List

### Objectif
Créer une application de gestion de tâches

### Fonctionnalités

- Ajouter une tâche
- Afficher la liste des tâches
- Marquer une tâche comme terminée
- Supprimer une tâche
- Afficher le nombre de tâches restantes

### Bonus

- Filtrer (toutes/actives/terminées)
- Modifier une tâche
- Sauvegarder dans le localStorage
- Ajouter une priorité (haute/moyenne/basse)

---

# Exercice 3 - Structure de données

```vue
<script>
export default {
  data() {
    return {
      nouveauTodo: '',
      todos: [
        { id: 1, text: 'Apprendre Vue.js', done: false },
        { id: 2, text: 'Créer un projet', done: false }
      ]
    }
  },
  methods: {
    ajouterTodo() {
      if (this.nouveauTodo.trim()) {
        this.todos.push({
          id: Date.now(),
          text: this.nouveauTodo,
          done: false
        });
        this.nouveauTodo = '';
      }
    },
    supprimerTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
    }
  }
}
</script>
```

---

# Exercice 3 - Template

```vue
<template>
  <div>
    <h1>Ma Todo List</h1>
    
    <form @submit.prevent="ajouterTodo">
      <input 
        v-model="nouveauTodo" 
        placeholder="Nouvelle tâche..."
      />
      <button type="submit">Ajouter</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input 
          type="checkbox" 
          v-model="todo.done"
        />
        <span :class="{ done: todo.done }">
          {{ todo.text }}
        </span>
        <button @click="supprimerTodo(todo.id)">X</button>
      </li>
    </ul>
  </div>
</template>
```

---

# Exercice 4 - Composant UserCard

### Objectif
Créer un composant réutilisable de carte utilisateur

### Props à recevoir

- `nom` (String, required)
- `email` (String, required)
- `age` (Number)
- `avatar` (String)
- `role` (String)

### Événements à émettre

- `click` : quand on clique sur la carte
- `edit` : quand on clique sur éditer
- `delete` : quand on clique sur supprimer

---

# Exercice 4 - Composant UserCard.vue

```vue
<script>
export default {
  props: {
    nom: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    age: Number,
    avatar: String,
    role: {
      type: String,
      default: 'user'
    }
  },
  emits: ['click', 'edit', 'delete']
}
</script>
```

---

# Exercice 4 - Template UserCard

```vue
<template>
  <div class="user-card" @click="emit('click')">
    <img 
      :src="avatar || '/default-avatar.png'" 
      :alt="nom"
    />
    <h3>{{ nom }}</h3>
    <p>{{ email }}</p>
    <p v-if="age">Âge: {{ age }} ans</p>
    <span class="role">{{ role }}</span>
    
    <div class="actions">
      <button @click.stop="emit('edit')">Éditer</button>
      <button @click.stop="emit('delete')">Supprimer</button>
    </div>
  </div>
</template>
```

---

# Exercice 5 - Liste d'utilisateurs

### Objectif
Utiliser le composant UserCard pour afficher une liste

### Fonctionnalités

- Afficher une liste de 5-10 utilisateurs
- Gérer le clic sur une carte (afficher détails)
- Gérer l'édition (modal ou form)
- Gérer la suppression (confirmation)
- Ajouter un nouveau utilisateur

### Bonus

- Recherche par nom
- Filtre par rôle
- Tri par nom/âge
- Pagination

---

# Exercice 5 - Utilisation du composant

```vue
<script>
import UserCard from './components/UserCard.vue';

export default {
  components: {
    UserCard
  },
  data() {
    return {
      users: [
        { 
          id: 1, 
          nom: 'Alice Martin', 
          email: 'alice@example.com',
          age: 28,
          role: 'admin'
        },
        { 
          id: 2, 
          nom: 'Bob Dupont', 
          email: 'bob@example.com',
          age: 35,
          role: 'user'
        }
      ]
    }
  },
  methods: {
    handleEdit(user) {
      console.log('Edit:', user);
    },
    handleDelete(userId) {
      this.users = this.users.filter(u => u.id !== userId);
    }
  }
}
</script>
```

---

# Exercice 5 - Template

```vue
<template>
  <div class="users-list">
    <h1>Liste des utilisateurs</h1>
    
    <div class="grid">
      <UserCard
        v-for="user in users"
        :key="user.id"
        v-bind="user"
        @edit="handleEdit(user)"
        @delete="handleDelete(user.id)"
      />
    </div>
  </div>
</template>
```

---

# Exercice 6 - Fetch API users

### Objectif
Récupérer et afficher des utilisateurs depuis une API

### Instructions

1. Utiliser l'API JSONPlaceholder : `https://jsonplaceholder.typicode.com/users`
2. Afficher un loader pendant le chargement
3. Afficher les utilisateurs dans des cartes
4. Gérer les erreurs
5. Ajouter un bouton pour recharger

### API à utiliser

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/users';
```

---

# Exercice 6 - Solution fetch

```vue
<script>
export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null
    }
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        
        this.users = await response.json();
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>
```

---

# Exercice 6 - Template avec états

```vue
<template>
  <div>
    <h1>Utilisateurs</h1>
    
    <div v-if="loading" class="loader">
      Chargement...
    </div>
    
    <div v-else-if="error" class="error">
      Erreur: {{ error }}
      <button @click="fetchUsers">Réessayer</button>
    </div>
    
    <div v-else class="users-grid">
      <UserCard 
        v-for="user in users"
        :key="user.id"
        :nom="user.name"
        :email="user.email"
      />
    </div>
  </div>
</template>
```

---

# Exercice 7 - Composable useCompteur

### Objectif
Créer un composable réutilisable pour gérer un compteur

### Fonctionnalités du composable

- État du compteur
- Fonction increment
- Fonction decrement
- Fonction reset
- Computed pour pair/impair
- Option pour min/max

---

# Exercice 7 - Solution useCompteur.js

```javascript
import { ref, computed } from 'vue';

export function useCompteur(initialValue = 0, options = {}) {
  const { min = -Infinity, max = Infinity } = options;
  
  const count = ref(initialValue);
  
  const increment = (step = 1) => {
    count.value = Math.min(count.value + step, max);
  };
  
  const decrement = (step = 1) => {
    count.value = Math.max(count.value - step, min);
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  const estPair = computed(() => count.value % 2 === 0);
  
  return {
    count,
    increment,
    decrement,
    reset,
    estPair
  };
}
```

---

# Exercice 7 - Utilisation avec mixin

```vue
<script>
// Avec Options API, on utilise les mixins plutôt que les composables
const compteurMixin = {
  data() {
    return {
      count: 0,
      min: 0,
      max: 100
    }
  },
  computed: {
    estPair() {
      return this.count % 2 === 0;
    }
  },
  methods: {
    increment(step = 1) {
      this.count = Math.min(this.count + step, this.max);
    },
    decrement(step = 1) {
      this.count = Math.max(this.count - step, this.min);
    },
    reset() {
      this.count = 0;
    }
  }
};

export default {
  mixins: [compteurMixin]
}
</script>

<template>
  <div>
    <h1>{{ count }}</h1>
    <p>{{ estPair ? 'Pair' : 'Impair' }}</p>
    <button @click="increment()">+1</button>
    <button @click="increment(5)">+5</button>
    <button @click="decrement()">-1</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Exercice 8 - Composable useFetch

### Objectif
Créer un composable pour gérer les appels API

### Fonctionnalités

- État data, loading, error
- Fonction fetch automatique
- Fonction refresh
- Support des méthodes GET/POST/PUT/DELETE
- Gestion du cache (bonus)

---

# Exercice 8 - Solution useFetch.js

```javascript
import { ref } from 'vue';

export function useFetch(url, options = {}) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async (method = 'GET', body = null) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: body ? JSON.stringify(body) : null
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      data.value = await response.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, error, execute };
}
```

---

# Projet Fil Rouge - Partie 1

### Application de gestion de produits

Créer une application complète avec les fonctionnalités suivantes :

**Phase 1 - Liste de produits**
- Afficher une liste de produits (nom, prix, description, image)
- Créer un composant ProductCard réutilisable
- Utiliser v-for pour la liste

**Phase 2 - CRUD basique**
- Ajouter un produit
- Supprimer un produit
- Éditer un produit

---

# Projet Fil Rouge - Structure

```javascript
// Structure de données
const produits = ref([
  {
    id: 1,
    nom: 'Ordinateur portable',
    prix: 899.99,
    description: 'PC performant',
    image: '/laptop.jpg',
    stock: 15,
    categorie: 'Informatique'
  },
  {
    id: 2,
    nom: 'Souris gaming',
    prix: 49.99,
    description: 'Souris RGB',
    image: '/mouse.jpg',
    stock: 42,
    categorie: 'Accessoires'
  }
]);
```

---

# Projet Fil Rouge - Fonctionnalités bonus

**Phase 3 - Recherche et filtres**
- Barre de recherche par nom
- Filtre par catégorie
- Filtre par prix (min-max)
- Tri (prix, nom, stock)

**Phase 4 - Computed et watchers**
- Total du panier
- Nombre d'articles
- Prix moyen
- Produits en rupture de stock

**Phase 5 - Persistance**
- Sauvegarder dans localStorage
- Charger au démarrage

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vue.js 3 Documentation](https://vuejs.org/)
- 🔧 [Vite Guide](https://vitejs.dev/)
- 📦 [npm Documentation](https://docs.npmjs.com/)

### Tutoriels

- 🎥 Vue Mastery
- 🎓 Vue School
- 📺 Chaînes YouTube Vue.js

### Outils

- 🛠️ [Vue DevTools](https://devtools.vuejs.org/)
- 💻 [VS Code + Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- 🎨 [Tailwind CSS](https://tailwindcss.com/)

---

# Checklist de validation

Avant de passer au Module 2, assurez-vous de maîtriser :

- ✅ Installation et configuration de l'environnement
- ✅ Syntaxe JavaScript ES6+ (arrow functions, destructuring, async/await)
- ✅ Création d'un projet Vue avec Vite
- ✅ Utilisation des directives (v-bind, v-if, v-for, v-model)
- ✅ Création de composants
- ✅ Communication parent-enfant (props, emit)
- ✅ Propriétés calculées (computed)
- ✅ Lifecycle hooks (onMounted, onUnmounted)
- ✅ Composables pour réutiliser la logique
- ✅ Appels API avec fetch
