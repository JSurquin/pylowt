---
layout: new-section
---

# QCM - Module 8 : Pinia ✅

Testons tes connaissances sur le state management !

---
layout: exercices
---

# Question 1 🤔

### Qu'est-ce que Pinia ?

<v-clicks>

- A) Un framework CSS
- B) Le state manager officiel de Vue 3 ✅
- C) Un bundler
- D) Un test runner

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) Le state manager officiel de Vue 3**

Pinia est le successeur de Vuex et le gestionnaire d'état recommandé pour les applications Vue 3.

---
layout: exercices
---

# Question 2 🤔

### Comment créer un store Pinia ?

<v-clicks>

- A) `new Store()`
- B) `createStore()`
- C) `defineStore()` ✅
- D) `useStore()`

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**C) `defineStore()`**

```ts
export const useCounterStore = defineStore('counter', () => {
  // ...
})
```

---
layout: exercices
---

# Question 3 🤔

### Quelle fonction utiliser pour garder la réactivité lors de la destructuration ?

<v-clicks>

- A) `toRefs()`
- B) `storeToRefs()` ✅
- C) `reactive()`
- D) `keepReactive()`

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**B) `storeToRefs()`**

```js
const { count, doubled } = storeToRefs(store)
```

Les actions n'en ont pas besoin, seulement le state et getters.

---
layout: exercices
---

# Question 4 🤔

### Dans Pinia, les mutations sont-elles obligatoires comme dans Vuex ?

<v-clicks>

- A) Oui, toujours
- B) Non, on peut modifier le state directement ✅
- C) Seulement en production
- D) Seulement avec TypeScript

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) Non, on peut modifier le state directement**

```ts
store.count++  // ✅ Valide dans Pinia !
```

Pinia simplifie Vuex en supprimant l'obligation des mutations.

---
layout: exercices
---

# Question 5 🤔

### Comment appeler un store depuis un autre store ?

<v-clicks>

- A) `this.$store`
- B) Utiliser le composable du store directement ✅
- C) `getStore()`
- D) Ce n'est pas possible

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**B) Utiliser le composable du store directement**

```ts
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  // Utiliser userStore...
})
```

---
layout: exercices
---

# Question 6 🤔

### Que fait `$patch` ?

<v-clicks>

- A) Met à jour le serveur
- B) Applique plusieurs modifications au state en une fois ✅
- C) Annule la dernière modification
- D) Clone le store

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**B) Applique plusieurs modifications au state en une fois**

```ts
store.$patch({
  count: 10,
  user: { name: 'John' }
})
```

---
layout: exercices
---

# Question 7 🤔

### Quel outil permet de débugger Pinia ?

<v-clicks>

- A) React DevTools
- B) Vue DevTools ✅
- C) Redux DevTools
- D) Pinia Inspector

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**B) Vue DevTools**

Vue DevTools a un onglet Pinia intégré pour voir l'état, la timeline des actions, et même modifier le state en temps réel.

---
layout: exercices
---

# Question 8 🤔

### Quelle est la syntaxe recommandée pour définir un store ?

<v-clicks>

- A) Options (comme Vuex)
- B) Setup (comme Composition API) ✅
- C) Class-based
- D) Aucune préférence

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**B) Setup (comme Composition API)**

La syntaxe Setup offre plus de flexibilité, un meilleur support TypeScript, et s'aligne avec les composables Vue.

---
layout: exercices
---

# Question 9 🤔

### Comment persister un store dans localStorage ?

<v-clicks>

- A) `persist: true` dans le store
- B) Utiliser `$subscribe` ou un plugin ✅
- C) `localStorage.store()`
- D) C'est automatique

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**B) Utiliser `$subscribe` ou un plugin**

```ts
store.$subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state))
})
```

Ou utiliser `pinia-plugin-persistedstate`.

---
layout: exercices
---

# Question 10 🤔

### Quel est le premier argument de `defineStore` ?

<v-clicks>

- A) Le state initial
- B) L'identifiant unique du store ✅
- C) Les options
- D) Le type TypeScript

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**B) L'identifiant unique du store**

```ts
defineStore('counter', () => { ... })
//          ^^^^^^^^^ ID unique
```

Cet ID est utilisé par DevTools et pour la persistance.

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 8 !

Passons aux exercices pratiques ! 🚀

