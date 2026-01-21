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

# Vue.js 3 - 2025 x 2026

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
<Link to="module1-introduction">💚 1. Introduction à Vue.js et bases fondamentales</Link>
<Link to="module2-slots">🎰 2. Slots et composants génériques</Link>
<Link to="module3-avance">🚀 3. Vue.js - Fonctionnement avancé</Link>
</div>

::right::

<div class="flex flex-col gap-2">
<Link to="module4-pinia">🍍 4. State Management avec Pinia</Link>
<Link to="module5-router">🛤️ 5. Navigation et routage avec Vue Router</Link>
<Link to="module6-tests">🧪 6. Tests sous Vue.js avec Vitest</Link>
<Link to="qcm-final">✅ QCM de validation finale</Link>
<Link to="projet-final">🎓 Projet Final</Link>
</div>

**Note :** Chaque module contient :
- 📖 Cours théorique
- ✅ QCM de validation
- 🎯 Exercices pratiques

---
layout: two-cols
routeAlias: 'programme-jour1'
---

### JOUR 1 - FONDAMENTAUX ET BASES 📅

<small>

**Module 1 - Introduction à Vue.js et bases fondamentales**
- Rappels JavaScript ES6+
- Architecture Vue.js (MVVM)
- Outils et environnement (Node.js, Vite, Vue CLI)
- Concepts fondamentaux (data binding, interpolation)
- Directives (v-bind, v-if, v-for, v-on, v-model)
- Composants et communication (props, emits)
- Réactivité et logique (computed, hooks, composables)

</small>

::right::

<small>

**Module 2 - Slots et composants génériques**
- Définition et intérêts des slots
- Slots simples et nommés
- Directive v-slot
- Scoped slots (slots à portée)
- Slots dynamiques
- Combinaison props & slots
- Composants génériques réutilisables

</small>

---
layout: two-cols
routeAlias: 'programme-jour2'
---

### JOUR 2 - VUE.JS AVANCÉ ET STATE MANAGEMENT 📅

<small>

**Module 3 - Vue.js - Fonctionnement avancé**
- Composants fonctionnels
- Single File Components (SFC)
- Directives personnalisées
- Création de directives
- Refactorisation de composants

</small>

::right::

<small>

**Module 4 - State Management avec Pinia**
- Pattern State Management
- Store global unique
- Création d'un store Pinia
- State, Getters, Actions
- Mutations d'état
- Intégration dans une application

</small>

---
layout: two-cols
routeAlias: 'programme-jour3'
---

### JOUR 3 - ROUTING, TESTS ET PROJET 📅

<small>

**Module 5 - Navigation et routage avec Vue Router**
- Présentation de Vue Router
- Installation et configuration
- Routes dynamiques et imbriquées
- Navigation programmatique
- Guards de navigation
- Gestion des erreurs
- Modes hash et history

</small>

::right::

<small>

**Module 6 - Tests sous Vue.js avec Vitest**
- Intérêt des tests automatisés
- Installation de Vitest
- Tests de composants Vue
- Tests unitaires
- Tests de logique applicative

**Projet Final & QCM** 🎓
- Projet fil rouge
- Bonnes pratiques 2025
- Déploiement
- QCM de validation finale

</small>

---
src: './pages/module1-introduction-bases.md'
---

---
src: './pages/module1-qcm.md'
---

---
src: './pages/module1-exercices.md'
---

---
src: './pages/module2-slots-composants.md'
---

---
src: './pages/module2-qcm.md'
---

---
src: './pages/module2-exercices.md'
---

---
src: './pages/module3-vuejs-avance.md'
---

---
src: './pages/module3-qcm.md'
---

---
src: './pages/module3-exercices.md'
---

---
src: './pages/module4-pinia-state.md'
---

---
src: './pages/module4-qcm.md'
---

---
src: './pages/module4-exercices.md'
---

---
src: './pages/module5-vue-router.md'
---

---
src: './pages/module5-qcm.md'
---

---
src: './pages/module5-exercices.md'
---

---
src: './pages/module6-tests-vitest.md'
---

---
src: './pages/module6-qcm.md'
---

---
src: './pages/module6-exercices.md'
---

---
src: './pages/qcm-final.md'
---

---
src: './pages/projet-final.md'
---
