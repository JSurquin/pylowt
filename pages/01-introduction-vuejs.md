---
layout: new-section
routeAlias: 'introduction-vuejs'
---

# Module 1 : Introduction à Vue.js 3 💚

Découvrons ensemble le framework progressif qui a conquis le monde du développement web !

---

# Qu'est-ce que Vue.js ? 🤔

**Vue.js** est un **framework JavaScript progressif** créé par **Evan You** en 2014.

<v-clicks>

- 🎯 **Progressif** : Tu peux l'adopter petit à petit, pas besoin de tout réécrire !
- 🧩 **Basé sur les composants** : Comme des LEGO, tu construis ton UI pièce par pièce
- ⚡ **Réactif** : L'interface se met à jour automatiquement quand les données changent
- 📦 **Léger** : ~33KB gzippé pour le runtime
- 🛠️ **Outillage moderne** : Vite, Vue DevTools, TypeScript natif

</v-clicks>

---

# L'analogie du LEGO 🧱

Imagine que tu construis une maison en LEGO :

<v-clicks>

- **Les briques** = Les composants Vue
- **Le plan de construction** = Le template HTML
- **Les instructions** = La logique JavaScript
- **Les couleurs** = Le style CSS

</v-clicks>

---

# L'analogie du LEGO - Suite 🧱

<v-clicks>

Chaque brique (composant) est :
- **Réutilisable** : Tu peux utiliser la même fenêtre partout
- **Indépendante** : Une brique cassée n'affecte pas les autres
- **Combinable** : Assemble-les pour créer quelque chose de plus grand

</v-clicks>

---
layout: two-cols
---

# Vue.js 3 vs Vue.js 2 📊

### Nouveautés majeures de Vue 3 :

<v-clicks>

- 🚀 **Composition API** : Nouvelle façon d'organiser le code
- ⚡ **Performance** : 2x plus rapide, bundle 50% plus petit
- 📝 **TypeScript** : Support natif de première classe
- 🎯 **Teleport** : Rendre du contenu ailleurs dans le DOM
- 🔀 **Fragments** : Plusieurs éléments racines autorisés

</v-clicks>

::right::

<v-clicks>

### Ce qui change concrètement :

```vue
<!-- Vue 2 - Options API -->
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

</v-clicks>

---

# Vue 3 - Composition API 🎯

```vue
<!-- Vue 3 - Composition API -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}
</script>
```

---

# Pourquoi choisir Vue.js ? 🏆

<v-clicks>

- 📚 **Courbe d'apprentissage douce** : Plus facile que React ou Angular
- 📖 **Documentation exceptionnelle** : La meilleure du marché !
- 👥 **Communauté active** : Écosystème riche et mature
- 🏢 **Adopté par les géants** : Alibaba, Nintendo, GitLab, Apple...
- 🔧 **Flexibilité** : Options API OU Composition API, c'est toi qui choisis

</v-clicks>

---

# Comparatif des frameworks 📈

| Critère | Vue.js 3 | React 18 | Angular 17 |
|---------|----------|----------|------------|
| Courbe d'apprentissage | 🟢 Facile | 🟡 Moyenne | 🔴 Difficile |
| Performance | 🟢 Excellente | 🟢 Excellente | 🟡 Bonne |
| Taille du bundle | 🟢 ~33KB | 🟡 ~42KB | 🔴 ~130KB |
| TypeScript | 🟢 Natif | 🟡 Addon | 🟢 Natif |
| Documentation | 🟢 Excellente | 🟡 Bonne | 🟡 Bonne |

---

# Installation avec Vite ⚡

**Vite** est l'outil de build recommandé pour Vue.js 3 en 2025.

Pourquoi Vite ?
- 🚀 Démarrage instantané (pas de bundling en dev)
- ⚡ HMR ultra-rapide (Hot Module Replacement)
- 📦 Build optimisé pour la production
- 🔧 Configuration minimale

---

# Créer un projet Vue.js 3 🛠️

```bash
# Créer un nouveau projet Vue.js 3
npm create vue@latest mon-projet
```

---

# Options de configuration 🎛️

```bash
# L'assistant vous pose ces questions :
✔ Add TypeScript? … Yes
✔ Add JSX Support? … No
✔ Add Vue Router? … Yes
✔ Add Pinia? … Yes
✔ Add Vitest? … Yes
✔ Add ESLint? … Yes
✔ Add Prettier? … Yes
```

---

# Lancer le projet 🚀

```bash
# Se déplacer dans le dossier
cd mon-projet

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

---

# Structure d'un projet Vue.js 3 📁

```
mon-projet/
├── node_modules/       # Dépendances
├── public/             # Assets statiques
├── src/
│   ├── assets/         # Images, CSS...
│   ├── components/     # Composants réutilisables
│   ├── views/          # Pages/Vues
│   ├── router/         # Configuration des routes
│   ├── stores/         # Stores Pinia
│   ├── App.vue         # Composant racine
│   └── main.ts         # Point d'entrée
├── index.html          # Page HTML
├── package.json        # Dépendances et scripts
├── vite.config.ts      # Configuration Vite
└── tsconfig.json       # Configuration TypeScript
```

---

# Anatomie d'un composant Vue 🔬

Un composant Vue est un fichier `.vue` qui contient 3 sections :

```vue
<script setup lang="ts">
// 🧠 La logique JavaScript/TypeScript
import { ref } from 'vue'
const message = ref('Bonjour Vue.js 3 !')
</script>
```

---

# Anatomie d'un composant Vue - Template 🔬

```vue
<template>
  <!-- 📝 Le template HTML -->
  <div class="container">
    <h1>{{ message }}</h1>
  </div>
</template>
```

---

# Anatomie d'un composant Vue - Style 🔬

```vue
<style scoped>
/* 🎨 Les styles CSS (scoped = isolés) */
.container {
  padding: 20px;
  background: #42b883;
}
</style>
```

---

# L'attribut `scoped` 🎯

```vue
<style scoped>
/* Ces styles ne s'appliquent QU'à ce composant */
.button {
  background: green;
}
</style>
```

---

# Pourquoi `scoped` est génial ? 🎯

<v-clicks>

- 🔒 **Isolation** : Pas de conflits CSS entre composants
- 🧹 **Maintenance** : Supprimer un composant = supprimer ses styles
- 🎨 **Liberté** : Utilise les mêmes noms de classes partout

</v-clicks>

---

# Premier composant : Hello World 👋

Créons notre premier composant dans `src/components/HelloWorld.vue` :

```vue
<script setup lang="ts">
import { ref } from 'vue'

// Propriété réactive
const name = ref('Vue.js 3')

// Fonction
function sayHello() {
  alert(`Bonjour ${name.value} !`)
}
</script>
```

---

# Hello World - Template 👋

```vue
<template>
  <div class="hello">
    <h1>Bienvenue sur {{ name }} ! 💚</h1>
    <button @click="sayHello">
      Dire bonjour
    </button>
  </div>
</template>
```

---

# Hello World - Style 👋

```vue
<style scoped>
.hello {
  text-align: center;
  padding: 2rem;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #3aa876;
}
</style>
```

---

# Les Vue DevTools 🔧

**Vue DevTools** est une extension navigateur indispensable !

<v-clicks>

- 🔍 **Inspecter** les composants et leur état
- ⏱️ **Timeline** des événements
- 🍍 **Pinia** : Voir l'état des stores
- 🛤️ **Router** : Visualiser les routes
- ⚡ **Performance** : Analyser les re-renders

</v-clicks>

---

# Installer Vue DevTools 🛠️

```bash
# Extension Chrome
https://chrome.google.com/webstore/detail/vuejs-devtools

# Extension Firefox
https://addons.mozilla.org/fr/firefox/addon/vue-js-devtools/

# Application standalone (pour tout navigateur)
npm install -g @vue/devtools
vue-devtools
```

---

# Résumé du Module 1 📝

<v-clicks>

- ✅ Vue.js 3 est un framework **progressif** et **réactif**
- ✅ La **Composition API** est la nouvelle façon d'écrire du code
- ✅ **Vite** est l'outil de build recommandé
- ✅ Un composant = `<script>` + `<template>` + `<style>`
- ✅ **Vue DevTools** est ton meilleur ami pour débugger

</v-clicks>

---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu as bien compris les bases de Vue.js 3 !

