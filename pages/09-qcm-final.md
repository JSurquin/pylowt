---
layout: new-section
---

# QCM Final - Formation Vue.js 3 ✅

Le grand test final ! Questions sur l'ensemble de la formation.

15 questions - Note tes réponses, les corrections sont à la fin.

---
layout: exercices
---

# Question 1 / 15

### Quelle syntaxe permet de creer un computed property en Composition API ?

- A) `const result = computed(() => ...)`
- B) `const result = ref().computed(() => ...)`
- C) `const result = useComputed(() => ...)`
- D) `const result = reactive({ computed: ... })`

---
layout: exercices
---

# Question 2 / 15

### Comment appliquer conditionnellement des classes CSS ?

- A) `:class="{ active: isActive }"`
- B) `class="{{ isActive ? 'active' : '' }}"`
- C) `v-class="isActive ? 'active'"`
- D) `:className="{ active: isActive }"`

---
layout: exercices
---

# Question 3 / 15

### Que signifie SFC (Single File Component) ?

- A) Super Fast Component
- B) Composant dans un seul fichier .vue
- C) Simple Functional Component
- D) Static File Content

---
layout: exercices
---

# Question 4 / 15

### Comment observer une prop dans un composant ?

- A) `watch(() => props.value, callback)`
- B) `watchEffect(() => props.value)`
- C) Les deux A et B fonctionnent
- D) On ne peut pas observer les props

---
layout: exercices
---

# Question 5 / 15

### Quel est le role de `<Suspense>` ?

- A) Arreter le rendu
- B) Gerer les composants asynchrones avec fallback
- C) Suspendre les animations
- D) Mettre en pause les watchers

---
layout: exercices
---

# Question 6 / 15

### Comment definir des types TypeScript pour les emits ?

- A) `defineEmits(['event'])`
- B) `defineEmits<{ (e: 'event'): void }>()`
- C) `defineEmits({ event: String })`
- D) `const emits: EmitType`

---
layout: exercices
---

# Question 7 / 15

### Quelle plateforme est recommandee pour deployer une app Vue.js gratuitement ?

- A) AWS EC2
- B) Vercel ou Netlify
- C) DigitalOcean
- D) Heroku

---
layout: exercices
---

# Question 8 / 15

### Comment tester un composant Vue avec Vitest ?

- A) `mount(Component)` de @vue/test-utils
- B) `render(Component)` de @testing-library/vue
- C) Les deux sont possibles
- D) On ne peut pas tester avec Vitest

---
layout: exercices
---

# Question 9 / 15

### Quel est l'avantage de `shallowMount` vs `mount` ?

- A) Plus rapide
- B) Ne monte pas les composants enfants
- C) Tests plus isoles
- D) Toutes ces reponses

---
layout: exercices
---

# Question 10 / 15

### Comment creer un middleware de navigation dans Vue Router ?

- A) `router.use(middleware)`
- B) `router.beforeEach((to, from, next) => ...)`
- C) `router.middleware(handler)`
- D) `app.use(navigation, middleware)`

---
layout: exercices
---

# Question 11 / 15

### Que fait `nextTick()` ?

- A) Passe à la route suivante
- B) Attend la prochaine mise à jour du DOM
- C) Execute dans 1 seconde
- D) Increment un compteur

---
layout: exercices
---

# Question 12 / 15

### Comment structurer un gros projet Vue.js ?

- A) Tout dans src/
- B) Feature-based (par fonctionnalite)
- C) Layer-based (components, views, stores)
- D) B ou C selon preference

---
layout: exercices
---

# Question 13 / 15

### Quelle est la convention pour nommer un composable ?

- A) PascalCase (UseCounter)
- B) camelCase avec prefixe use (useCounter)
- C) kebab-case (use-counter)
- D) Pas de convention

---
layout: exercices
---

# Question 14 / 15

### Comment prevenir le re-render inutile d'un composant enfant ?

- A) `v-once`
- B) `v-memo`
- C) `shouldUpdate`
- D) `React.memo` (ca n'existe pas en Vue)

---
layout: exercices
---

# Question 15 / 15

### Quel fichier configure les imports auto en Vue 3 avec Vite ?

- A) auto-imports.d.ts
- B) vite.config.ts avec unplugin-auto-import
- C) tsconfig.json
- D) vue.config.js

---
layout: exercices
---

# 📝 Corrections - QCM Final

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **A** | `computed(() => ...)` depuis vue |
| 2 | **A** | `:class="{ className: condition }"` |
| 3 | **B** | Single File Component = .vue avec script/template/style |
| 4 | **C** | Les deux syntaxes fonctionnent |
| 5 | **B** | Suspense gere les composants async (loading states) |
| 6 | **B** | Generics TypeScript pour types stricts |
| 7 | **B** | Vercel/Netlify offre deploiement gratuit + CI/CD |
| 8 | **C** | @vue/test-utils ou @testing-library/vue |
| 9 | **D** | Plus rapide, isole, n'affecte pas enfants |
| 10 | **B** | beforeEach est le guard global principal |
| 11 | **B** | Attend la prochaine mise à jour du DOM |
| 12 | **D** | Feature-based ou Layer-based selon projet |
| 13 | **B** | camelCase + prefixe use (convention) |
| 14 | **B** | v-memo + dependances (Vue 3.2+) |
| 15 | **B** | unplugin-auto-import dans vite.config |

---
layout: intro
---

# 🎉 Bravo ! Formation Terminée 🎉

Tu as complete la formation Vue.js 3 !

Tu as maintenant toutes les cles pour creer des applications Vue modernes et performantes.

**Continue à pratiquer et bon code ! 💚**
