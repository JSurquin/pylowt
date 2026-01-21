---
layout: new-section
---

# QCM Module 5
## Vue Router

---

# Question 1 - Installation

Comment installer Vue Router 4 ?

A. `npm install vue-router`
B. `npm install vue-router@4`
C. `npm install router`
D. `npm install @vue/router`

**Réponse:** B

---

# Question 2 - RouterView

À quoi sert `<RouterView />` ?

A. Afficher les liens de navigation
B. Afficher le composant correspondant à la route
C. Créer une route
D. Naviguer entre les pages

**Réponse:** B

---

# Question 3 - RouterLink

Comment créer un lien de navigation ?

A. `<a href="/about">About</a>`
B. `<Link to="/about">About</Link>`
C. `<RouterLink to="/about">About</RouterLink>`
D. `<router to="/about">About</router>`

**Réponse:** C

---

# Question 4 - Routes dynamiques

Quelle syntaxe pour une route dynamique ?

A. `/user/{id}`
B. `/user/:id`
C. `/user/$id`
D. `/user/[id]`

**Réponse:** B

---

# Question 5 - Navigation programmatique

Comment naviguer vers une route en JavaScript ?

A. `router.navigate('/path')`
B. `router.go('/path')`
C. `router.push('/path')`
D. `router.route('/path')`

**Réponse:** C

---

# Question 6 - Lazy Loading

Quelle syntaxe pour le lazy loading ?

A. `component: Home`
B. `component: () => import('./Home.vue')`
C. `component: lazy(Home)`
D. `component: async Home`

**Réponse:** B

---

# Question 7 - Guards

Quel guard s'exécute avant chaque navigation ?

A. `router.onBefore()`
B. `router.beforeEach()`
C. `router.guard()`
D. `router.before()`

**Réponse:** B

---

# Question 8 - 404

Comment créer une route 404 ?

A. `path: '/404'`
B. `path: '*'`
C. `path: '/:pathMatch(.*)*'`
D. `path: '/not-found'`

**Réponse:** C

---

# Question 9 - Mode history

Quel mode évite le # dans l'URL ?

A. `createWebHashHistory()`
B. `createWebHistory()`
C. `createHistory()`
D. `createBrowserHistory()`

**Réponse:** B

---

# Question 10 - Routes imbriquées

Comment définir des routes imbriquées ?

A. `nested: []`
B. `routes: []`
C. `children: []`
D. `sub: []`

**Réponse:** C

---

# Réponses - QCM Module 5

<div class="grid grid-cols-2 gap-4">

<div>

**Question 1:** B - `npm install vue-router@4`

**Question 2:** B - Afficher le composant correspondant à la route

**Question 3:** C - `<RouterLink to="/about">About</RouterLink>`

**Question 4:** B - `/user/:id`

**Question 5:** C - `router.push('/path')`

</div>

<div>

**Question 6:** B - `component: () => import('./Home.vue')`

**Question 7:** B - `router.beforeEach()`

**Question 8:** C - `path: '/:pathMatch(.*)*'`

**Question 9:** B - `createWebHistory()`

**Question 10:** C - `children: []`

</div>

</div>
