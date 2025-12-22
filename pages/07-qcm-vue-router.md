---
layout: new-section
---

# QCM - Module 7 : Vue Router 4 ✅

Testons tes connaissances sur le routage !

---
layout: exercices
---

# Question 1 🤔

### Quel composant affiche le composant correspondant à la route active ?

<v-clicks>

- A) `<Router />`
- B) `<RouterView />` ✅
- C) `<RouteComponent />`
- D) `<ViewRouter />`

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) `<RouterView />`**

`<RouterView />` est le placeholder où Vue Router affiche le composant de la route courante.

---
layout: exercices
---

# Question 2 🤔

### Comment définir un paramètre dynamique dans une route ?

<v-clicks>

- A) `/user/{id}`
- B) `/user/:id` ✅
- C) `/user/$id`
- D) `/user/[id]`

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**B) `/user/:id`**

Les paramètres dynamiques sont préfixés par `:`. Exemple : `/user/:id` match `/user/42`.

---
layout: exercices
---

# Question 3 🤔

### Quelle fonction permet de naviguer programmatiquement ?

<v-clicks>

- A) `useRoute().push()`
- B) `useRouter().push()` ✅
- C) `navigate()`
- D) `goTo()`

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**B) `useRouter().push()`**

`useRouter()` retourne l'instance du router avec les méthodes de navigation (`push`, `replace`, `go`, `back`).

---
layout: exercices
---

# Question 4 🤔

### Quelle est la différence entre `push()` et `replace()` ?

<v-clicks>

- A) Aucune différence
- B) `replace()` ne crée pas d'entrée dans l'historique ✅
- C) `push()` est plus rapide
- D) `replace()` recharge la page

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) `replace()` ne crée pas d'entrée dans l'historique**

Avec `replace()`, le bouton "Retour" ne reviendra pas à la page précédente car elle n'est pas ajoutée à l'historique.

---
layout: exercices
---

# Question 5 🤔

### Comment créer une route 404 catch-all ?

<v-clicks>

- A) `path: '*'`
- B) `path: '/404'`
- C) `path: '/:pathMatch(.*)*'` ✅
- D) `path: '/**'`

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**C) `path: '/:pathMatch(.*)*'`**

C'est la syntaxe Vue Router 4 pour matcher toutes les routes non définies. Le `*` final permet les sous-chemins.

---
layout: exercices
---

# Question 6 🤔

### Comment protéger une route avec authentification ?

<v-clicks>

- A) Avec `meta.auth`
- B) Avec un guard `beforeEach` ✅
- C) Avec `route.protected`
- D) Avec `RouterGuard`

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**B) Avec un guard `beforeEach`**

```ts
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    return { name: 'login' }
  }
})
```

---
layout: exercices
---

# Question 7 🤔

### Comment activer le lazy loading d'une route ?

<v-clicks>

- A) `lazy: true`
- B) `component: () => import('./View.vue')` ✅
- C) `lazyComponent: View`
- D) `async component: View`

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**B) `component: () => import('./View.vue')`**

L'import dynamique crée un chunk séparé, chargé uniquement quand la route est visitée.

---
layout: exercices
---

# Question 8 🤔

### Où placer `<RouterView />` pour des routes imbriquées ?

<v-clicks>

- A) Dans App.vue uniquement
- B) Dans le composant parent de la route ✅
- C) Dans main.ts
- D) Nulle part, c'est automatique

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**B) Dans le composant parent de la route**

Pour les routes enfants, le parent doit avoir un `<RouterView />` où les enfants s'afficheront.

---
layout: exercices
---

# Question 9 🤔

### Quelle propriété de route permet de stocker des données personnalisées ?

<v-clicks>

- A) `data`
- B) `meta` ✅
- C) `props`
- D) `custom`

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**B) `meta`**

```ts
{
  path: '/admin',
  meta: { requiresAuth: true, title: 'Admin' }
}
```

---
layout: exercices
---

# Question 10 🤔

### Quel hook permet de réagir quand les params changent (même composant) ?

<v-clicks>

- A) `onMounted`
- B) `onBeforeRouteUpdate` ✅
- C) `onParamsChange`
- D) `watch(route)`

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**B) `onBeforeRouteUpdate`**

Ce hook est appelé quand la route change mais utilise le même composant (ex: `/user/1` → `/user/2`).

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 7 !

Passons aux exercices pratiques ! 🚀

