---
layout: new-section
---

# QCM Module 4
## State Management avec Pinia

---

# Question 1

Qu'est-ce que Pinia ?

A. Un router pour Vue.js
B. Un gestionnaire d'état pour Vue.js
C. Une bibliothèque de composants
D. Un framework CSS

**Réponse:** B

---

# Question 2

Comment installer Pinia ?

A. `npm install vue-store`
B. `npm install @vue/store`
C. `npm install pinia`
D. `npm install state`

**Réponse:** C

---

# Question 3

Quelle syntaxe pour créer un store ?

A. `createStore('name')`
B. `defineStore('name')`
C. `newStore('name')`
D. `makeStore('name')`

**Réponse:** B

---

# Question 4

Comment accéder au state d'un store ?

A. `store.$state.value`
B. `store.state.value`
C. `store.value`
D. Directement `store.myProperty`

**Réponse:** D

---

# Question 5

Qu'est-ce qu'un getter dans Pinia ?

A. Une action
B. Une propriété calculée
C. Un state
D. Un événement

**Réponse:** B

---

# Question 6

Les actions peuvent-elles être asynchrones ?

A. Non, jamais
B. Oui, avec async/await
C. Non, seulement des opérations synchrones
D. Seulement en Options API

**Réponse:** B

---

# Question 7

Pinia nécessite-t-il des mutations ?

A. Oui, toujours
B. Non, mutation directe du state autorisée
C. Seulement en production
D. Seulement avec TypeScript

**Réponse:** B

---

# Question 8

Comment garder la réactivité lors du destructuring ?

A. `const { value } = store`
B. `const { value } = toRefs(store)`
C. `const { value } = storeToRefs(store)`
D. Pas possible

**Réponse:** C

---

# Question 9

Comment persister un store dans localStorage ?

A. Automatiquement
B. Avec watch + localStorage
C. Avec un plugin Pinia
D. B et C

**Réponse:** D

---

# Question 10

Peut-on utiliser un store dans un autre store ?

A. Non
B. Oui, en l'important
C. Seulement avec Options API
D. Seulement en développement

**Réponse:** B

---

# Réponses - QCM Module 4

<div class="grid grid-cols-2 gap-4">

<div>

**Question 1:** B - Un gestionnaire d'état pour Vue.js

**Question 2:** C - `npm install pinia`

**Question 3:** B - `defineStore('name')`

**Question 4:** D - Directement `store.myProperty`

**Question 5:** B - Une propriété calculée

</div>

<div>

**Question 6:** B - Oui, avec async/await

**Question 7:** B - Non, mutation directe du state autorisée

**Question 8:** C - `const { value } = storeToRefs(store)`

**Question 9:** D - B et C

**Question 10:** B - Oui, en l'important

</div>

</div>
