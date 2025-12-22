---
layout: new-section
---

# QCM - Module 3 : Composants Vue.js ✅

Testons tes connaissances sur les composants !

---
layout: exercices
---

# Question 1 🤔

### Comment définir des props avec TypeScript dans `<script setup>` ?

<v-clicks>

- A) `const props = defineProps([...])`
- B) `const props = defineProps<{...}>()` ✅
- C) `const props = new Props({...})`
- D) `const props = createProps({...})`

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) `const props = defineProps<{...}>()`**

La syntaxe TypeScript utilise les generics pour définir les types des props de manière type-safe.

---
layout: exercices
---

# Question 2 🤔

### Comment émettre un événement vers le parent ?

<v-clicks>

- A) `this.$emit('eventName')`
- B) `emit('eventName')` après `defineEmits` ✅
- C) `dispatch('eventName')`
- D) `fire('eventName')`

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**B) `emit('eventName')` après `defineEmits`**

```js
const emit = defineEmits(['eventName'])
emit('eventName', data)
```

---
layout: exercices
---

# Question 3 🤔

### Quel est le but des slots ?

<v-clicks>

- A) Stocker des données
- B) Injecter du contenu personnalisé dans un composant ✅
- C) Gérer les événements
- D) Définir des styles

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**B) Injecter du contenu personnalisé dans un composant**

Les slots permettent au parent de passer du contenu HTML/composants à l'intérieur d'un composant enfant.

---
layout: exercices
---

# Question 4 🤔

### Comment créer un slot nommé "header" ?

<v-clicks>

- A) `<slot header />`
- B) `<slot name="header"></slot>` ✅
- C) `<slot id="header" />`
- D) `<slot:header />`

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) `<slot name="header"></slot>`**

Et pour l'utiliser : `<template #header>...</template>`

---
layout: exercices
---

# Question 5 🤔

### Que fait `provide` / `inject` ?

<v-clicks>

- A) Injecte du CSS
- B) Passe des données à travers plusieurs niveaux de composants ✅
- C) Crée des animations
- D) Gère les erreurs

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**B) Passe des données à travers plusieurs niveaux de composants**

Provide/Inject évite le "prop drilling" en permettant à un ancêtre de fournir des données accessibles par tous ses descendants.

---
layout: exercices
---

# Question 6 🤔

### Que fait le composant `<Teleport>` ?

<v-clicks>

- A) Télécharge des fichiers
- B) Rend le contenu dans une autre partie du DOM ✅
- C) Crée des portails entre pages
- D) Accélère le rendu

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**B) Rend le contenu dans une autre partie du DOM**

`<Teleport to="body">` rend le contenu dans `<body>` même si le composant est imbriqué ailleurs.

---
layout: exercices
---

# Question 7 🤔

### Que fait `<KeepAlive>` ?

<v-clicks>

- A) Maintient la connexion réseau
- B) Préserve l'état des composants dynamiques ✅
- C) Empêche le composant de se mettre à jour
- D) Cache les composants

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**B) Préserve l'état des composants dynamiques**

Avec `<KeepAlive>`, quand tu changes de composant avec `<component :is>`, l'état du composant précédent est conservé.

---
layout: exercices
---

# Question 8 🤔

### Comment passer des attributs non-props à un élément spécifique ?

<v-clicks>

- A) `v-attrs`
- B) `v-bind="$attrs"` ✅
- C) `...props`
- D) `@attrs`

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**B) `v-bind="$attrs"`**

Avec `inheritAttrs: false`, tu peux contrôler où appliquer les attributs passés au composant.

---
layout: exercices
---

# Question 9 🤔

### Comment exposer des méthodes au parent via ref ?

<v-clicks>

- A) `exportMethod()`
- B) `defineExpose({...})` ✅
- C) `exposeRef()`
- D) `this.$expose()`

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**B) `defineExpose({...})`**

```js
defineExpose({
  maMethode,
  maValeur
})
```

Permet au parent d'accéder via une template ref.

---
layout: exercices
---

# Question 10 🤔

### Quelle est la convention de nommage recommandée pour les fichiers de composants ?

<v-clicks>

- A) kebab-case (my-component.vue)
- B) camelCase (myComponent.vue)
- C) PascalCase (MyComponent.vue) ✅
- D) snake_case (my_component.vue)

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**C) PascalCase (MyComponent.vue)**

C'est la convention officielle Vue.js. Dans le template, tu peux utiliser `<MyComponent />` ou `<my-component />`.

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 4 !

Passons aux exercices pratiques ! 🚀

