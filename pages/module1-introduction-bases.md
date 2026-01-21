---
layout: new-section
routeAlias: 'module1-introduction'
---

# Module 1
## Introduction à Vue.js et bases fondamentales

---

# 1.1 Rappels JavaScript ES6+

<br>

## Arrow Functions

Les fonctions fléchées offrent une syntaxe plus concise et un binding lexical de `this`

```javascript
// Fonction traditionnelle
function addition(a, b) {
  return a + b;
}

// Arrow function
const addition = (a, b) => a + b;

// Avec bloc
const calculer = (a, b) => {
  const resultat = a + b;
  return resultat;
};
```

---

# Arrow Functions - Cas d'usage

```javascript
// Dans les méthodes de tableaux
const nombres = [1, 2, 3, 4, 5];

const doubles = nombres.map(n => n * 2);
// [2, 4, 6, 8, 10]

const pairs = nombres.filter(n => n % 2 === 0);
// [2, 4]

const somme = nombres.reduce((acc, n) => acc + n, 0);
// 15

// Binding lexical de 'this'
class Composant {
  constructor() {
    this.valeur = 42;
  }
  
  methode = () => {
    console.log(this.valeur); // 42
  }
}
```

---

# Destructuring - Objets

Le destructuring permet d'extraire des valeurs des objets et tableaux

```javascript
// Destructuring d'objet
const utilisateur = {
  nom: 'Dupont',
  prenom: 'Jean',
  age: 30,
  email: 'jean@example.com'
};

const { nom, prenom } = utilisateur;
console.log(nom); // 'Dupont'

// Avec renommage
const { nom: nomFamille } = utilisateur;
console.log(nomFamille); // 'Dupont'
```

---

# Destructuring - Tableaux et cas avancés

```javascript
// Destructuring de tableau
const nombres = [1, 2, 3, 4, 5];
const [premier, deuxieme, ...reste] = nombres;
console.log(premier); // 1
console.log(reste); // [3, 4, 5]

// Dans les paramètres de fonction
const afficherUtilisateur = ({ nom, prenom }) => {
  console.log(`${prenom} ${nom}`);
};

// Valeurs par défaut
const { age = 18 } = utilisateur;
```

---

# Modules ES6

Les modules permettent d'organiser et de réutiliser le code

```javascript
// exports nommés (math.js)
export const PI = 3.14159;
export const addition = (a, b) => a + b;
export const multiplication = (a, b) => a * b;

// export par défaut (utilisateur.js)
export default class Utilisateur {
  constructor(nom) {
    this.nom = nom;
  }
}
```

---

# Imports de modules

```javascript
// Import nommé
import { PI, addition } from './math.js';
console.log(addition(2, 3)); // 5

// Import par défaut
import Utilisateur from './utilisateur.js';
const user = new Utilisateur('Jean');

// Import avec alias
import { addition as add } from './math.js';

// Import tout
import * as Math from './math.js';
console.log(Math.PI);
```

---

# Promises - Gestion asynchrone

Les Promises représentent une valeur qui peut être disponible maintenant, plus tard, ou jamais

```javascript
// Création d'une Promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, nom: 'Produit' };
      resolve(data);
      // ou reject(new Error('Erreur'));
    }, 1000);
  });
};

// Utilisation
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error))
  .finally(() => console.log('Terminé'));
```

---

# Async / Await

Syntaxe plus claire pour gérer les opérations asynchrones

```javascript
// Fonction asynchrone
const chargerUtilisateur = async (id) => {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Utilisation
const utilisateur = await chargerUtilisateur(1);
console.log(utilisateur);
```

---

# Async / Await - Opérations parallèles

```javascript
// Opérations séquentielles (lent)
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();

// Opérations parallèles (rapide)
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments()
]);

// Promise.race - première qui se termine
const resultat = await Promise.race([
  fetchFromAPI1(),
  fetchFromAPI2()
]);
```

---
layout: new-section
---

# 1.2 Architecture Vue.js

---

# Présentation de Vue.js

<br>

**Vue.js** est un framework JavaScript progressif pour construire des interfaces utilisateur

### Caractéristiques principales

- 🎯 **Progressif** : peut être adopté progressivement
- ⚡ **Performant** : Virtual DOM et réactivité optimisée
- 🔧 **Flexible** : s'adapte à tous types de projets
- 📦 **Écosystème riche** : Vue Router, Pinia, Vite...
- 💚 **Communauté active** : support et ressources

---

# Pourquoi choisir Vue.js en 2025 ?

### Avantages

- ✨ Courbe d'apprentissage douce
- 🚀 Performances excellentes
- 📝 Documentation de qualité
- 🔧 Outils de développement puissants
- 💼 Adopté par de grandes entreprises

### Cas d'usage

- Applications web modernes (SPA)
- Interfaces utilisateur interactives
- Tableaux de bord et dashboards
- Progressive Web Apps (PWA)

---

# Architecture MVVM

Vue.js suit le pattern MVVM (Model-View-ViewModel)

```
┌──────────────┐
│     VIEW     │  ← Template (HTML)
│  (Template)  │
└──────┬───────┘
       │
       ↕ Data Binding
       │
┌──────┴───────┐
│  VIEWMODEL   │  ← Composant Vue
│ (Composant)  │
└──────┬───────┘
       │
       ↕ Logique
       │
┌──────┴───────┐
│    MODEL     │  ← Données (State)
│   (State)    │
└──────────────┘
```

---

# MVVM dans Vue.js - Exemple

```vue
<script setup>
import { ref } from 'vue';

// MODEL - Données
const compteur = ref(0);
const utilisateur = ref({
  nom: 'Jean',
  email: 'jean@example.com'
});

// VIEWMODEL - Logique
const incrementer = () => {
  compteur.value++;
};
</script>

<template>
  <!-- VIEW - Interface -->
  <div>
    <h1>{{ utilisateur.nom }}</h1>
    <p>Compteur: {{ compteur }}</p>
    <button @click="incrementer">+1</button>
  </div>
</template>
```

---

# Organisation d'une application Vue

Structure typique d'un projet Vue.js moderne

```
mon-projet/
├── src/
│   ├── components/      # Composants réutilisables
│   ├── views/           # Pages/Vues
│   ├── composables/     # Logique réutilisable
│   ├── stores/          # State management (Pinia)
│   ├── router/          # Configuration des routes
│   ├── assets/          # Ressources (images, CSS)
│   ├── App.vue          # Composant racine
│   └── main.js          # Point d'entrée
├── public/              # Fichiers statiques
└── package.json         # Dépendances
```

---
layout: new-section
---

# 1.3 Outils et environnement

---

# Node.js et npm

**Node.js** : environnement d'exécution JavaScript côté serveur

**npm** (Node Package Manager) : gestionnaire de paquets

```bash
# Vérifier les versions
node --version  # v20.x ou supérieur
npm --version   # v10.x ou supérieur

# Alternative : pnpm (plus rapide)
npm install -g pnpm
pnpm --version
```

### Package managers en 2025

- **npm** : package manager par défaut
- **pnpm** : plus rapide, économise de l'espace
- **yarn** : alternative populaire

---

# Vite - Build tool moderne

**Vite** est l'outil de build recommandé pour Vue.js 3 en 2025

### Avantages de Vite

- ⚡ Démarrage instantané
- 🔥 Hot Module Replacement (HMR) ultra-rapide
- 📦 Build optimisé avec Rollup
- 🎯 Support TypeScript natif
- 🔌 Système de plugins extensible

```bash
# Créer un projet avec Vite
npm create vite@latest mon-projet -- --template vue

# Avec TypeScript
npm create vite@latest mon-projet -- --template vue-ts
```

---

# Vue CLI (legacy)

**Vue CLI** : outil historique pour créer des projets Vue

⚠️ **Note** : Vue CLI est maintenant en mode maintenance. Vite est recommandé pour les nouveaux projets.

```bash
# Installation globale (si nécessaire)
npm install -g @vue/cli

# Créer un projet
vue create mon-projet

# Interface graphique
vue ui
```

### Quand utiliser Vue CLI ?

- Projets legacy existants
- Besoins spécifiques de configuration webpack

---

# Créer un projet avec Vite

```bash
# Créer le projet
npm create vite@latest mon-app-vue -- --template vue

# Se déplacer dans le dossier
cd mon-app-vue

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

---

# Structure d'un projet Vue

```
mon-app-vue/
├── node_modules/        # Dépendances
├── public/             
│   └── favicon.ico      # Icône du site
├── src/
│   ├── assets/          # Images, CSS, fonts
│   ├── components/      # Composants Vue
│   ├── App.vue          # Composant principal
│   └── main.js          # Point d'entrée
├── index.html           # Page HTML principale
├── package.json         # Configuration npm
├── vite.config.js       # Configuration Vite
└── README.md
```

---

# Le fichier main.js

Point d'entrée de l'application

```javascript
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

// Création de l'application
const app = createApp(App);

// Montage de l'application
app.mount('#app');
```

---

# Le fichier App.vue

Composant racine de l'application

```vue
<script setup>
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

const count = ref(0);
</script>

<template>
  <div>
    <HelloWorld msg="Vue.js 3 + Vite" />
    <button @click="count++">
      Compteur: {{ count }}
    </button>
  </div>
</template>

<style scoped>
button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>
```

---

# Configuration Vite

Fichier `vite.config.js`

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
```

---
layout: new-section
---

# 1.4 Concepts fondamentaux

---

# Liaison de données (Data Binding)

Vue.js permet de lier les données du composant au template

### Types de liaison

- **Interpolation** : `{{ variable }}`
- **Attributs** : `v-bind:attr="value"` ou `:attr="value"`
- **Événements** : `v-on:event="handler"` ou `@event="handler"`
- **Bidirectionnelle** : `v-model="variable"`

---

# Interpolation (Mustache)

Affichage de données dans le template avec `{{ }}`

```vue
<script setup>
import { ref } from 'vue';

const message = ref('Bonjour Vue.js!');
const nombre = ref(42);
const utilisateur = ref({
  nom: 'Dupont',
  prenom: 'Jean'
});
</script>

<template>
  <div>
    <h1>{{ message }}</h1>
    <p>Nombre: {{ nombre }}</p>
    <p>Nom complet: {{ utilisateur.prenom }} {{ utilisateur.nom }}</p>
    <p>Calcul: {{ nombre * 2 }}</p>
    <p>Méthode: {{ message.toUpperCase() }}</p>
  </div>
</template>
```

---

# Directive v-bind

Lie un attribut HTML à une expression JavaScript

```vue
<script setup>
import { ref } from 'vue';

const imageUrl = ref('/logo.png');
const altText = ref('Logo Vue.js');
const isDisabled = ref(false);
const styles = ref({
  color: 'blue',
  fontSize: '20px'
});
</script>

<template>
  <img v-bind:src="imageUrl" v-bind:alt="altText" />
  <!-- Syntaxe courte -->
  <img :src="imageUrl" :alt="altText" />
  
  <button :disabled="isDisabled">Cliquer</button>
  <div :style="styles">Texte stylé</div>
</template>
```

---

# Directive v-on (événements)

Écoute les événements DOM

```vue
<script setup>
import { ref } from 'vue';

const compteur = ref(0);
const message = ref('');

const incrementer = () => {
  compteur.value++;
};

const afficherMessage = (event) => {
  console.log('Événement:', event);
  message.value = 'Bouton cliqué!';
};
</script>

<template>
  <button v-on:click="incrementer">+1</button>
  <!-- Syntaxe courte -->
  <button @click="compteur++">+1</button>
  <button @click="afficherMessage">Message</button>
  <p>{{ compteur }}</p>
</template>
```

---

# Modificateurs d'événements

Vue.js propose des modificateurs pour faciliter la gestion des événements

```vue
<template>
  <!-- Empêcher le comportement par défaut -->
  <form @submit.prevent="onSubmit">
    <button type="submit">Envoyer</button>
  </form>

  <!-- Stopper la propagation -->
  <div @click="handleClick">
    <button @click.stop="handleButtonClick">Cliquer</button>
  </div>

  <!-- Une seule fois -->
  <button @click.once="init">Initialiser</button>

  <!-- Combinaisons -->
  <input @keyup.enter="submit" />
  <input @keyup.ctrl.enter="send" />
</template>
```

---

# Directive v-if / v-else

Affichage conditionnel (ajout/suppression du DOM)

```vue
<script setup>
import { ref } from 'vue';

const isLoggedIn = ref(false);
const userRole = ref('admin');
const score = ref(75);
</script>

<template>
  <div v-if="isLoggedIn">
    <h1>Bienvenue!</h1>
  </div>
  <div v-else>
    <h1>Veuillez vous connecter</h1>
  </div>

  <div v-if="userRole === 'admin'">Admin</div>
  <div v-else-if="userRole === 'user'">Utilisateur</div>
  <div v-else>Invité</div>
</template>
```

---

# Directive v-show

Alternative à `v-if` qui utilise CSS (display: none)

```vue
<script setup>
import { ref } from 'vue';

const isVisible = ref(true);
</script>

<template>
  <div v-show="isVisible">
    Ce contenu est visible
  </div>
  
  <button @click="isVisible = !isVisible">
    Toggle
  </button>
</template>
```

### v-if vs v-show

- **v-if** : ajout/suppression du DOM (coût plus élevé)
- **v-show** : CSS display (meilleur pour toggle fréquent)

---

# Directive v-for

Rendu de listes

```vue
<script setup>
import { ref } from 'vue';

const fruits = ref(['Pomme', 'Banane', 'Orange']);
const utilisateurs = ref([
  { id: 1, nom: 'Alice', age: 25 },
  { id: 2, nom: 'Bob', age: 30 },
  { id: 3, nom: 'Charlie', age: 35 }
]);
</script>

<template>
  <!-- Tableau simple -->
  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">
      {{ index + 1 }}. {{ fruit }}
    </li>
  </ul>
</template>
```

---

# v-for avec objets

```vue
<template>
  <!-- Tableau d'objets -->
  <div v-for="user in utilisateurs" :key="user.id">
    <h3>{{ user.nom }}</h3>
    <p>Âge: {{ user.age }}</p>
  </div>

  <!-- Objet -->
  <div v-for="(value, key, index) in objet" :key="key">
    {{ index }}. {{ key }}: {{ value }}
  </div>

  <!-- Nombre -->
  <span v-for="n in 10" :key="n">{{ n }} </span>
</template>
```

⚠️ **Important** : toujours utiliser `:key` avec une valeur unique pour les performances

---

# v-model - Liaison bidirectionnelle

Synchronise automatiquement les données avec les inputs

```vue
<script setup>
import { ref } from 'vue';

const texte = ref('');
const isChecked = ref(false);
const selected = ref('');
const message = ref('');
</script>

<template>
  <input v-model="texte" type="text" />
  <p>Texte: {{ texte }}</p>

  <input v-model="isChecked" type="checkbox" />
  <p>Coché: {{ isChecked }}</p>

  <select v-model="selected">
    <option>A</option>
    <option>B</option>
  </select>

  <textarea v-model="message"></textarea>
</template>
```

---

# Présentation de v-model

v-model est un sucre syntaxique pour :

```vue
<!-- Ces deux lignes sont équivalentes -->
<input v-model="texte" />
<input 
  :value="texte" 
  @input="texte = $event.target.value" 
/>
```

---
layout: new-section
---

# 1.5 Composants

---

# Qu'est-ce qu'un composant ?

Les composants sont des **briques réutilisables** qui encapsulent :

- 📝 Template (structure HTML)
- 🎨 Styles (CSS)
- ⚙️ Logique (JavaScript)

### Avantages

- Réutilisabilité
- Maintenabilité
- Organisation du code
- Tests facilités

---

# Création d'un composant

Fichier `MonBouton.vue`

```vue
<script setup>
import { ref } from 'vue';

const compteur = ref(0);

const incrementer = () => {
  compteur.value++;
};
</script>

<template>
  <button @click="incrementer">
    Cliqué {{ compteur }} fois
  </button>
</template>

<style scoped>
button {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

---

# Utilisation d'un composant

```vue
<script setup>
import MonBouton from './components/MonBouton.vue';
</script>

<template>
  <div>
    <h1>Mon Application</h1>
    <MonBouton />
    <MonBouton />
    <MonBouton />
  </div>
</template>
```

Chaque instance du composant a son propre état indépendant

---

# Props - Passer des données aux enfants

Les props permettent de passer des données du parent à l'enfant

```vue
<!-- UserCard.vue -->
<script setup>
const props = defineProps({
  nom: String,
  age: Number,
  email: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="card">
    <h2>{{ nom }}</h2>
    <p>Âge: {{ age }}</p>
    <p>Email: {{ email }}</p>
  </div>
</template>
```

---

# Utilisation des props

```vue
<script setup>
import UserCard from './components/UserCard.vue';
import { ref } from 'vue';

const utilisateur = ref({
  nom: 'Alice',
  age: 28,
  email: 'alice@example.com'
});
</script>

<template>
  <UserCard 
    :nom="utilisateur.nom"
    :age="utilisateur.age"
    :email="utilisateur.email"
  />
  
  <!-- Spread operator -->
  <UserCard v-bind="utilisateur" />
</template>
```

---

# Validation des props

```vue
<script setup>
const props = defineProps({
  // Type simple
  titre: String,
  
  // Type multiple
  id: [String, Number],
  
  // Obligatoire
  nom: {
    type: String,
    required: true
  },
  
  // Valeur par défaut
  age: {
    type: Number,
    default: 18
  },
  
  // Objet/Tableau par défaut (fonction)
  options: {
    type: Object,
    default: () => ({})
  }
});
</script>
```

---

# Validation avancée des props

```vue
<script setup>
const props = defineProps({
  // Validation personnalisée
  email: {
    type: String,
    validator: (value) => {
      return value.includes('@');
    }
  },
  
  // Enum
  statut: {
    type: String,
    validator: (value) => {
      return ['actif', 'inactif', 'attente'].includes(value);
    }
  },
  
  // Type personnalisé
  utilisateur: {
    type: Object,
    validator: (value) => {
      return value.hasOwnProperty('nom') && 
             value.hasOwnProperty('email');
    }
  }
});
</script>
```

---

# Événements personnalisés (emit)

Les enfants peuvent communiquer avec les parents via des événements

```vue
<!-- CompteurEnfant.vue -->
<script setup>
const emit = defineEmits(['incrementer', 'decrementer']);

const handleIncrement = () => {
  emit('incrementer', 1);
};

const handleDecrement = () => {
  emit('decrementer', 1);
};
</script>

<template>
  <div>
    <button @click="handleIncrement">+</button>
    <button @click="handleDecrement">-</button>
  </div>
</template>
```

---

# Écouter les événements personnalisés

```vue
<script setup>
import { ref } from 'vue';
import CompteurEnfant from './components/CompteurEnfant.vue';

const compteur = ref(0);

const onIncrementer = (valeur) => {
  compteur.value += valeur;
};

const onDecrementer = (valeur) => {
  compteur.value -= valeur;
};
</script>

<template>
  <div>
    <p>Compteur: {{ compteur }}</p>
    <CompteurEnfant 
      @incrementer="onIncrementer"
      @decrementer="onDecrementer"
    />
  </div>
</template>
```

---

# Validation des événements (TypeScript)

```vue
<script setup lang="ts">
const emit = defineEmits<{
  incrementer: [value: number];
  decrementer: [value: number];
  change: [id: string, value: string];
}>();

// Ou avec validation
const emit = defineEmits({
  incrementer: (value: number) => {
    return value > 0;
  },
  change: (id: string, value: string) => {
    return id.length > 0;
  }
});
</script>
```

---

# Composants dynamiques

Changer de composant dynamiquement avec `<component>`

```vue
<script setup>
import { ref } from 'vue';
import Accueil from './components/Accueil.vue';
import Profil from './components/Profil.vue';
import Parametres from './components/Parametres.vue';

const currentComponent = ref('Accueil');
const components = { Accueil, Profil, Parametres };
</script>

<template>
  <div>
    <button @click="currentComponent = 'Accueil'">Accueil</button>
    <button @click="currentComponent = 'Profil'">Profil</button>
    <button @click="currentComponent = 'Parametres'">Paramètres</button>
    
    <component :is="components[currentComponent]" />
  </div>
</template>
```

---

# Gestion de listes de composants

```vue
<script setup>
import { ref } from 'vue';
import TodoItem from './components/TodoItem.vue';

const todos = ref([
  { id: 1, text: 'Apprendre Vue.js', done: false },
  { id: 2, text: 'Créer un projet', done: false },
  { id: 3, text: 'Déployer', done: false }
]);

const ajouterTodo = (text) => {
  todos.value.push({
    id: Date.now(),
    text,
    done: false
  });
};
</script>

<template>
  <TodoItem 
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @toggle="todo.done = !todo.done"
  />
</template>
```

---

# Affichage conditionnel de composants

```vue
<script setup>
import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import Dashboard from './components/Dashboard.vue';

const isLoggedIn = ref(false);
const userRole = ref('user');
</script>

<template>
  <div>
    <LoginForm v-if="!isLoggedIn" @login="isLoggedIn = true" />
    
    <Dashboard v-else>
      <AdminPanel v-if="userRole === 'admin'" />
      <UserPanel v-else />
    </Dashboard>
  </div>
</template>
```

---
layout: new-section
---

# 1.6 Réactivité et logique applicative

---

# Propriétés calculées (computed)

Les propriétés calculées sont des valeurs dérivées qui se mettent à jour automatiquement

```vue
<script setup>
import { ref, computed } from 'vue';

const prenom = ref('Jean');
const nom = ref('Dupont');

// Propriété calculée
const nomComplet = computed(() => {
  return `${prenom.value} ${nom.value}`;
});

const prix = ref(100);
const quantite = ref(3);

const total = computed(() => {
  return prix.value * quantite.value;
});
</script>

<template>
  <p>{{ nomComplet }}</p>
  <p>Total: {{ total }}€</p>
</template>
```

---

# Computed vs Methods

```vue
<script setup>
import { ref, computed } from 'vue';

const nombres = ref([1, 2, 3, 4, 5]);

// Computed - mise en cache
const sommeComputed = computed(() => {
  console.log('Calcul computed');
  return nombres.value.reduce((a, b) => a + b, 0);
});

// Method - recalculé à chaque fois
const sommeMethod = () => {
  console.log('Calcul method');
  return nombres.value.reduce((a, b) => a + b, 0);
};
</script>

<template>
  <p>{{ sommeComputed }}</p> <!-- Calculé 1 fois -->
  <p>{{ sommeComputed }}</p> <!-- Cache utilisé -->
  <p>{{ sommeMethod() }}</p> <!-- Calculé -->
  <p>{{ sommeMethod() }}</p> <!-- Recalculé -->
</template>
```

---

# Hooks du cycle de vie

Les hooks permettent d'exécuter du code à des moments précis

```vue
<script setup>
import { 
  onMounted, 
  onUpdated, 
  onUnmounted,
  onBeforeMount,
  onBeforeUpdate,
  onBeforeUnmount
} from 'vue';

onBeforeMount(() => {
  console.log('Avant le montage');
});

onMounted(() => {
  console.log('Composant monté');
  // Appels API, initialisation
});
</script>
```

---

# Hooks du cycle de vie (suite)

```vue
<script setup>
import { ref, onUpdated, onUnmounted } from 'vue';

const compteur = ref(0);

onUpdated(() => {
  console.log('Composant mis à jour');
  console.log('Nouvelle valeur:', compteur.value);
});

onUnmounted(() => {
  console.log('Composant démonté');
  // Nettoyage: timers, subscriptions, listeners
});
</script>
```

---

# Exemple pratique avec lifecycle

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const data = ref(null);
const loading = ref(true);
const interval = ref(null);

onMounted(async () => {
  // Charger des données
  try {
    const response = await fetch('/api/data');
    data.value = await response.json();
  } finally {
    loading.value = false;
  }
  
  // Démarrer un interval
  interval.value = setInterval(() => {
    console.log('Tick');
  }, 1000);
});

onUnmounted(() => {
  // Nettoyer l'interval
  if (interval.value) {
    clearInterval(interval.value);
  }
});
</script>
```

---

# Composables - Logique réutilisable

Les composables permettent d'extraire et de réutiliser de la logique

Fichier `useCompteur.js`

```javascript
import { ref } from 'vue';

export function useCompteur(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  return {
    count,
    increment,
    decrement,
    reset
  };
}
```

---

# Utilisation d'un composable

```vue
<script setup>
import { useCompteur } from './composables/useCompteur';

const { count, increment, decrement, reset } = useCompteur(10);
</script>

<template>
  <div>
    <p>Compteur: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Composable pour fetch

Fichier `useFetch.js`

```javascript
import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(true);

  watchEffect(async () => {
    loading.value = true;
    data.value = null;
    error.value = null;
    
    try {
      const urlValue = toValue(url);
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
```

---

# Utilisation de useFetch

```vue
<script setup>
import { ref } from 'vue';
import { useFetch } from './composables/useFetch';

const userId = ref(1);
const url = computed(() => `/api/users/${userId.value}`);
const { data, error, loading } = useFetch(url);
</script>

<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur: {{ error.message }}</div>
    <div v-else-if="data">
      <h2>{{ data.nom }}</h2>
      <p>{{ data.email }}</p>
    </div>
    
    <button @click="userId++">Utilisateur suivant</button>
  </div>
</template>
```

---

# Requêtes HTTP avec fetch

```vue
<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchUsers = async () => {
  try {
    loading.value = true;
    const response = await fetch('https://api.example.com/users');
    
    if (!response.ok) {
      throw new Error('Erreur réseau');
    }
    
    users.value = await response.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchUsers();
});
</script>
```

---

# Requêtes POST avec fetch

```vue
<script setup>
import { ref } from 'vue';

const nom = ref('');
const email = ref('');

const creerUtilisateur = async () => {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nom: nom.value,
        email: email.value
      })
    });
    
    const data = await response.json();
    console.log('Utilisateur créé:', data);
  } catch (error) {
    console.error('Erreur:', error);
  }
};
</script>
```

---

# Gestion des données avec axios

Alternative à fetch (plus de fonctionnalités)

```bash
npm install axios
```

```vue
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const users = ref([]);

onMounted(async () => {
  try {
    const { data } = await axios.get('/api/users');
    users.value = data;
  } catch (error) {
    console.error(error);
  }
});

const createUser = async (userData) => {
  await axios.post('/api/users', userData);
};
</script>
```

---

# Résumé du Module 1

✅ **JavaScript ES6+** : Arrow functions, destructuring, modules, async/await

✅ **Architecture Vue.js** : MVVM, organisation d'application

✅ **Outils** : Node.js, Vite, structure de projet

✅ **Concepts fondamentaux** : Data binding, interpolation, directives

✅ **Composants** : Création, props, événements, dynamiques

✅ **Réactivité** : Computed, lifecycle, composables, requêtes HTTP

---

# Travaux pratiques - Module 1

### Exercices à réaliser

1. 🔧 **Setup** : Installer Node.js, créer un projet Vue avec Vite
2. 🎯 **Première app** : Créer une application de compteur
3. 📝 **Todo List** : Implémenter une liste de tâches
4. 👤 **User Cards** : Afficher des cartes utilisateur avec props
5. 🌐 **API Fetch** : Récupérer et afficher des données d'une API

### Projet fil rouge

Commencer le développement d'une **mini-application de gestion de produits** avec :
- Liste de produits
- Ajout/suppression de produits
- Recherche et filtres
