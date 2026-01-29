---
routeAlias: 'qcm-final'
---

<a name="qcm-final" id="qcm-final"></a>

# QCM Final - Formation Vue.js 3 ✅

Le grand test final ! Questions sur l'ensemble de la formation.

15 questions - Note tes réponses, les corrections sont à la fin.

---

# Question 1 / 15

### Quelle syntaxe permet de creer un computed property en Composition API ?

- A) `const result = computed(() => ...)`
- B) `const result = ref().computed(() => ...)`
- C) `const result = useComputed(() => ...)`
- D) `const result = reactive({ computed: ... })`

---

# Question 2 / 15

### Comment appliquer conditionnellement des classes CSS ?

- A) `:class="{ active: isActive }"`
- B) `class="{{ isActive ? 'active' : '' }}"`
- C) `v-class="isActive ? 'active'"`
- D) `:className="{ active: isActive }"`

---

# Question 3 / 15

### Que signifie SFC (Single File Component) ?

- A) Super Fast Component
- B) Composant dans un seul fichier .vue
- C) Simple Functional Component
- D) Static File Content

---

# Question 4 / 15

### Comment observer une prop dans un composant ?

- A) `watch(() => props.value, callback)`
- B) `watchEffect(() => props.value)`
- C) Les deux A et B fonctionnent
- D) On ne peut pas observer les props

---

# Question 5 / 15

### Quel est le role de `<Suspense>` ?

- A) Arreter le rendu
- B) Gerer les composants asynchrones avec fallback
- C) Suspendre les animations
- D) Mettre en pause les watchers

---

# Question 6 / 15

### Comment definir des types TypeScript pour les emits ?

- A) `defineEmits(['event'])`
- B) `defineEmits<{ (e: 'event'): void }>()`
- C) `defineEmits({ event: String })`
- D) `const emits: EmitType`

---

# Question 7 / 15

### Quelle plateforme est recommandee pour deployer une app Vue.js gratuitement ?

- A) AWS EC2
- B) Vercel ou Netlify
- C) DigitalOcean
- D) Heroku

---

# Question 8 / 15

### Comment tester un composant Vue avec Vitest ?

- A) `mount(Component)` de @vue/test-utils
- B) `render(Component)` de @testing-library/vue
- C) Les deux sont possibles
- D) On ne peut pas tester avec Vitest

---

# Question 9 / 15

### Quel est l'avantage de `shallowMount` vs `mount` ?

- A) Plus rapide
- B) Ne monte pas les composants enfants
- C) Tests plus isoles
- D) Toutes ces reponses

---

# Question 10 / 15

### Comment creer un middleware de navigation dans Vue Router ?

- A) `router.use(middleware)`
- B) `router.beforeEach((to, from, next) => ...)`
- C) `router.middleware(handler)`
- D) `app.use(navigation, middleware)`

---

# Question 11 / 15

### Que fait `nextTick()` ?

- A) Passe à la route suivante
- B) Attend la prochaine mise à jour du DOM
- C) Execute dans 1 seconde
- D) Increment un compteur

---

# Question 12 / 15

### Comment structurer un gros projet Vue.js ?

- A) Tout dans src/
- B) Feature-based (par fonctionnalite)
- C) Layer-based (components, views, stores)
- D) B ou C selon preference

---

# Question 13 / 15

### Quelle est la convention pour nommer un composable ?

- A) PascalCase (UseCounter)
- B) camelCase avec prefixe use (useCounter)
- C) kebab-case (use-counter)
- D) Pas de convention

---

# Question 14 / 15

### Comment prevenir le re-render inutile d'un composant enfant ?

- A) `v-once`
- B) `v-memo`
- C) `shouldUpdate`
- D) `React.memo` (ca n'existe pas en Vue)

---

# Question 15 / 15

### Quel fichier configure les imports auto en Vue 3 avec Vite ?

- A) auto-imports.d.ts
- B) vite.config.ts avec unplugin-auto-import
- C) tsconfig.json
- D) vue.config.js

---

# 🎉 Bravo ! Formation Terminée 🎉

Tu as complete la formation Vue.js 3 !

Tu as maintenant toutes les cles pour creer des applications Vue modernes et performantes.

**Continue à pratiquer et bon code ! 💚**

---

# 📝 Corrections - QCM Final

<small>

**Question 1:** **A** - `computed(() => ...)` depuis vue

**Question 2:** **A** - `:class="{ className: condition }"`

**Question 3:** **B** - Single File Component = .vue avec script/template/style

**Question 4:** **C** - Les deux syntaxes fonctionnent

**Question 5:** **B** - Suspense gere les composants async (loading states)

**Question 6:** **B** - Generics TypeScript pour types stricts

**Question 7:** **B** - Vercel/Netlify offre deploiement gratuit + CI/CD

**Question 8:** **C** - @vue/test-utils ou @testing-library/vue

**Question 9:** **D** - Plus rapide, isole, n'affecte pas enfants

**Question 10:** **B** - beforeEach est le guard global principal

**Question 11:** **B** - Attend la prochaine mise à jour du DOM

**Question 12:** **D** - Feature-based ou Layer-based selon projet

**Question 13:** **B** - camelCase + prefixe use (convention)

**Question 14:** **B** - v-memo + dependances (Vue 3.2+)

**Question 15:** **B** - unplugin-auto-import dans vite.config

</small>
