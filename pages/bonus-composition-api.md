---
layout: new-section
routeAlias: 'bonus-composition-api'
---

<a name="bonus-composition-api" id="bonus-composition-api"></a>

# MODULE BONUS
## Composition API - L'alternative moderne

---

# 🎁 Bienvenue dans le module BONUS !

### 📊 Contexte

Vous avez appris Vue.js avec l'**Options API** (la manière "classique")

Maintenant, découvrez la **Composition API** - l'approche moderne introduite dans Vue 3 !

### 🆚 Options API vs Composition API

| Aspect | Options API | Composition API |
|--------|-------------|-----------------|
| **Structure** | Par type (data, methods...) | Par fonctionnalité |
| **Réutilisabilité** | Mixins | Composables |
| **TypeScript** | Bon | Excellent |
| **Courbe d'apprentissage** | Facile | Moyenne |
| **Organisation** | Simple pour petits projets | Mieux pour grands projets |

### 🎯 Quand utiliser quoi ?

**Options API** ✅
- Projets simples/moyens
- Équipes débutantes
- Code clair et prévisible

**Composition API** ✅
- Grands projets
- Logique complexe réutilisable
- TypeScript

---

# Qu'est-ce que la Composition API ?

Une nouvelle façon d'organiser la logique des composants

### 🧩 Philosophie

**Options API** : organisation par TYPE de propriété
```
data() → Toutes les données
methods → Toutes les méthodes  
computed → Toutes les propriétés calculées
```

**Composition API** : organisation par FONCTIONNALITÉ
```
User feature → userData + userMethods + userComputed
Cart feature → cartData + cartMethods + cartComputed
```

### 💡 Analogie : Ranger une bibliothèque

**Options API** : Ranger par type (tous les romans ensemble, tous les BD ensemble...)
**Composition API** : Ranger par thème (science-fiction, histoire, art...)

---

# Options API vs Composition API - Exemple concret

### Options API (ce que vous connaissez)

```vue
<script>
export default {
  data() {
    return {
      compteur: 0
    }
  },
  methods: {
    incrementer() {
      this.compteur++;
    }
  }
}
</script>

<template>
  <button @click="incrementer">{{ compteur }}</button>
</template>
```

---

# Composition API - Même exemple

### Avec `<script setup>` (syntaxe recommandée)

```vue
<script setup>
import { ref } from 'vue';

const compteur = ref(0);

const incrementer = () => {
  compteur.value++;
};
</script>

<template>
  <button @click="incrementer">{{ compteur }}</button>
</template>
```

### Avantages immédiatement visibles

✅ Moins de code (pas de `export default`, `data()`, `return`)
✅ Pas de `this` (source d'erreurs !)
✅ Plus proche du JavaScript moderne

---

# `ref()` - Réactivité pour les valeurs primitives

`ref()` crée une référence réactive pour les valeurs simples

```vue
<script setup>
import { ref } from 'vue';

// Créer des refs
const count = ref(0);
const message = ref('Hello');
const isActive = ref(true);
const user = ref(null);

// Modifier les valeurs (IMPORTANT : .value)
count.value++;
message.value = 'Bonjour';
isActive.value = false;
user.value = { nom: 'Alice' };

// Lire les valeurs
console.log(count.value); // 0
</script>

<template>
  <!-- Dans le template, pas besoin de .value -->
  <p>{{ count }}</p>
  <p>{{ message }}</p>
  <button @click="count++">Increment</button>
</template>
```

###  ⚠️ Point d'attention : `.value`

Dans le script : `count.value++`
Dans le template : `{{ count }}` (pas de .value !)

---

# `reactive()` - Réactivité pour les objets

`reactive()` crée un objet réactif (proxy)

```vue
<script setup>
import { reactive } from 'vue';

// Créer un objet réactif
const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    nom: 'Alice',
    age: 25
  }
});

// Modifier (PAS de .value !)
state.count++;
state.message = 'Bonjour';
state.user.nom = 'Bob';

// Lire
console.log(state.count); // 0
</script>

<template>
  <p>{{ state.count }}</p>
  <p>{{ state.user.nom }}</p>
  <button @click="state.count++">Increment</button>
</template>
```

---

# ref() vs reactive() - Quand utiliser quoi ?

| Cas d'usage | Utilisez |
|-------------|----------|
| Valeur primitive (string, number, boolean) | `ref()` |
| Tableau simple | `ref([])` |
| Objet avec plusieurs propriétés | `reactive()` |
| Besoin de remplacer tout l'objet | `ref()` |
| Formulaire avec plusieurs champs | `reactive()` |

### Exemple pratique

```vue
<script setup>
import { ref, reactive } from 'vue';

// ✅ Bon usage
const count = ref(0);
const items = ref([]);
const user = reactive({
  nom: '',
  email: '',
  age: null
});

// ❌ À éviter
const count2 = reactive({ value: 0 }); // Trop complexe
const user2 = ref({ nom: '', email: '' }); // Perte de réactivité si remplacé
</script>
```

---

# Computed properties avec Composition API

```vue
<script setup>
import { ref, computed } from 'vue';

const prenom = ref('Jean');
const nom = ref('Dupont');

// Computed en lecture seule
const nomComplet = computed(() => {
  return `${prenom.value} ${nom.value}`;
});

// Computed avec getter et setter
const nomCompletEditable = computed({
  get() {
    return `${prenom.value} ${nom.value}`;
  },
  set(value) {
    const [newPrenom, newNom] = value.split(' ');
    prenom.value = newPrenom;
    nom.value = newNom;
  }
});

console.log(nomComplet.value); // "Jean Dupont"
nomCompletEditable.value = "Alice Martin"; // Modifie prenom et nom
</script>

<template>
  <p>{{ nomComplet }}</p>
  <input v-model="nomCompletEditable" />
</template>
```

---

# Watchers - Surveiller les changements

```vue
<script setup>
import { ref, watch, watchEffect } from 'vue';

const count = ref(0);
const user = reactive({ nom: 'Alice', age: 25 });

// Watch simple
watch(count, (newValue, oldValue) => {
  console.log(`Count changé de ${oldValue} à ${newValue}`);
});

// Watch multiple sources
watch([count, () => user.nom], ([newCount, newNom], [oldCount, oldNom]) => {
  console.log('Count ou nom a changé');
});

// watchEffect - s'exécute automatiquement
watchEffect(() => {
  console.log(`Count actuel : ${count.value}`);
  // Se ré-exécute automatiquement quand count change
});

// Watch avec options
watch(
  count,
  (newValue) => {
    console.log(newValue);
  },
  { immediate: true, deep: true }
);
</script>
```

---

# Lifecycle Hooks avec Composition API

```vue
<script setup>
import { ref, onMounted, onUpdated, onUnmounted } from 'vue';

const data = ref(null);

// Équivalent de created
console.log('Composant créé');

// Équivalent de mounted
onMounted(() => {
  console.log('Composant monté');
  // Faire des appels API, initialiser des lib tierces...
  fetchData();
});

// Équivalent de updated
onUpdated(() => {
  console.log('Composant mis à jour');
});

// Équivalent de unmounted
onUnmounted(() => {
  console.log('Composant détruit');
  // Nettoyer (timers, listeners...)
});

const fetchData = async () => {
  data.value = await fetch('/api/data');
};
</script>
```

### Correspondance Options API → Composition API

| Options API | Composition API |
|-------------|-----------------|
| `beforeCreate` | Code au début de `setup` |
| `created` | Code au début de `setup` |
| `mounted` | `onMounted()` |
| `updated` | `onUpdated()` |
| `unmounted` | `onUnmounted()` |

---

# Composables - La puissance de la Composition API

Les **composables** sont des fonctions réutilisables qui encapsulent de la logique

### Créer un composable

```javascript
// composables/useCounter.js
import { ref } from 'vue';

export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  
  const increment = () => {
    count.value++;
  };
  
  const decrement = () => {
    count.value--;
  };
  
  const reset = () => {
    count.value = initialValue;
  };
  
  return {
    count,
    increment,
    decrement,
    reset
  };
}
```

---

# Utiliser un composable

```vue
<script setup>
import { useCounter } from './composables/useCounter';

// Utiliser le composable
const { count, increment, decrement, reset } = useCounter(10);

// Utiliser plusieurs instances
const counter1 = useCounter(0);
const counter2 = useCounter(100);
</script>

<template>
  <div>
    <h2>Compteur 1</h2>
    <p>{{ counter1.count }}</p>
    <button @click="counter1.increment">+</button>
    
    <h2>Compteur 2</h2>
    <p>{{ counter2.count }}</p>
    <button @click="counter2.increment">+</button>
  </div>
</template>
```

### 🎯 Avantage ÉNORME

Réutilisez la logique facilement sans mixins complexes !

---

# Composable pratique : useFetch

```javascript
// composables/useFetch.js
import { ref, watchEffect, toValue } from 'vue';

export function useFetch(url) {
  const data = ref(null);
  const error = ref(null);
  const loading = ref(false);

  watchEffect(async () => {
    loading.value = true;
    data.value = null;
    error.value = null;
    
    try {
      const urlValue = toValue(url);
      const res = await fetch(urlValue);
      data.value = await res.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  });

  return { data, error, loading };
}
```

---

# Utilisation de useFetch

```vue
<script setup>
import { ref, computed } from 'vue';
import { useFetch } from './composables/useFetch';

const userId = ref(1);
const url = computed(() => `/api/users/${userId.value}`);

const { data, error, loading } = useFetch(url);
</script>

<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur : {{ error.message }}</div>
    <div v-else-if="data">
      <h2>{{ data.nom }}</h2>
      <p>{{ data.email }}</p>
    </div>
    
    <button @click="userId++">Utilisateur suivant</button>
  </div>
</template>
```

### 🎉 Résultat

- Logique réutilisable
- Testable facilement
- Code propre et organisé

---

# Props et Events avec Composition API

### Définir les props

```vue
<script setup>
const props = defineProps({
  titre: String,
  count: {
    type: Number,
    required: true
  },
  user: Object
});

// Utiliser les props
console.log(props.titre);
console.log(props.count);
</script>

<template>
  <h1>{{ titre }}</h1>
  <p>{{ count }}</p>
</template>
```

### Émettre des événements

```vue
<script setup>
const emit = defineEmits(['update', 'delete']);

const handleClick = () => {
  emit('update', { id: 1, value: 'new' });
};

const handleDelete = () => {
  emit('delete', props.count);
};
</script>

<template>
  <button @click="handleClick">Update</button>
  <button @click="handleDelete">Delete</button>
</template>
```

---

# Provide / Inject avec Composition API

### Fournir des données (composant parent)

```vue
<script setup>
import { ref, provide } from 'vue';

const theme = ref('dark');
const updateTheme = (newTheme) => {
  theme.value = newTheme;
};

// Provide
provide('theme', theme);
provide('updateTheme', updateTheme);
</script>
```

### Injecter des données (composant enfant)

```vue
<script setup>
import { inject } from 'vue';

// Inject
const theme = inject('theme');
const updateTheme = inject('updateTheme');

const toggleTheme = () => {
  updateTheme(theme.value === 'dark' ? 'light' : 'dark');
};
</script>

<template>
  <button @click="toggleTheme">
    Thème actuel : {{ theme }}
  </button>
</template>
```

---

# Avantages de la Composition API

### 🎯 Organisation par fonctionnalité

```vue
<!-- Options API : Logique dispersée -->
data() { return { userX, cartY, themeZ } }
methods { userMethod(), cartMethod(), themeMethod() }
computed { userComputed, cartComputed }
```

```vue
<!-- Composition API : Logique groupée -->
// Feature User
const { user, updateUser } = useUser();

// Feature Cart
const { cart, addToCart } = useCart();

// Feature Theme
const { theme, toggleTheme } = useTheme();
```

### ✨ Réutilisabilité

**Options API** : Mixins (conflits possibles, origine floue)
**Composition API** : Composables (clair, explicite, pas de conflit)

### 🔥 TypeScript

Support TypeScript EXCELLENT (types automatiquement inférés)

---

# Migration Options API → Composition API

### Étape 1 : Convertir data()

```vue
<!-- Options API -->
data() {
  return {
    count: 0,
    message: 'Hello'
  }
}

<!-- Composition API -->
import { ref } from 'vue';

const count = ref(0);
const message = ref('Hello');
```

### Étape 2 : Convertir methods

```vue
<!-- Options API -->
methods: {
  increment() {
    this.count++;
  }
}

<!-- Composition API -->
const increment = () => {
  count.value++;
};
```

---

# Migration (suite)

### Étape 3 : Convertir computed

```vue
<!-- Options API -->
computed: {
  double() {
    return this.count * 2;
  }
}

<!-- Composition API -->
import { computed } from 'vue';

const double = computed(() => count.value * 2);
```

### Étape 4 : Convertir lifecycle

```vue
<!-- Options API -->
mounted() {
  this.fetchData();
}

<!-- Composition API -->
import { onMounted } from 'vue';

onMounted(() => {
  fetchData();
});
```

---

# Exemple complet : Options API → Composition API

### Options API (avant)

```vue
<script>
export default {
  data() {
    return {
      count: 0,
      message: 'Hello'
    }
  },
  computed: {
    double() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    console.log('Component mounted');
  }
}
</script>

<template>
  <div>
    <p>{{ count }} (double: {{ double }})</p>
    <button @click="increment">+</button>
  </div>
</template>
```

---

# Exemple complet : Composition API (après)

### Composition API (après)

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const message = ref('Hello');

const double = computed(() => count.value * 2);

const increment = () => {
  count.value++;
};

onMounted(() => {
  console.log('Component mounted');
});
</script>

<template>
  <div>
    <p>{{ count }} (double: {{ double }})</p>
    <button @click="increment">+</button>
  </div>
</template>
```

### 📊 Résultat

- Moins de code
- Plus lisible
- Prêt pour être extrait en composable

---

# Bonnes pratiques Composition API

### 1. Nommage des composables

✅ **Bon** : `useCounter`, `useFetch`, `useAuth`
❌ **Mauvais** : `counter`, `fetch`, `auth`

### 2. Retourner un objet depuis les composables

```javascript
// ✅ Bon
export function useCounter() {
  const count = ref(0);
  const increment = () => count.value++;
  
  return { count, increment };
}

// ❌ Mauvais
export function useCounter() {
  const count = ref(0);
  return count; // Pas extensible
}
```

### 3. Éviter les refs inutiles

```javascript
// ✅ Bon
const double = computed(() => count.value * 2);

// ❌ Mauvais
const double = ref(count.value * 2); // Ne se met pas à jour !
```

---

# Exercice pratique : Créer un composable useLocalStorage

### Objectif

Créer un composable qui synchronise une valeur avec le localStorage

### Fonctionnalités

- Lire la valeur du localStorage au chargement
- Sauvegarder automatiquement à chaque changement
- Support d'une valeur par défaut

### Solution attendue

```vue
<script setup>
import { useLocalStorage } from './composables/useLocalStorage';

const theme = useLocalStorage('theme', 'light');
const username = useLocalStorage('username', 'Anonymous');
</script>

<template>
  <div>
    <p>Thème: {{ theme }}</p>
    <button @click="theme = theme === 'dark' ? 'light' : 'dark'">
      Toggle theme
    </button>
  </div>
</template>
```

---

# Solution : useLocalStorage

```javascript
// composables/useLocalStorage.js
import { ref, watch } from 'vue';

export function useLocalStorage(key, defaultValue) {
  // Lire la valeur initiale du localStorage
  const storedValue = localStorage.getItem(key);
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue);

  // Sauvegarder dans le localStorage à chaque changement
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  return value;
}
```

### 💡 Améliorations possibles

- Gérer les erreurs de parsing JSON
- Support de la synchronisation entre onglets
- Option pour désactiver la sauvegarde automatique

---

# Ressources et documentation

### 📚 Documentation officielle

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Script Setup](https://vuejs.org/api/sfc-script-setup.html)
- [Reactivity API](https://vuejs.org/api/reactivity-core.html)

### 🎓 Tutoriels recommandés

- [VueSchool - Composition API](https://vueschool.io/courses/vue-js-3-composition-api)
- [VueMastery - Composition API](https://www.vuemastery.com/courses/vue-3-essentials/why-the-composition-api/)

### 🛠️ Outils

- [VueUse](https://vueuse.org/) - Collection de composables utiles
- [Vue DevTools](https://devtools.vuejs.org/) - Support Composition API

---

# Récapitulatif

### Ce que vous avez appris

- ✅ Options API vs Composition API
- ✅ `ref()` et `reactive()`
- ✅ `computed()` et watchers
- ✅ Lifecycle hooks en Composition API
- ✅ Composables et réutilisabilité
- ✅ Props, events, provide/inject

#### 🎯 Quand utiliser la Composition API ?

- Projets moyens à grands
- Logique complexe à réutiliser
- Avec TypeScript
- Code organisé par fonctionnalité

#### 💭 Réflexion finale

La Composition API n'est PAS obligatoire. Options API reste valide et maintenue.
**Choisissez l'outil qui convient le mieux à votre projet et votre équipe !**

---

# 🎉 Félicitations !

Vous maîtrisez maintenant **les deux approches** pour développer avec Vue.js !

### 🚀 Prochaines étapes

1. Expérimentez avec la Composition API dans vos projets
2. Créez vos propres composables
3. Explorez VueUse pour des composables prêts à l'emploi
4. Migrez progressivement si vous avez un projet existant

### 💡 Conseil final

**Ne migrez pas un projet entier d'un coup !**
Options API et Composition API peuvent coexister dans le même projet.

Migrez composant par composant, feature par feature.

---

# Questions ?

N'hésitez pas à poser vos questions sur la Composition API !

**Bon code avec Vue.js ! 🎊**
