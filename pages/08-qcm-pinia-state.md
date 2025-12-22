---

# QCM - Module 8 : Pinia - State Management ✅

Testons tes connaissances sur Pinia !

10 questions - Note tes réponses, les corrections sont à la fin.

---

# Question 1 / 10

### Pourquoi Pinia a-t-il remplace Vuex ?

- A) Plus rapide
- B) Plus simple, meilleur TypeScript
- C) Plus de fonctionnalites
- D) Obligation de Vue 3

---

# Question 2 / 10

### Comment creer un store avec Pinia ?

- A) `createStore()`
- B) `defineStore()`
- C) `newStore()`
- D) `useStore()`

---

# Question 3 / 10

### Quels sont les 3 concepts d'un store Pinia ?

- A) data, methods, computed
- B) state, getters, actions
- C) props, emits, slots
- D) refs, reactive, computed

---

# Question 4 / 10

### Pourquoi utiliser storeToRefs() ?

- A) Pour creer un store
- B) Pour garder la reactivite lors de la destructuration
- C) Pour lier à un template
- D) Pour valider les types

---

# Question 5 / 10

### Les mutations existent-elles dans Pinia ?

- A) Oui, obligatoires
- B) Oui, mais optionnelles
- C) Non, on modifie directement le state
- D) Non, on utilise setters

---

# Question 6 / 10

### Comment acceder au state d'un autre store dans une action ?

- A) `this.otherStore.state`
- B) Importer et utiliser le store directement
- C) `getStore('other')`
- D) Ce n'est pas possible

---

# Question 7 / 10

### Comment persister un store dans le localStorage ?

- A) Pinia le fait automatiquement
- B) Plugin pinia-plugin-persistedstate
- C) `persist: true` dans le store
- D) watch() + localStorage

---

# Question 8 / 10

### Les getters sont-ils mis en cache ?

- A) Non, recalcules à chaque acces
- B) Oui, comme les computed
- C) Seulement en production
- D) Depends de la config

---

# Question 9 / 10

### Comment resettre un store à son etat initial ?

- A) `store.reset()`
- B) `store.$reset()`
- C) `resetStore(store)`
- D) `store.clear()`

---

# Question 10 / 10

### Peut-on utiliser Pinia en dehors de composants Vue ?

- A) Non, impossible
- B) Oui, avec useStore() après createPinia()
- C) Oui, mais seulement en SSR
- D) Non, sauf dans les composables

---

# 📝 Corrections - QCM Module 8

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **B** | API plus simple, TypeScript natif, pas de mutations |
| 2 | **B** | `defineStore('name', {...})` |
| 3 | **B** | state (donnees), getters (computed), actions (methodes) |
| 4 | **B** | Preserve la reactivite lors du destructuring |
| 5 | **C** | Pas de mutations, modification directe OK |
| 6 | **B** | Import direct: `const other = useOtherStore()` |
| 7 | **B** | pinia-plugin-persistedstate ou custom |
| 8 | **B** | Getters = computed, donc mis en cache |
| 9 | **B** | `store.$reset()` remet aux valeurs initiales |
| 10 | **B** | Oui, dans router guards, utils, etc. |

---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 8 !

Passons aux exercices pratiques ! 🚀
