---
theme: ./
colorSchema: "auto"
layout: intro
highlighter: shiki
# https://sli.dev/custom/highlighters.html
title: Formation Vue.js 3 - Initiation 2025
# download: true
#transition: slide-left
# remoteAssets: false
# export:
#   zoom: 1
#   format: pdf
#   timeout: 300000000
#   pdfOptions:
#     format: A4
download: "https://vuejs.andromed.fr/slides.pdf"
themeConfig:
  logoHeader: "/avatar.png"
  eventLogo: "https://img2.storyblok.com/352x414/f/84560/2388x414/23d8eb4b8d/vue-amsterdam-with-name.png"
  eventUrl: "https://vuejs.amsterdam/"
#addons:
  #- "@slidev/addon-sharp-long-code"
---

# Vue.js 3 - Formation Complète 2025

💚 Une formation présentée par Ascent et Andromed.

<div class="pt-12">
  <span @click="next" class="px-2 p-3 rounded cursor-pointer hover:bg-white hover:bg-opacity-10 neon-border">
    Appuyez sur espace pour la page suivante <carbon:arrow-right class="inline"/>
  </span>
</div>

---
layout: presenter
eventLogo: 'https://img2.storyblok.com/352x0/f/84560/2388x414/23d8eb4b8d/vue-amsterdam-with-name.png'
eventUrl: 'https://vuejs.amsterdam/'
twitter: '@jimmylansrq'

twitterUrl: 'https://twitter.com/jimmylansrq'
presenterImage: 'https://legacy.andromed.fr/images/fondator.jpg'
---

# Jimmylan Surquin

Fondateur <a  href="https://www.andromed.fr/"><logos-storyblok-icon  mr-1/>Andromed</a>

- Lille, France 🇫🇷
- Création de contenu sur <a href="https://www.youtube.com/channel/jimmylansrq"> <logos-youtube-icon mr-1 /> jimmylansrq </a>
- Blog & Portfolio <a href="https://jimmylan.fr"> jimmylan.fr </a>

---
layout: text-image
media: 'https://vuejs.org/images/logo.png'
caption: 'Vue.js 3 - 2025'
---

# DISCLAIMER 💚

### Dans cette formation nous allons voir Vue.js 3 en profondeur, la dernière version du framework progressif JavaScript.

---
layout: two-cols
routeAlias: 'sommaire'
---

<a name="sommaire" id="sommaire"></a>

# SOMMAIRE VUE.JS 3 - FORMATION 📜

<br>

<div class="flex flex-col gap-2">
<Link to="introduction-vuejs">💚 1. Introduction à Vue.js 3</Link>
<Link to="templates-directives">📝 2. Templates et Directives</Link>
<Link to="composants-vuejs">🧩 3. Composants Vue.js</Link>
<Link to="composition-api">🎯 4. Composition API</Link>
<Link to="reactivite-computed">⚡ 5. Réactivité et Computed</Link>
</div>

::right::

<div class="flex flex-col gap-2">
<Link to="formulaires-vmodel">📋 6. Formulaires et v-model</Link>
<Link to="vue-router">🛤️ 7. Vue Router 4</Link>
<Link to="pinia-state">🍍 8. Pinia - State Management</Link>
<Link to="projet-final">🚀 9. Projet Final et Bonnes Pratiques</Link>
<Link to="qcm-final">✅ QCM de validation finale</Link>
</div>

**Note :** Chaque module contient :
- 📖 Cours théorique
- ✅ QCM de validation
- 🎯 Exercices pratiques

---
layout: two-cols
routeAlias: 'programme-jour1'
---

### JOUR 1 - LES FONDAMENTAUX 📅

<small>

**Module 1 - Introduction à Vue.js 3**
- Qu'est-ce que Vue.js ?
- Pourquoi choisir Vue.js ?
- Installation et configuration
- Premier projet avec Vite
- Structure d'un projet Vue

**Module 2 - Templates et Directives**
- Syntaxe des templates
- Interpolation (Mustache)
- v-bind, v-on, v-if, v-else
- v-for et les listes
- v-show vs v-if

</small>

::right::

<small>

**Module 3 - Composants Vue.js**
- Création de composants
- Props et validation
- Événements personnalisés (emit)
- Slots et slots nommés
- Provide / Inject

</small>

---
layout: two-cols
routeAlias: 'programme-jour2'
---

### JOUR 2 - COMPOSITION ET RÉACTIVITÉ 📅

<small>

**Module 4 - Composition API**
- setup() et script setup
- Composables personnalisés
- Lifecycle hooks
- Template refs
- Différences avec Options API

**Module 5 - Réactivité et Computed**
- Système de réactivité Vue 3
- ref() et reactive()
- Computed properties
- Watchers (watch, watchEffect)
- Réactivité en profondeur

</small>

::right::

<small>

**Module 6 - Formulaires et v-model**
- v-model en profondeur
- Modificateurs (.lazy, .number, .trim)
- Inputs, selects, checkboxes
- Validation de formulaires
- v-model sur composants

</small>

---
layout: two-cols
routeAlias: 'programme-jour3'
---

### JOUR 3 - ÉCOSYSTÈME ET PROJET 📅

<small>

**Module 7 - Vue Router 4**
- Installation et configuration
- Routes dynamiques
- Navigation programmatique
- Guards et middleware
- Lazy loading des routes

**Module 8 - Pinia - State Management**
- Pourquoi Pinia ?
- Stores et state
- Getters et actions
- Composition API avec Pinia
- DevTools Vue

</small>

::right::

<small>

**Module 9 - Projet Final**
- Architecture d'un projet Vue
- Bonnes pratiques 2025
- Tests avec Vitest
- Déploiement (Vercel, Netlify)
- Optimisation et performances

**QCM Final** ✅
- Validation des connaissances
- Tous les modules
- Certification de la formation

</small>

---
src: './pages/01-introduction-vuejs.md'
---

---
src: './pages/01-qcm-introduction-vuejs.md'
---

---
src: './pages/01-exercices-introduction-vuejs.md'
---

---
src: './pages/02-templates-directives.md'
---

---
src: './pages/02-qcm-templates-directives.md'
---

---
src: './pages/02-exercices-templates-directives.md'
---

---
src: './pages/04-composants-vuejs.md'
---

---
src: './pages/04-qcm-composants-vuejs.md'
---

---
src: './pages/04-exercices-composants-vuejs.md'
---

---
src: './pages/05-composition-api.md'
---

---
src: './pages/05-qcm-composition-api.md'
---

---
src: './pages/05-exercices-composition-api.md'
---

---
src: './pages/03-reactivite-computed.md'
---

---
src: './pages/03-qcm-reactivite-computed.md'
---

---
src: './pages/03-exercices-reactivite-computed.md'
---

---
src: './pages/06-formulaires-vmodel.md'
---

---
src: './pages/06-qcm-formulaires-vmodel.md'
---

---
src: './pages/06-exercices-formulaires-vmodel.md'
---

---
src: './pages/07-vue-router.md'
---

---
src: './pages/07-qcm-vue-router.md'
---

---
src: './pages/07-exercices-vue-router.md'
---

---
src: './pages/08-pinia-state.md'
---

---
src: './pages/08-qcm-pinia-state.md'
---

---
src: './pages/08-exercices-pinia-state.md'
---

---
src: './pages/09-projet-final.md'
---

---
src: './pages/09-qcm-final.md'
---
