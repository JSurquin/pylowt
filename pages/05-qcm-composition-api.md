---
layout: new-section
---

# QCM - Module 4 : Composition API ✅

Testons tes connaissances sur la Composition API !

10 questions - Note tes réponses, les corrections sont à la fin.

---
layout: exercices
---

# Question 1 / 10

### Quel est l'avantage principal de la Composition API sur l'Options API ?

- A) Elle est plus rapide
- B) Elle organise le code par fonctionnalite
- C) Elle utilise moins de memoire
- D) Elle est obligatoire en Vue 3

---
layout: exercices
---

# Question 2 / 10

### Qu'est-ce qu'un composable en Vue.js ?

- A) Un type de composant
- B) Une fonction reutilisable utilisant la Composition API
- C) Un plugin Vue
- D) Un mixin

---
layout: exercices
---

# Question 3 / 10

### Quel hook remplace `created` en Composition API ?

- A) `onCreated()`
- B) `useCreated()`
- C) Aucun, le code dans `<script setup>` s'execute au meme moment
- D) `onMounted()`

---
layout: exercices
---

# Question 4 / 10

### Quel est le prefixe conventionnel pour les composables ?

- A) `get`
- B) `use`
- C) `create`
- D) `with`

---
layout: exercices
---

# Question 5 / 10

### Quelle bibliotheque offre +200 composables prets à l'emploi ?

- A) Vue Composition Utils
- B) VueUse
- C) Vue Helpers
- D) Composables.js

---
layout: exercices
---

# Question 6 / 10

### Comment acceder à un element DOM en Composition API ?

- A) `this.$refs.element`
- B) `document.querySelector()`
- C) `ref()` avec le meme nom que l'attribut `ref`
- D) `useRef()`

---
layout: exercices
---

# Question 7 / 10

### Quel est l'equivalent de `mounted` en Composition API ?

- A) `useMounted()`
- B) `onMounted()`
- C) `whenMounted()`
- D) `afterMount()`

---
layout: exercices
---

# Question 8 / 10

### Que doit retourner un composable ?

- A) Un tableau
- B) Une Promise
- C) Un objet avec des refs/methodes
- D) Une string

---
layout: exercices
---

# Question 9 / 10

### Pourquoi nettoyer les effets dans `onUnmounted` ?

- A) Pour liberer la memoire et eviter les fuites
- B) Pour accelerer le rendu
- C) C'est obligatoire en Vue 3
- D) Pour les tests

---
layout: exercices
---

# Question 10 / 10

### Peut-on utiliser Options API et Composition API dans le meme projet ?

- A) Non, il faut choisir
- B) Oui, dans des composants separes
- C) Oui, dans le meme composant
- D) Uniquement en mode developpement

---
layout: exercices
---

# 📝 Corrections - QCM Module 4

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **B** | Organisation par fonctionnalite vs par type |
| 2 | **B** | Fonction reutilisable avec Composition API |
| 3 | **C** | Le code setup() s'execute au moment de created |
| 4 | **B** | Convention: prefixe `use` (useCounter, useFetch) |
| 5 | **B** | VueUse (vueuse.org) +200 composables |
| 6 | **C** | `ref()` avec nom identique à l'attribut ref |
| 7 | **B** | `onMounted()` depuis vue |
| 8 | **C** | Retourne un objet (pas un tableau) |
| 9 | **A** | Nettoyer pour eviter les memory leaks |
| 10 | **B** | Oui, mixte possible dans differents composants |

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 4 !

Passons aux exercices pratiques ! 🚀
