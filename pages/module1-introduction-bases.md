---
layout: new-section
routeAlias: 'module1-introduction'
---

# Module 1
## Introduction à Vue.js et bases fondamentales

---

# Bienvenue dans l'aventure Vue.js ! 🎉

### 🌟 Vous êtes au bon endroit !

Que vous veniez de :
- **JavaScript pur** : Vue va vous faire gagner un temps fou ⏰
- **jQuery** : Bienvenue en 2025 ! Vous allez adorer la réactivité 
- **React** : Préparez-vous à une syntaxe plus intuitive
- **Rien du tout** : Parfait ! Vue est fait pour les débutants

### 💪 Ce que vous allez apprendre

En 3 jours, vous serez capable de créer des **applications web modernes et performantes** !

### 🎯 Notre promesse

À la fin de cette formation :
- Vous comprendrez VRAIMENT comment fonctionne Vue.js
- Vous aurez créé une application complète
- Vous aurez les outils pour continuer seul

### 🚀 Conseil de pro

**N'ayez pas peur de l'erreur** : les erreurs sont vos meilleurs professeurs !
Chaque développeur a commencé comme vous. La seule différence ? Ils ont persévéré 💪

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

### 🤔 Mais c'est quoi "progressif" ?

Imaginez Vue.js comme des **Legos** :
- Vous pouvez commencer avec juste une petite brique (un composant dans une page HTML)
- Puis ajouter d'autres briques au fur et à mesure (router, state management...)
- Contrairement à Angular qui vous impose tout dès le départ !

### Caractéristiques principales

- 🎯 **Progressif** : peut être adopté progressivement (un composant, puis toute l'app)
- ⚡ **Performant** : Virtual DOM et réactivité optimisée (plus rapide que React dans certains cas)
- 🔧 **Flexible** : s'adapte à tous types de projets (widget, SPA, SSR...)
- 📦 **Écosystème riche** : Vue Router, Pinia, Vite... tout est intégré harmonieusement
- 💚 **Communauté active** : support et ressources (et une mascotte adorable !)

---

# Pourquoi choisir Vue.js en 2025 ?

### 📊 La courbe d'apprentissage

```
Difficulté
    │
    │         React ────────────┐
    │                           │
    │    Angular ───────────────┤
    │                           │
    │ Vue ────┐                 │
    │         └─────────────────┘
    └────────────────────────────> Temps
```

---

# La courbe d'apprentissage expliquée

**Vue.js c'est comme apprendre le vélo avec des petites roues** : vous avancez vite au début, puis vous les enlevez quand vous êtes prêt !

---

# Avantages de Vue.js

### 💪 Avantages concrets

- ✨ **Courbe d'apprentissage douce** : HTML que vous connaissez déjà + un peu de JS = Vue !
- 🚀 **Performances excellentes** : plus rapide que React pour les grandes listes
- 📝 **Documentation de qualité** : la meilleure de tous les frameworks (dixit la communauté)
- 🔧 **Outils de développement puissants** : Vue DevTools est magique 🪄
- 💼 **Adopté par de grandes entreprises** : Alibaba, Adobe, GitLab, Nintendo...

### 🎯 Cas d'usage réels

- Applications web modernes (SPA) - ex: GitLab
- Interfaces utilisateur interactives - ex: Behance d'Adobe
- Tableaux de bord et dashboards - ex: Grammarly
- Progressive Web Apps (PWA) - ex: 9GAG

---

# Architecture MVVM

Vue.js suit le pattern MVVM (Model-View-ViewModel)

### 🏗️ Pensez à une maison :

```
┌──────────────┐
│     VIEW     │  ← La FAÇADE (ce que vous voyez) 🏠
│  (Template)  │     Template HTML
└──────┬───────┘
       │
       ↕ Data Binding (la magie de Vue ✨)
       │
┌──────┴───────┐
│  VIEWMODEL   │  ← L'ARCHITECTE (organise tout) 👷
│ (Composant)  │     Composant Vue.js
└──────┬───────┘
       │
       ↕ Logique métier
       │
┌──────┴───────┐
│    MODEL     │  ← Les FONDATIONS (vos données) 🧱
│   (State)    │     State / Données
└──────────────┘
```

---

# MVVM : Vue vs JavaScript pur

**En JS pur** : vous devez tout câbler à la main (querySelector, addEventListener...)

**Avec Vue** : le data binding fait le travail automatiquement ! 🎉

---

# MVVM dans Vue.js - Exemple

```vue
<script>
export default {
  // MODEL - Données
  data() {
    return {
      compteur: 0,
      utilisateur: {
        nom: 'Jean',
        email: 'jean@example.com'
      }
    }
  },
  // VIEWMODEL - Logique
  methods: {
    incrementer() {
      this.compteur++;
    }
  }
}
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

---

# Package managers en 2025

- **npm** : package manager par défaut
- **pnpm** : plus rapide, économise de l'espace
- **yarn** : alternative populaire

---

# Vite - Build tool moderne ⚡

**Vite** est l'outil de build recommandé pour Vue.js 3 en 2025

### 🏎️ Analogie : Vite vs Webpack

**Webpack** = Préparer TOUS les ingrédients avant de cuisiner (lent au démarrage)
**Vite** = Cuisiner à la demande, seulement ce dont vous avez besoin (instantané !)

### Avantages de Vite

- ⚡ **Démarrage instantané** : < 1 seconde vs 30-60 sec avec Webpack
- 🔥 **Hot Module Replacement (HMR) ultra-rapide** : vos changements apparaissent instantanément
- 📦 **Build optimisé avec Rollup** : bundle de production ultra-performant
- 🎯 **Support TypeScript natif** : pas de configuration nécessaire
- 🔌 **Système de plugins extensible** : écosystème riche

### 💡 Fun fact

Vite signifie "rapide" en français ! Et créé par Evan You, le créateur de Vue.js lui-même 🇫🇷

```bash
# Créer un projet avec Vite (ULTRA simple)
npm create vite@latest mon-projet -- --template vue

# Avec TypeScript (recommandé pour les grands projets)
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

---

# Quand utiliser Vue CLI ?

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
<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      count: 0
    }
  }
}
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

Vue.js permet de lier les données du composant au template avec l'**Options API**

### 🔌 C'est comme brancher une multiprise électrique

Imaginez que vos données sont l'électricité, et votre template est l'ampoule.
**Vue.js est la multiprise** qui les connecte automatiquement !

### Types de liaison (les 4 prises)

- **Interpolation** : `{{ variable }}` → Afficher du texte (lecture seule) 📖
- **Attributs** : `v-bind:attr="value"` ou `:attr="value"` → Modifier les attributs HTML 🎨
- **Événements** : `v-on:event="handler"` ou `@event="handler"` → Écouter les actions utilisateur 👂
- **Bidirectionnelle** : `v-model="variable"` → Synchronisation automatique ↔️

---

# Data Binding : Vue vs JavaScript pur

### 🆚 En JavaScript pur, vous devriez faire :

```javascript
// Afficher
element.textContent = variable;

// Mettre à jour quand ça change
variable = newValue;
element.textContent = variable; // Il faut le refaire manuellement !
```

---

# La magie de Vue !

**Avec Vue** : changez la variable, l'affichage se met à jour automatiquement ! ✨

C'est ça la **réactivité** : Vue observe vos données et met à jour le DOM automatiquement !

---

# Interpolation (Mustache)

Affichage de données dans le template avec `{{ }}` - **Options API**

```vue
<script>
export default {
  data() {
    return {
      message: 'Bonjour Vue.js!',
      nombre: 42,
      utilisateur: {
        nom: 'Dupont',
        prenom: 'Jean'
      }
    }
  }
}
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

Lie un attribut HTML à une expression JavaScript - **Options API**

```vue
<script>
export default {
  data() {
    return {
      imageUrl: '/logo.png',
      altText: 'Logo Vue.js',
      isDisabled: false,
      styles: {
        color: 'blue',
        fontSize: '20px'
      }
    }
  }
}
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

Écoute les événements DOM - **Options API**

```vue
<script>
export default {
  data() {
    return {
      compteur: 0,
      message: ''
    }
  },
  methods: {
    incrementer() {
      this.compteur++;
    },
    afficherMessage(event) {
      console.log('Événement:', event);
      this.message = 'Bouton cliqué!';
    }
  }
}
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

Affichage conditionnel (ajout/suppression du DOM) - **Options API**

```vue
<script>
export default {
  data() {
    return {
      isLoggedIn: false,
      userRole: 'admin',
      score: 75
    }
  }
}
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

Alternative à `v-if` qui utilise CSS (display: none) - **Options API**

```vue
<script>
export default {
  data() {
    return {
      isVisible: true
    }
  }
}
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

---

# v-if vs v-show : La bataille ! ⚔️

### 🏗️ v-if : Le démolisseur/constructeur

- **Détruit** et **recrée** l'élément dans le DOM à chaque fois
- Comme démolir et reconstruire un mur de Lego à chaque fois
- **Coût élevé** si vous toggle souvent
- ✅ **Utilisez si** : l'élément change rarement

### 👻 v-show : Le magicien de l'invisibilité

- L'élément reste dans le DOM, juste caché avec `display: none`
- Comme mettre un drap d'invisibilité sur quelque chose
- **Coût faible** pour toggler
- ✅ **Utilisez si** : vous toggle souvent (menu dropdown, modal...)

### 🎯 Règle d'or

**Toggle fréquent** (ex: dropdown menu) → `v-show`
**Condition rare** (ex: admin panel) → `v-if`

---

# Directive v-for

Rendu de listes - **Options API**

```vue
<script>
export default {
  data() {
    return {
      fruits: ['Pomme', 'Banane', 'Orange'],
      utilisateurs: [
        { id: 1, nom: 'Alice', age: 25 },
        { id: 2, nom: 'Bob', age: 30 },
        { id: 3, nom: 'Charlie', age: 35 }
      ]
    }
  }
}
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

---

# v-for : Point important

⚠️ **Important** : toujours utiliser `:key` avec une valeur unique pour les performances

Le `:key` aide Vue à identifier chaque élément de façon unique et optimiser le rendu.

---

# v-model - Liaison bidirectionnelle

Synchronise automatiquement les données avec les inputs - **Options API**

```vue
<script>
export default {
  data() {
    return {
      texte: '',
      isChecked: false,
      selected: '',
      message: ''
    }
  }
}
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

### 🧱 Analogie : Les composants sont comme des Lego

Imaginez que vous construisez une maison en Lego :
- Vous ne créez pas chaque brique individuellement
- Vous **réutilisez** les mêmes briques partout
- Chaque brique a sa **responsabilité** (mur, porte, fenêtre...)
- Vous pouvez **assembler** ces briques de différentes façons

---

# Structure d'une application en composants

### 💡 Dans une application web :

```
App
├── Header
│   ├── Logo
│   ├── Navigation
│   └── UserMenu
├── MainContent
│   ├── ProductCard (x10)
│   └── Pagination
└── Footer
```

### 🎯 Avantages concrets

- **Réutilisabilité** : créez une fois, utilisez partout
- **Maintenabilité** : bug dans ProductCard ? Un seul endroit à corriger !
- **Organisation du code** : chaque composant = un fichier
- **Tests facilités** : testez chaque brique indépendamment

---

# Création d'un composant

Fichier `MonBouton.vue` - **Options API**

```vue
<script>
export default {
  data() {
    return {
      compteur: 0
    }
  },
  methods: {
    incrementer() {
      this.compteur++;
    }
  }
}
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
<script>
import MonBouton from './components/MonBouton.vue';

export default {
  components: {
    MonBouton
  }
}
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

---

# Composants indépendants

Chaque instance du composant a son propre état indépendant

---

# Props - Passer des données aux enfants

Les props permettent de passer des données du parent à l'enfant - **Options API**

```vue
<!-- UserCard.vue -->
<script>
export default {
  props: {
    nom: String,
    age: Number,
    email: {
      type: String,
      required: true
    }
  }
}
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
<script>
import UserCard from './components/UserCard.vue';

export default {
  components: {
    UserCard
  },
  data() {
    return {
      utilisateur: {
        nom: 'Alice',
        age: 28,
        email: 'alice@example.com'
      }
    }
  }
}
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
<script>
export default {
  props: {
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
  }
}
</script>
```

---

# Validation avancée des props

```vue
<script>
export default {
  props: {
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
  }
}
</script>
```

---

# Événements personnalisés (emit)

Les enfants peuvent communiquer avec les parents via des événements - **Options API**

```vue
<!-- CompteurEnfant.vue -->
<script>
export default {
  emits: ['incrementer', 'decrementer'],
  methods: {
    handleIncrement() {
      this.$emit('incrementer', 1);
    },
    handleDecrement() {
      this.$emit('decrementer', 1);
    }
  }
}
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
<script>
import CompteurEnfant from './components/CompteurEnfant.vue';

export default {
  components: {
    CompteurEnfant
  },
  data() {
    return {
      compteur: 0
    }
  },
  methods: {
    onIncrementer(valeur) {
      this.compteur += valeur;
    },
    onDecrementer(valeur) {
      this.compteur -= valeur;
    }
  }
}
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

# Validation des événements

```vue
<script>
export default {
  emits: {
    // Validation simple
    incrementer: (value) => {
      return typeof value === 'number' && value > 0;
    },
    decrementer: (value) => {
      return typeof value === 'number' && value > 0;
    },
    change: (id, value) => {
      return typeof id === 'string' && id.length > 0;
    }
  },
  methods: {
    handleIncrement() {
      this.$emit('incrementer', 1);
    }
  }
}
</script>
```

---

# Composants dynamiques

Changer de composant dynamiquement avec `<component>`

```vue
<script>
import Accueil from './components/Accueil.vue';
import Profil from './components/Profil.vue';
import Parametres from './components/Parametres.vue';

export default {
  components: {
    Accueil,
    Profil,
    Parametres
  },
  data() {
    return {
      currentComponent: 'Accueil'
    }
  },
  computed: {
    components() {
      return { Accueil, Profil, Parametres };
    }
  }
}
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
<script>
import TodoItem from './components/TodoItem.vue';

export default {
  components: {
    TodoItem
  },
  data() {
    return {
      todos: [
        { id: 1, text: 'Apprendre Vue.js', done: false },
        { id: 2, text: 'Créer un projet', done: false },
        { id: 3, text: 'Déployer', done: false }
      ]
    }
  },
  methods: {
    ajouterTodo(text) {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      });
    },
    toggleTodo(todo) {
      todo.done = !todo.done;
    }
  }
}
</script>

<template>
  <TodoItem 
    v-for="todo in todos"
    :key="todo.id"
    :todo="todo"
    @toggle="toggleTodo(todo)"
  />
</template>
```

---

# Affichage conditionnel de composants

```vue
<script>
import LoginForm from './components/LoginForm.vue';
import Dashboard from './components/Dashboard.vue';
import AdminPanel from './components/AdminPanel.vue';
import UserPanel from './components/UserPanel.vue';

export default {
  components: {
    LoginForm,
    Dashboard,
    AdminPanel,
    UserPanel
  },
  data() {
    return {
      isLoggedIn: false,
      userRole: 'user'
    }
  },
  methods: {
    handleLogin() {
      this.isLoggedIn = true;
    }
  }
}
</script>

<template>
  <div>
    <LoginForm v-if="!isLoggedIn" @login="handleLogin" />
    
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

Les propriétés calculées sont des valeurs dérivées qui se mettent à jour automatiquement - **Options API**

```vue
<script>
export default {
  data() {
    return {
      prenom: 'Jean',
      nom: 'Dupont',
      prix: 100,
      quantite: 3
    }
  },
  computed: {
    nomComplet() {
      return `${this.prenom} ${this.nom}`;
    },
    total() {
      return this.prix * this.quantite;
    }
  }
}
</script>

<template>
  <p>{{ nomComplet }}</p>
  <p>Total: {{ total }}€</p>
</template>
```

---

# Computed vs Methods : Le match ! 🥊

### 💾 Computed : Le malin qui mémorise

Comme un étudiant qui note sa réponse et ne recalcule que si la question change !

```vue
<script>
export default {
  data() {
    return {
      nombres: [1, 2, 3, 4, 5]
    }
  },
  computed: {
    // Computed - mise en cache
    sommeComputed() {
      console.log('Calcul computed'); // Affiché 1 seule fois !
      return this.nombres.reduce((a, b) => a + b, 0);
    }
  },
  methods: {
    // Method - recalculé à chaque fois
const sommeMethod = () => {
  console.log('Calcul method'); // Affiché 2 fois !
  return nombres.value.reduce((a, b) => a + b, 0);
};
</script>

<template>
  <p>{{ sommeComputed }}</p> <!-- Calculé 1 fois ✨ -->
  <p>{{ sommeComputed }}</p> <!-- Cache utilisé ♻️ -->
  <p>{{ sommeMethod() }}</p> <!-- Calculé 🔄 -->
  <p>{{ sommeMethod() }}</p> <!-- Recalculé 🔄 -->
</template>
```

### 🎯 Règle d'or

**Computed** : valeur dérivée qui dépend d'autres valeurs (nom complet = prénom + nom)
**Methods** : actions/opérations (envoyer email, sauvegarder...)

### 🆚 En React : pas de computed !

React recalcule tout à chaque render (sauf si vous utilisez `useMemo`)

---

# Hooks du cycle de vie

Les hooks permettent d'exécuter du code à des moments précis - **Options API**

```vue
<script>
export default {
  beforeCreate() {
    console.log('Avant la création');
  },
  created() {
    console.log('Composant créé');
  },
  beforeMount() {
    console.log('Avant le montage');
  },
  mounted() {
    console.log('Composant monté');
    // Appels API, initialisation
  }
}
</script>
```

---

# Hooks du cycle de vie (suite)

```vue
<script>
export default {
  data() {
    return {
      compteur: 0
    }
  },
  updated() {
    console.log('Composant mis à jour');
    console.log('Nouvelle valeur:', this.compteur);
  },
  beforeUnmount() {
    console.log('Avant destruction');
  },
  unmounted() {
    console.log('Composant démonté');
    // Nettoyage: timers, subscriptions, listeners
  }
}
</script>
```

---

# Exemple pratique avec lifecycle

```vue
<script>
export default {
  data() {
    return {
      data: null,
      loading: true,
      interval: null
    }
  },
  async mounted() {
    // Charger des données
    try {
      const response = await fetch('/api/data');
      this.data = await response.json();
    } finally {
      this.loading = false;
    }
    
    // Démarrer un interval
    this.interval = setInterval(() => {
      console.log('Tick');
    }, 1000);
  },
  beforeUnmount() {
    // Nettoyer l'interval
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
</script>
```

---

# Composables - Logique réutilisable

Les composables permettent d'extraire et de réutiliser de la logique

### 🧰 Pensez aux composables comme une boîte à outils

Au lieu de refaire le même tournevis dans chaque pièce, vous avez **UNE boîte à outils** que vous emmenez partout !

### 🆚 En React : ce sont les Custom Hooks

**Vue** : `useCompteur()` 
**React** : `useCounter()` (même concept, syntaxe similaire !)

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
  
  // On retourne tout ce qui peut être utile
  return {
    count,      // ← État
    increment,  // ← Actions
    decrement,
    reset
  };
}
```

---

# Avantages des Composables

### 💡 Avantage : DRY (Don't Repeat Yourself)

Au lieu de copier-coller la logique de compteur dans 10 composants, **créez un composable** !

C'est comme avoir une boîte à outils réutilisable : une fois créée, disponible partout !

---

# Réutiliser la logique (Mixins)

Avec l'Options API, on utilise les **mixins** pour réutiliser de la logique

```vue
<script>
// Fichier mixins/counterMixin.js
export const counterMixin = {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    }
  }
};

// Utilisation dans un composant
import { counterMixin } from './mixins/counterMixin';

export default {
  mixins: [counterMixin],
  mounted() {
    console.log('Compteur initial:', this.count);
  }
}
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

# Mixin pour fetch

Fichier `mixins/fetchMixin.js`

```javascript
export const fetchMixin = {
  data() {
    return {
      data: null,
      error: null,
      loading: false
    }
  },
  methods: {
    async fetchData(url) {
      this.loading = true;
      this.data = null;
      this.error = null;
      
      try {
        const res = await fetch(url);
        this.data = await res.json();
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    }
  }
};
```

---

# Utilisation du Mixin fetch

```vue
<script>
import { fetchMixin } from './mixins/fetchMixin';

export default {
  mixins: [fetchMixin],
  data() {
    return {
      userId: 1
    }
  },
  computed: {
    userUrl() {
      return `/api/users/${this.userId}`;
    }
  },
  methods: {
    nextUser() {
      this.userId++;
      this.fetchData(this.userUrl);
    }
  },
  mounted() {
    this.fetchData(this.userUrl);
  }
}
</script>

<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur: {{ error.message }}</div>
    <div v-else-if="data">
      <h2>{{ data.nom }}</h2>
      <p>{{ data.email }}</p>
    </div>
    
    <button @click="nextUser">Utilisateur suivant</button>
  </div>
</template>
```

---

# Requêtes HTTP avec fetch

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
      try {
        this.loading = true;
        const response = await fetch('https://api.example.com/users');
        
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

# Requêtes POST avec fetch

```vue
<script>
export default {
  data() {
    return {
      nom: '',
      email: ''
    }
  },
  methods: {
    async creerUtilisateur() {
      try {
        const response = await fetch('https://api.example.com/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: this.nom,
            email: this.email
          })
        });
        
        const data = await response.json();
        console.log('Utilisateur créé:', data);
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  }
}
</script>
```

---

# Gestion des données avec axios

Alternative à fetch (plus de fonctionnalités)

```bash
npm install axios
```

```vue
<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    }
  },
  async mounted() {
    try {
      const { data } = await axios.get('/api/users');
      this.users = data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async createUser(userData) {
      await axios.post('/api/users', userData);
    }
  }
}
</script>
```

---

# Votre parcours d'apprentissage 🗺️

```
Niveau de maîtrise
    ↑
100%│                                    🏆 Expert
    │                              ╱
 80%│                         ╱
    │                    ╱        Module 6 (Tests)
 60%│               ╱             Module 5 (Router)
    │          ╱                  Module 4 (Pinia)
 40%│     ╱                       Module 3 (Avancé)
    │ ╱                           Module 2 (Slots)
 20%│                             Module 1 (Bases)
    │                             ← VOUS ÊTES ICI !
  0%└────────────────────────────────────────────→
     Début                                    Fin
```

---

# Bilan de compétences

### 🎯 Ce que vous savez maintenant

✅ **JavaScript ES6+** : Arrow functions, destructuring, modules, async/await
✅ **Architecture Vue.js** : MVVM, organisation d'application
✅ **Outils** : Node.js, Vite, structure de projet
✅ **Concepts fondamentaux** : Data binding, interpolation, directives
✅ **Composants** : Création, props, événements, dynamiques
✅ **Réactivité** : Computed, lifecycle, composables, requêtes HTTP

### 💪 Vous êtes capable de :

- Créer une application Vue.js de A à Z
- Gérer l'état local avec ref/reactive
- Créer des composants réutilisables
- Faire des appels API
- Utiliser les directives Vue

### 🚀 Prochaine étape : Slots et composants génériques !

"Le voyage de mille lieues commence par un pas" - Vous venez de faire le premier pas ! 👣

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
