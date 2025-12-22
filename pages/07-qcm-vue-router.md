---
layout: new-section
---

# QCM - Module 7 : Vue Router 4 ✅

Testons tes connaissances sur Vue Router !

10 questions - Note tes réponses, les corrections sont à la fin.

---
layout: exercices
---

# Question 1 / 10

### Quel composant affiche le contenu des routes ?

- A) `<router-view>`
- B) `<router-content>`
- C) `<route-outlet>`
- D) `<view>`

---
layout: exercices
---

# Question 2 / 10

### Comment creer un lien vers une route ?

- A) `<a href="/about">`
- B) `<router-link to="/about">`
- C) `<link to="/about">`
- D) `<vue-link to="/about">`

---
layout: exercices
---

# Question 3 / 10

### Comment acceder aux parametres de route (ex: `/user/:id`) ?

- A) `this.$route.params.id`
- B) `useRoute().params.id`
- C) `route.params.id` (avec useRoute)
- D) Toutes les reponses B et C

---
layout: exercices
---

# Question 4 / 10

### Comment naviguer programmatiquement ?

- A) `window.location.href`
- B) `router.push('/about')`
- C) `navigate('/about')`
- D) `goto('/about')`

---
layout: exercices
---

# Question 5 / 10

### Quelle est la difference entre push et replace ?

- A) push est plus rapide
- B) replace n'ajoute pas d'entree dans l'historique
- C) push accepte des objets
- D) Il n'y a pas de difference

---
layout: exercices
---

# Question 6 / 10

### À quoi sert un guard `beforeEach` ?

- A) Charger des donnees
- B) Executer du code avant chaque navigation
- C) Valider les formulaires
- D) Optimiser les performances

---
layout: exercices
---

# Question 7 / 10

### Comment creer des routes imbriquees ?

- A) `path: /parent/child`
- B) Propriete `children: [...]`
- C) `nested: true`
- D) `routes.push(child)`

---
layout: exercices
---

# Question 8 / 10

### Comment faire du lazy loading de routes ?

- A) `component: () => import('./View.vue')`
- B) `lazy: true`
- C) `defer: './View.vue'`
- D) `async: './View.vue'`

---
layout: exercices
---

# Question 9 / 10

### Que faire pour rediriger vers /login si non authentifie ?

- A) `redirect: '/login'` dans la route
- B) Guard `beforeEach` qui verifie auth
- C) `if (!auth) router.push('/login')`
- D) Toutes ces reponses marchent

---
layout: exercices
---

# Question 10 / 10

### Comment acceder aux query params (ex: `?search=vue`) ?

- A) `route.params.search`
- B) `route.query.search`
- C) `route.search.search`
- D) `route.qs.search`

---
layout: exercices
---

# 📝 Corrections - QCM Module 7

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **A** | `<router-view>` affiche le composant de la route active |
| 2 | **B** | `<router-link>` cree un lien avec navigation SPA |
| 3 | **D** | En Composition API: `useRoute().params.id` |
| 4 | **B** | `router.push()` ou `router.replace()` |
| 5 | **B** | replace ne garde pas dans l'historique |
| 6 | **B** | beforeEach s'execute avant chaque navigation (auth, logs) |
| 7 | **B** | Propriete `children` dans la config de route |
| 8 | **A** | Fonction flechee avec import dynamique |
| 9 | **D** | Toutes ces approches fonctionnent (B recommandee) |
| 10 | **B** | `route.query` pour les parametres URL |

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 7 !

Passons aux exercices pratiques ! 🚀
