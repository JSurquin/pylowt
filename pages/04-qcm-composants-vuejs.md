---
layout: new-section
---

# QCM - Module 3 : Composants Vue.js ✅

Testons tes connaissances sur les composants !

10 questions - Note tes réponses, les corrections sont à la fin.

---
layout: exercices
---

# Question 1 / 10

### Comment definir des props avec TypeScript dans `<script setup>` ?

- A) `const props = defineProps([...])`
- B) `const props = defineProps<{...}>()`
- C) `const props = new Props({...})`
- D) `const props = createProps({...})`

---
layout: exercices
---

# Question 2 / 10

### Comment emettre un evenement vers le parent ?

- A) `this.$emit('eventName')`
- B) `emit('eventName')` apres `defineEmits`
- C) `dispatch('eventName')`
- D) `fire('eventName')`

---
layout: exercices
---

# Question 3 / 10

### Quel est le but des slots ?

- A) Stocker des donnees
- B) Injecter du contenu personnalise dans un composant
- C) Gerer les evenements
- D) Definir des styles

---
layout: exercices
---

# Question 4 / 10

### Comment creer un slot nomme "header" ?

- A) `<slot header />`
- B) `<slot name="header"></slot>`
- C) `<slot id="header" />`
- D) `<slot:header />`

---
layout: exercices
---

# Question 5 / 10

### Que fait `provide` / `inject` ?

- A) Injecte du CSS
- B) Passe des donnees à travers plusieurs niveaux de composants
- C) Cree des animations
- D) Gere les erreurs

---
layout: exercices
---

# Question 6 / 10

### Que fait le composant `<Teleport>` ?

- A) Telecharge des fichiers
- B) Rend le contenu dans une autre partie du DOM
- C) Cree des portails entre pages
- D) Accelere le rendu

---
layout: exercices
---

# Question 7 / 10

### Que fait `<KeepAlive>` ?

- A) Maintient la connexion reseau
- B) Preserve l'etat des composants dynamiques
- C) Empeche le composant de se mettre à jour
- D) Cache les composants

---
layout: exercices
---

# Question 8 / 10

### Comment passer des attributs non-props à un element specifique ?

- A) `v-attrs`
- B) `v-bind="$attrs"`
- C) `...props`
- D) `@attrs`

---
layout: exercices
---

# Question 9 / 10

### Comment exposer des methodes au parent via ref ?

- A) `exportMethod()`
- B) `defineExpose({...})`
- C) `exposeRef()`
- D) `this.$expose()`

---
layout: exercices
---

# Question 10 / 10

### Quelle est la convention de nommage recommandee pour les fichiers de composants ?

- A) kebab-case (my-component.vue)
- B) camelCase (myComponent.vue)
- C) PascalCase (MyComponent.vue)
- D) snake_case (my_component.vue)

---
layout: exercices
---

# 📝 Corrections - QCM Module 3

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **B** | `defineProps<{...}>()` avec generics TypeScript |
| 2 | **B** | `emit()` apres `defineEmits` |
| 3 | **B** | Les slots injectent du contenu personnalise |
| 4 | **B** | `<slot name="header">` et `<template #header>` |
| 5 | **B** | Provide/Inject evite le prop drilling |
| 6 | **B** | Teleport rend ailleurs dans le DOM (ex: body) |
| 7 | **B** | KeepAlive preserve l'etat des composants dynamiques |
| 8 | **B** | `v-bind="$attrs"` avec `inheritAttrs: false` |
| 9 | **B** | `defineExpose({...})` pour exposer au parent |
| 10 | **C** | PascalCase est la convention officielle |

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 3 !

Passons aux exercices pratiques ! 🚀
