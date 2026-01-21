---
layout: new-section
---

# QCM Module 1
## Introduction à Vue.js et bases fondamentales

---

# Question 1 - JavaScript ES6+

Quelle est la différence principale entre une fonction classique et une arrow function ?

A. La syntaxe uniquement

B. Le binding de `this` et la syntaxe

C. Les performances

D. Aucune différence

---

# Question 2 - Destructuring

Que fait ce code ?

```javascript
const { nom, age = 18 } = utilisateur;
```

A. Crée un objet avec nom et age

B. Extrait nom et age avec 18 comme valeur par défaut

C. Assigne 18 à age systématiquement

D. Provoque une erreur

---

# Question 3 - Promises

Quelle est la bonne façon de gérer une Promise ?

A. `promise.then().catch()`

B. `promise.catch().then()`

C. `promise.finally().then()`

D. `promise.then().then()`

---

# Question 4 - Architecture MVVM

Dans l'architecture MVVM de Vue.js, que représente le ViewModel ?

A. Le template HTML

B. Les données brutes

C. Le composant Vue qui lie le Model et la View

D. Le routeur

---

# Question 5 - Vite

Quel est l'avantage principal de Vite par rapport à Vue CLI ?

A. Plus d'options de configuration

B. Démarrage instantané et HMR ultra-rapide

C. Meilleur support de webpack

D. Interface graphique

---

# Question 6 - Structure de projet

Quel fichier est le point d'entrée d'une application Vue ?

A. `App.vue`

B. `index.html`

C. `main.js`

D. `vite.config.js`

---

# Question 7 - Interpolation

Laquelle de ces syntaxes est correcte pour afficher une variable ?

A. `{ variable }`

B. `{{ variable }}`

C. `{[ variable ]}`

D. `<%= variable %>`

---

# Question 8 - Directive v-bind

Quelle est la syntaxe courte de `v-bind:src` ?

A. `@src`

B. `:src`

C. `#src`

D. `*src`

---

# Question 9 - v-if vs v-show

Quelle est la différence entre v-if et v-show ?

A. Aucune différence

B. v-if ajoute/supprime du DOM, v-show utilise CSS display

C. v-show est plus rapide dans tous les cas

D. v-if utilise CSS, v-show modifie le DOM

---

# Question 10 - v-for

Pourquoi est-il important d'utiliser `:key` avec v-for ?

A. C'est obligatoire sinon erreur

B. Pour l'optimisation et le suivi des éléments

C. Pour le style CSS

D. Ce n'est pas important

---

# Question 11 - v-model

Que fait v-model ?

A. Lie un événement

B. Crée une liaison bidirectionnelle

C. Affiche une valeur

D. Boucle sur un tableau

---

# Question 12 - Composants

Comment passer des données d'un parent à un enfant ?

A. Avec emit

B. Avec props

C. Avec v-model

D. Avec provide/inject

---

# Question 13 - Props

Quelle est la syntaxe correcte pour définir une prop obligatoire ?

A. `props: { nom: String }`

B. `props: { nom: { type: String, required: true } }`

C. `props: { nom: required }`

D. `defineProps(['nom!'])`

---

# Question 14 - Événements

Comment un composant enfant envoie-t-il des données au parent ?

A. Via props

B. Via emit

C. Via v-model

D. Via return

---

# Question 15 - Composants dynamiques

Quelle balise permet d'afficher un composant dynamiquement ?

A. `<dynamic>`

B. `<component>`

C. `<vue-component>`

D. `<switch>`

---

# Question 16 - Computed

Quel est l'avantage d'une propriété computed ?

A. Plus rapide qu'une method

B. Mise en cache automatique

C. Obligatoire pour les calculs

D. Pas d'avantage particulier

---

# Question 17 - Lifecycle hooks

Quel hook s'exécute après le montage du composant ?

A. `onBeforeMount`

B. `onMounted`

C. `onCreated`

D. `onInit`

---

# Question 18 - onMounted

Que fait-on généralement dans onMounted ?

A. Initialiser les variables

B. Faire des appels API

C. Définir les props

D. Créer le template

---

# Question 19 - Composables

À quoi servent les composables ?

A. Créer des composants

B. Extraire et réutiliser de la logique

C. Gérer le routing

D. Gérer les styles

---

# Question 20 - Fetch API

Quelle méthode fetch utilise-t-on pour créer une ressource ?

A. GET

B. POST

C. PUT

D. CREATE

---

# Réponses - QCM Module 1

<div class="grid grid-cols-2 gap-4">

<div>

**Question 1:** B - Le binding de `this` et la syntaxe

**Question 2:** B - Extrait nom et age avec 18 comme valeur par défaut

**Question 3:** A - `promise.then().catch()`

**Question 4:** C - Le composant Vue qui lie le Model et la View

**Question 5:** B - Démarrage instantané et HMR ultra-rapide

**Question 6:** C - `main.js`

**Question 7:** B - `{{ variable }}`

**Question 8:** B - `:src`

**Question 9:** B - v-if ajoute/supprime du DOM, v-show utilise CSS display

**Question 10:** B - Pour l'optimisation et le suivi des éléments

</div>

<div>

**Question 11:** B - Crée une liaison bidirectionnelle

**Question 12:** B - Avec props

**Question 13:** B - `props: { nom: { type: String, required: true } }`

**Question 14:** B - Via emit

**Question 15:** B - `<component>`

**Question 16:** B - Mise en cache automatique

**Question 17:** B - `onMounted`

**Question 18:** B - Faire des appels API

**Question 19:** B - Extraire et réutiliser de la logique

**Question 20:** B - POST

</div>

</div>
