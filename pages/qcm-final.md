---
layout: new-section
routeAlias: 'qcm-final'
---

# QCM Final
## Validation de la formation Vue.js 3

---

# Question 1 - Réactivité

Quelle fonction pour créer une référence réactive ?

A. `reactive()`
B. `ref()`
C. `computed()`
D. `watch()`

**Réponse:** B

---

# Question 2 - Computed

Quelle est la différence entre computed et method ?

A. Aucune différence
B. Computed est mis en cache
C. Method est plus rapide
D. Computed ne peut pas être async

**Réponse:** B

---

# Question 3 - v-model

Que fait v-model ?

A. Affiche une valeur
B. Crée une liaison bidirectionnelle
C. Boucle sur un tableau
D. Écoute un événement

**Réponse:** B

---

# Question 4 - Props

Comment passer une prop ?

A. `<Component prop="value" />`
B. `<Component :prop="value" />`
C. `<Component @prop="value" />`
D. A et B selon le type

**Réponse:** D

---

# Question 5 - Emit

Comment émettre un événement ?

A. `emit('event', data)`
B. `$emit('event', data)`
C. `this.emit('event', data)`
D. A (avec defineEmits)

**Réponse:** D

---

# Question 6 - Slots

À quoi servent les slots ?

A. Passer du contenu HTML au composant
B. Stocker des données
C. Gérer les événements
D. Créer des animations

**Réponse:** A

---

# Question 7 - Scoped Slots

Les scoped slots permettent :

A. De limiter la portée du CSS
B. De passer des données de l'enfant au parent
C. De créer des slots privés
D. D'améliorer les performances

**Réponse:** B

---

# Question 8 - Directives

Quelle directive pour le rendu conditionnel ?

A. `v-show`
B. `v-if`
C. `v-display`
D. A et B

**Réponse:** D

---

# Question 9 - Lifecycle

Quel hook pour faire un appel API ?

A. `onCreated`
B. `onMounted`
C. `onBeforeMount`
D. `setup`

**Réponse:** B

---

# Question 10 - Composables

À quoi servent les composables ?

A. Créer des composants
B. Réutiliser de la logique
C. Gérer le routing
D. Styliser les composants

**Réponse:** B

---

# Question 11 - Pinia

Pinia est :

A. Un router
B. Un gestionnaire d'état
C. Un test runner
D. Un bundler

**Réponse:** B

---

# Question 12 - Store Pinia

Comment accéder au state d'un store ?

A. `store.state.value`
B. `store.$state.value`
C. `store.value`
D. Directement les propriétés

**Réponse:** D

---

# Question 13 - Actions Pinia

Les actions peuvent-elles être async ?

A. Non
B. Oui
C. Seulement avec un plugin
D. Seulement en Options API

**Réponse:** B

---

# Question 14 - Vue Router

Comment créer un lien de navigation ?

A. `<a href="/path">Link</a>`
B. `<RouterLink to="/path">Link</RouterLink>`
C. `<Link href="/path">Link</Link>`
D. `<router-link to="/path">Link</router-link>`

**Réponse:** B

---

# Question 15 - Routes dynamiques

Syntaxe pour une route dynamique ?

A. `/user/{id}`
B. `/user/:id`
C. `/user/$id`
D. `/user/[id]`

**Réponse:** B

---

# Question 16 - Navigation programmatique

Comment naviguer en JavaScript ?

A. `router.navigate('/path')`
B. `router.push('/path')`
C. `router.go('/path')`
D. `window.location = '/path'`

**Réponse:** B

---

# Question 17 - Guards

`beforeEach` est :

A. Un lifecycle hook
B. Un guard de navigation
C. Une action Pinia
D. Une directive

**Réponse:** B

---

# Question 18 - Lazy Loading

Comment faire du lazy loading ?

A. `component: Home`
B. `component: () => import('./Home.vue')`
C. `component: lazy(Home)`
D. `component: async Home`

**Réponse:** B

---

# Question 19 - Vitest

Vitest est :

A. Un router
B. Un gestionnaire d'état
C. Un framework de test
D. Un bundler

**Réponse:** C

---

# Question 20 - Tests composants

Comment monter un composant pour le tester ?

A. `render(Component)`
B. `mount(Component)`
C. `create(Component)`
D. `new Component()`

**Réponse:** B

---

# Question 21 - TypeScript

Comment typer des props ?

A. `defineProps<{ nom: string }>()`
B. `defineProps({ nom: String })`
C. A et B
D. TypeScript pas supporté

**Réponse:** C

---

# Question 22 - SFC

Que signifie SFC ?

A. Super Fast Component
B. Single File Component
C. Simple Function Component
D. State Full Component

**Réponse:** B

---

# Question 23 - Scoped CSS

`<style scoped>` limite le CSS :

A. Globalement
B. Au composant actuel
C. Aux composants enfants
D. N'a aucun effet

**Réponse:** B

---

# Question 24 - Directives personnalisées

Comment créer une directive ?

A. `app.directive('name', {})`
B. `Vue.directive('name', {})`
C. `defineDirective('name', {})`
D. `createDirective('name', {})`

**Réponse:** A

---

# Question 25 - Provide/Inject

À quoi sert provide/inject ?

A. Tester les composants
B. Passer des données sans props drilling
C. Gérer le routing
D. Créer des animations

**Réponse:** B

---

# Réponses - QCM Final

<div class="grid grid-cols-3 gap-2 text-sm">

<div>

**Q1:** B - `ref()`

**Q2:** B - Computed est mis en cache

**Q3:** B - Crée une liaison bidirectionnelle

**Q4:** D - A et B selon le type

**Q5:** D - A (avec defineEmits)

**Q6:** A - Passer du contenu HTML

**Q7:** B - Passer des données enfant→parent

**Q8:** D - A et B

**Q9:** B - `onMounted`

</div>

<div>

**Q10:** B - Réutiliser de la logique

**Q11:** B - Un gestionnaire d'état

**Q12:** D - Directement les propriétés

**Q13:** B - Oui

**Q14:** B - `<RouterLink to="/path">`

**Q15:** B - `/user/:id`

**Q16:** B - `router.push('/path')`

**Q17:** B - Un guard de navigation

</div>

<div>

**Q18:** B - `() => import('./Home.vue')`

**Q19:** C - Un framework de test

**Q20:** B - `mount(Component)`

**Q21:** C - A et B

**Q22:** B - Single File Component

**Q23:** B - Au composant actuel

**Q24:** A - `app.directive('name', {})`

**Q25:** B - Passer données sans props drilling

</div>

</div>

---

# Félicitations ! 🎉

Vous avez terminé la formation Vue.js 3 !

### Prochaines étapes

- 🚀 Développer votre projet personnel
- 📚 Approfondir avec la documentation officielle
- 👥 Contribuer à l'open source
- 🎓 Continuer à apprendre (Nuxt.js, Testing avancé...)
- 💼 Postuler pour des postes Vue.js

### Ressources

- [Vue.js Documentation](https://vuejs.org/)
- [Vue School](https://vueschool.io/)
- [Vue Mastery](https://www.vuemastery.com/)
- [Awesome Vue](https://github.com/vuejs/awesome-vue)
