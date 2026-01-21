---
layout: new-section
routeAlias: 'bonus-typescript'
---

# MODULE BONUS
## TypeScript avec Vue.js 3

---

# 🎁 TypeScript + Vue = Match parfait !

### 📊 Pourquoi TypeScript ?

TypeScript ajoute le **typage statique** à JavaScript

### 🆚 JavaScript vs TypeScript

| Aspect | JavaScript | TypeScript |
|--------|------------|------------|
| **Types** | Dynamiques | Statiques |
| **Erreurs** | À l'exécution | À la compilation |
| **Auto-complétion** | Limitée | Excellente |
| **Refactoring** | Risqué | Sécurisé |
| **Documentation** | Externe | Intégrée (types) |

### 🎯 Avantages concrets

- 🐛 Moins de bugs en production
- 🚀 Meilleure DX (Developer Experience)
- 📝 Documentation automatique
- 🔄 Refactoring sécurisé
- 🤝 Meilleur travail d'équipe

---

# JavaScript vs TypeScript - Exemple

### JavaScript (ce que vous connaissez)

```javascript
function additionner(a, b) {
  return a + b;
}

additionner(5, 3);      // 8 ✅
additionner("5", "3");  // "53" 😱 Bug !
additionner(5);         // NaN 😱 Bug !
```

### TypeScript

```typescript
function additionner(a: number, b: number): number {
  return a + b;
}

additionner(5, 3);      // 8 ✅
additionner("5", "3");  // ❌ Erreur de compilation
additionner(5);         // ❌ Erreur de compilation
```

### 🎉 Résultat

Les erreurs sont détectées **AVANT** l'exécution !

---

# Installer TypeScript dans un projet Vue

### Avec Vite (recommandé)

```bash
# Créer un nouveau projet avec TypeScript
npm create vite@latest mon-app -- --template vue-ts

cd mon-app
npm install
npm run dev
```

### Ajouter TypeScript à un projet existant

```bash
npm install --save-dev typescript @vue/tsconfig

# Créer tsconfig.json
npx tsc --init
```

### Configuration tsconfig.json

```json
{
  "extends": "@vue/tsconfig/tsconfig.dom.json",
  "compilerOptions": {
    "target": "ES2020",
    "strict": true,
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["src/**/*.ts", "src/**/*.vue"]
}
```

---

# Types de base en TypeScript

### Types primitifs

```typescript
// String
let nom: string = "Alice";

// Number
let age: number = 25;

// Boolean
let estActif: boolean = true;

// Array
let nombres: number[] = [1, 2, 3];
let fruits: Array<string> = ["pomme", "banane"];

// Tuple
let coordonnees: [number, number] = [48.8566, 2.3522];

// Any (à éviter)
let nimporteQuoi: any = "hello";
nimporteQuoi = 42; // Pas d'erreur

// Unknown (préférer à any)
let inconnu: unknown = "hello";
// inconnu.toUpperCase(); // ❌ Erreur
if (typeof inconnu === "string") {
  inconnu.toUpperCase(); // ✅ OK
}
```

---

# Types avancés

### Union types

```typescript
let id: string | number;
id = "abc123";  // ✅
id = 123;       // ✅
id = true;      // ❌ Erreur

type Status = "pending" | "success" | "error";
let status: Status = "pending"; // ✅
status = "loading"; // ❌ Erreur
```

### Interfaces

```typescript
interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  age?: number;  // Propriété optionnelle
}

const user: Utilisateur = {
  id: 1,
  nom: "Alice",
  email: "alice@example.com"
  // age est optionnel
};
```

---

# Typer les Props (Options API)

### Syntaxe de base

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    titre: {
      type: String,
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      message: 'Hello'
    }
  }
});
</script>
```

---

# Typer les Props avec interfaces

### Avec PropType

```vue
<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Utilisateur {
  id: number;
  nom: string;
  email: string;
}

export default defineComponent({
  props: {
    user: {
      type: Object as PropType<Utilisateur>,
      required: true
    },
    items: {
      type: Array as PropType<string[]>,
      default: () => []
    },
    status: {
      type: String as PropType<'pending' | 'success' | 'error'>,
      default: 'pending'
    }
  }
});
</script>

<template>
  <div>
    <h2>{{ user.nom }}</h2>
    <p>{{ user.email }}</p>
  </div>
</template>
```

---

# Typer data() et computed

```vue
<script lang="ts">
import { defineComponent } from 'vue';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default defineComponent({
  data() {
    return {
      count: 0 as number,
      message: '' as string,
      todos: [] as Todo[]
    }
  },
  computed: {
    // TypeScript infère le type de retour
    todosRestants(): number {
      return this.todos.filter(t => !t.done).length;
    },
    
    // Ou spécifier explicitement
    double(): number {
      return this.count * 2;
    }
  }
});
</script>
```

---

# Typer les méthodes

```vue
<script lang="ts">
import { defineComponent } from 'vue';

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export default defineComponent({
  data() {
    return {
      todos: [] as Todo[]
    }
  },
  methods: {
    // Types des paramètres et du retour
    ajouterTodo(text: string): void {
      this.todos.push({
        id: Date.now(),
        text,
        done: false
      });
    },
    
    // Retourner une valeur typée
    trouverTodo(id: number): Todo | undefined {
      return this.todos.find(t => t.id === id);
    },
    
    // Paramètres optionnels
    filtrer(termine?: boolean): Todo[] {
      if (termine === undefined) {
        return this.todos;
      }
      return this.todos.filter(t => t.done === termine);
    }
  }
});
</script>
```

---

# Typer les événements

### Définir les événements

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  emits: {
    // Validation simple
    submit: null,
    
    // Avec validation
    update: (value: string) => {
      return value.length > 0;
    },
    
    // Événement avec payload typé
    delete: (id: number) => true
  },
  methods: {
    handleClick() {
      this.$emit('submit');
      this.$emit('update', 'nouvelle valeur');
      this.$emit('delete', 123);
    }
  }
});
</script>
```

---

# Typer les refs du template

### Accéder aux éléments DOM

```vue
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    // Typer les refs
    const input = this.$refs.myInput as HTMLInputElement;
    input.focus();
    
    const form = this.$refs.myForm as HTMLFormElement;
    form.submit();
  }
});
</script>

<template>
  <div>
    <input ref="myInput" type="text" />
    <form ref="myForm">
      <!-- ... -->
    </form>
  </div>
</template>
```

---

# Typer les appels API

### Avec interfaces

```vue
<script lang="ts">
import { defineComponent } from 'vue';

interface User {
  id: number;
  nom: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export default defineComponent({
  data() {
    return {
      users: [] as User[],
      loading: false,
      error: null as string | null
    }
  },
  methods: {
    async fetchUsers(): Promise<void> {
      this.loading = true;
      try {
        const response = await fetch('/api/users');
        const result: ApiResponse<User[]> = await response.json();
        this.users = result.data;
      } catch (e) {
        this.error = (e as Error).message;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
});
</script>
```

---

# Types utilitaires de TypeScript

### Partial, Required, Readonly

```typescript
interface User {
  id: number;
  nom: string;
  email: string;
  age?: number;
}

// Toutes les propriétés deviennent optionnelles
type PartialUser = Partial<User>;

// Toutes les propriétés deviennent obligatoires
type RequiredUser = Required<User>;

// Toutes les propriétés deviennent readonly
type ReadonlyUser = Readonly<User>;

// Pick : sélectionner certaines propriétés
type UserPreview = Pick<User, 'id' | 'nom'>;
// { id: number; nom: string }

// Omit : exclure certaines propriétés
type UserWithoutId = Omit<User, 'id'>;
// { nom: string; email: string; age?: number }

// Record : créer un objet avec des clés typées
type UserMap = Record<number, User>;
// { [id: number]: User }
```

---

# Générics en TypeScript

### Fonctions génériques

```typescript
// Fonction générique simple
function first<T>(array: T[]): T | undefined {
  return array[0];
}

const nombres = first([1, 2, 3]);  // number | undefined
const fruits = first(['pomme', 'banane']);  // string | undefined

// Fonction avec contrainte
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, nom: 'Alice' };
const nom = getProperty(user, 'nom');  // string
// const invalid = getProperty(user, 'age'); // ❌ Erreur
```

### Classes génériques

```typescript
class DataStore<T> {
  private data: T[] = [];
  
  add(item: T): void {
    this.data.push(item);
  }
  
  getAll(): T[] {
    return this.data;
  }
}

const userStore = new DataStore<User>();
userStore.add({ id: 1, nom: 'Alice', email: 'alice@example.com' });
```

---

# TypeScript avec Pinia

### Store typé

```typescript
// stores/user.ts
import { defineStore } from 'pinia';

interface User {
  id: number;
  nom: string;
  email: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    loading: false,
    error: null
  }),
  
  getters: {
    userCount(state): number {
      return state.users.length;
    },
    
    getUserById(state) {
      return (id: number): User | undefined => {
        return state.users.find(u => u.id === id);
      };
    }
  },
  
  actions: {
    async fetchUsers(): Promise<void> {
      this.loading = true;
      try {
        const response = await fetch('/api/users');
        this.users = await response.json();
      } catch (e) {
        this.error = (e as Error).message;
      } finally {
        this.loading = false;
      }
    }
  }
});
```

---

# TypeScript avec Vue Router

### Routes typées

```typescript
// router/index.ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/:id',
    name: 'user',
    component: () => import('../views/User.vue'),
    props: (route) => ({ id: Number(route.params.id) })
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
    meta: {
      requiresAuth: true
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Type guard pour meta
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    roles?: string[];
  }
}

export default router;
```

---

# Bonnes pratiques TypeScript avec Vue

### 1. Créer des types réutilisables

```typescript
// types/index.ts
export interface User {
  id: number;
  nom: string;
  email: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}
```

### 2. Utiliser les types stricts

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
```

---

# Erreurs TypeScript courantes

### Erreur : Type 'X' is not assignable to type 'Y'

```typescript
// ❌ Erreur
let age: number = "25";

// ✅ Solution
let age: number = 25;
```

### Erreur : Object is possibly 'null' or 'undefined'

```typescript
// ❌ Erreur
const user = users.find(u => u.id === 1);
console.log(user.nom); // user peut être undefined

// ✅ Solution 1 : Optional chaining
console.log(user?.nom);

// ✅ Solution 2 : Type guard
if (user) {
  console.log(user.nom);
}

// ✅ Solution 3 : Non-null assertion (si vous êtes sûr)
console.log(user!.nom);
```

### Erreur : Property 'X' does not exist on type 'Y'

```typescript
// ❌ Erreur
interface User {
  nom: string;
}
const user: User = { nom: 'Alice' };
console.log(user.age); // age n'existe pas

// ✅ Solution : Ajouter la propriété
interface User {
  nom: string;
  age?: number;
}
```

---

# Migration JavaScript → TypeScript

### Étape 1 : Renommer les fichiers

```
App.vue      → App.vue (garder .vue)
main.js      → main.ts
router.js    → router.ts
store.js     → store.ts
```

### Étape 2 : Ajouter les types progressivement

```typescript
// Avant (JavaScript)
export default {
  data() {
    return {
      count: 0
    }
  }
}

// Après (TypeScript)
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      count: 0 as number
    }
  }
});
```

---

# Migration (suite)

### Étape 3 : Typer les props et events

```typescript
// Avant
props: {
  user: Object
}

// Après
import { PropType } from 'vue';

interface User {
  id: number;
  nom: string;
}

props: {
  user: {
    type: Object as PropType<User>,
    required: true
  }
}
```

### Étape 4 : Gérer les erreurs

```bash
# Activer TypeScript en mode strict progressivement
npm run type-check
```

```json
// tsconfig.json - Commencer permissif
{
  "compilerOptions": {
    "strict": false,
    "noImplicitAny": false
  }
}
```

---

# Outils et extensions

### VS Code extensions essentielles

- **Volar** : Support Vue 3 + TypeScript
- **TypeScript Vue Plugin** : Meilleure intégration
- **ESLint** : Linting TypeScript
- **Prettier** : Formatage code

### Configuration ESLint + TypeScript

```bash
npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```javascript
// .eslintrc.js
module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ]
};
```

---

# Ressources TypeScript

### 📚 Documentation

- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
- [Vue + TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### 🎓 Apprendre TypeScript

- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Total TypeScript](https://www.totaltypescript.com/)

### 🛠️ Outils pratiques

- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TS Config Bases](https://github.com/tsconfig/bases)

---

# Récapitulatif TypeScript

### Ce que vous avez appris

✅ Types de base en TypeScript
✅ Typer les props, data, computed, methods
✅ Interfaces et types avancés
✅ Générics
✅ TypeScript avec Pinia et Vue Router
✅ Migration JavaScript → TypeScript

### 🎯 Quand utiliser TypeScript ?

- Projets moyens à grands
- Équipes importantes
- Code maintenable sur le long terme
- Applications critiques

### 💭 Réflexion

TypeScript demande un investissement initial mais vous fait gagner ÉNORMÉMENT de temps sur la durée !

---

# 🎉 Félicitations !

Vous savez maintenant utiliser **TypeScript avec Vue.js** !

### 🚀 Prochaines étapes

1. Pratiquer sur de petits projets
2. Migrer progressivement un projet existant
3. Explorer les types avancés
4. Contribuer à des projets open-source typés

### 💡 Conseil final

**Commencez simple !**
- Types de base d'abord
- Puis interfaces
- Puis types avancés et générics

Rome ne s'est pas construite en un jour ! 🏛️

---

# Questions ?

N'hésitez pas à poser vos questions sur TypeScript et Vue.js !

**Bon code typé ! 🎊**
