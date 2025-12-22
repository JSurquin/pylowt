---
layout: new-section
---

# QCM - Module 4 : Composition API ✅

Testons tes connaissances sur la Composition API !

---
layout: exercices
---

# Question 1 🤔

### Quel est l'avantage principal de la Composition API sur l'Options API ?

<v-clicks>

- A) Elle est plus rapide
- B) Elle organise le code par fonctionnalité ✅
- C) Elle utilise moins de mémoire
- D) Elle est obligatoire en Vue 3

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) Elle organise le code par fonctionnalité**

Avec la Composition API, tout le code lié à une même fonctionnalité est regroupé, contrairement à l'Options API où il est dispersé entre data, methods, computed, etc.

---
layout: exercices
---

# Question 2 🤔

### Qu'est-ce qu'un composable en Vue.js ?

<v-clicks>

- A) Un type de composant
- B) Une fonction réutilisable utilisant la Composition API ✅
- C) Un plugin Vue
- D) Un mixin

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**B) Une fonction réutilisable utilisant la Composition API**

Un composable (préfixé par `use`) encapsule de la logique réactive réutilisable et retourne de l'état et/ou des méthodes.

---
layout: exercices
---

# Question 3 🤔

### Quel hook remplace `created` en Composition API ?

<v-clicks>

- A) `onCreated()`
- B) `useCreated()`
- C) Aucun, le code dans `<script setup>` s'exécute au même moment ✅
- D) `onMounted()`

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**C) Aucun, le code dans `<script setup>` s'exécute au même moment**

Le code au niveau supérieur de `<script setup>` s'exécute lors de la création du composant, rendant `beforeCreate` et `created` inutiles.

---
layout: exercices
---

# Question 4 🤔

### Quel est le préfixe conventionnel pour les composables ?

<v-clicks>

- A) `get`
- B) `use` ✅
- C) `create`
- D) `with`

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) `use`**

Par convention (inspirée de React hooks), les composables sont préfixés par `use` : `useCounter`, `useFetch`, `useLocalStorage`, etc.

---
layout: exercices
---

# Question 5 🤔

### Quelle bibliothèque offre +200 composables prêts à l'emploi ?

<v-clicks>

- A) Vue Composition Utils
- B) VueUse ✅
- C) Vue Helpers
- D) Composables.js

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**B) VueUse**

VueUse (vueuse.org) est la bibliothèque de référence pour les composables Vue.js, avec des utilitaires pour le DOM, les sensors, le state, etc.

---
layout: exercices
---

# Question 6 🤔

### Comment accéder à un élément DOM en Composition API ?

<v-clicks>

- A) `this.$refs.element`
- B) `document.querySelector()`
- C) `ref()` avec le même nom que l'attribut `ref` ✅
- D) `useRef()`

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**C) `ref()` avec le même nom que l'attribut `ref`**

```vue
<script setup>
const inputRef = ref(null)
</script>
<template>
  <input ref="inputRef" />
</template>
```

---
layout: exercices
---

# Question 7 🤔

### Quel est l'équivalent de `mounted` en Composition API ?

<v-clicks>

- A) `useMounted()`
- B) `onMounted()` ✅
- C) `whenMounted()`
- D) `afterMount()`

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**B) `onMounted()`**

```js
import { onMounted } from 'vue'

onMounted(() => {
  console.log('Composant monté !')
})
```

---
layout: exercices
---

# Question 8 🤔

### Que doit retourner un composable ?

<v-clicks>

- A) Un tableau
- B) Une Promise
- C) Un objet avec des refs/méthodes ✅
- D) Une string

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**C) Un objet avec des refs/méthodes**

```js
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  
  return { count, increment } // Objet !
}
```

---
layout: exercices
---

# Question 9 🤔

### Pourquoi nettoyer les effets dans `onUnmounted` ?

<v-clicks>

- A) Pour libérer la mémoire et éviter les fuites ✅
- B) Pour accélérer le rendu
- C) C'est obligatoire en Vue 3
- D) Pour les tests

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**A) Pour libérer la mémoire et éviter les fuites**

Les event listeners, intervals, ou souscriptions doivent être nettoyés quand le composant est détruit pour éviter les memory leaks.

---
layout: exercices
---

# Question 10 🤔

### Peut-on utiliser Options API et Composition API dans le même projet ?

<v-clicks>

- A) Non, il faut choisir
- B) Oui, dans des composants séparés ✅
- C) Oui, dans le même composant
- D) Uniquement en mode développement

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**B) Oui, dans des composants séparés**

Vue 3 supporte les deux API. Tu peux avoir des composants en Options API et d'autres en Composition API dans le même projet.

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 5 !

Passons aux exercices pratiques ! 🚀

