---
layout: new-section
routeAlias: 'composants-vuejs'
---

# Module 3 : Composants Vue.js 🧩

Les briques de construction de ton application !

---

# Qu'est-ce qu'un composant ? 🤔

Un **composant** est une unité réutilisable d'interface utilisateur.


- 📦 **Encapsulé** : Template + Logique + Style
- 🔄 **Réutilisable** : Utilise-le autant de fois que tu veux
- 🧩 **Composable** : Imbrique des composants dans d'autres
- 🔧 **Maintenable** : Modifie un endroit, impact partout


---

# L'analogie de la Pizza 🍕

Pense à une pizza comme une application :


- **La pâte** = Le composant App (la base)
- **La sauce** = Les composants layout
- **Le fromage** = Les composants UI globaux
- **Les toppings** = Les composants spécifiques


---

# L'analogie de la Pizza - Suite 🍕

Tu peux changer un topping sans refaire toute la pizza !

C'est pareil avec les composants : modifie un bouton, et tous les boutons changent !

---

# Créer un composant 🛠️

Un composant Vue est simplement un fichier `.vue` :

```
src/
└── components/
    ├── Button.vue
    ├── Card.vue
    ├── Header.vue
    └── Footer.vue
```

---

# Structure d'un composant 📄

```js
<script setup lang="ts">
// Logique du composant
</script>

<template>
  <!-- Template HTML -->
</template>

<style scoped>
/* Styles isolés */
</style>
```

---

# Importer et utiliser un composant 📥

```js
<script setup lang="ts">
// Import du composant
import MyButton from './components/MyButton.vue'
</script>

<template>
  <!-- Utilisation directe ! -->
  <MyButton />
  <MyButton />
  <MyButton />
</template>
```

---

# Importer et utiliser - Explication 📥

Avec `<script setup>`, les composants importés sont **automatiquement disponibles** dans le template.

Pas besoin de les déclarer dans une option `components` !

---

# Les Props : Données du parent 📨

Les **props** permettent de passer des données du parent à l'enfant.

```js
<!-- Parent.vue -->
<script setup>
import UserCard from './UserCard.vue'
</script>

<template>
  <UserCard 
    name="Jean" 
    :age="25" 
    :is-active="true"
  />
</template>
```

---

# Définir les props 📨

```js
<!-- UserCard.vue -->
<script setup lang="ts">
// Définition des props avec defineProps
const props = defineProps<{
  name: string
  age: number
  isActive: boolean
}>()
</script>

<template>
  <div class="card">
    <h3>{{ name }}</h3>
    <p>Âge : {{ age }} ans</p>
    <span v-if="isActive">🟢 Actif</span>
  </div>
</template>
```

---

# Props avec valeurs par défaut 🎯

```js
<script setup lang="ts">
interface Props {
  name: string
  age?: number
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  age: 18,
  isActive: false
})
</script>
```

---

# Validation des props ✅

```js
<script setup lang="ts">
// Avec runtime validation
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18,
    validator: (value: number) => value >= 0
  },
  status: {
    type: String,
    default: 'pending',
    validator: (v: string) => ['pending', 'active', 'inactive'].includes(v)
  }
})
</script>
```

---

# Props : Convention de nommage 📝

```js
<!-- Dans le template parent : kebab-case -->
<UserCard 
  first-name="Jean"
  :is-premium-user="true"
/>
```

---

# Props : Convention de nommage - Enfant 📝

```js
<!-- Dans le script enfant : camelCase -->
<script setup>
const props = defineProps<{
  firstName: string
  isPremiumUser: boolean
}>()
</script>
```

---

# Props : Convention de nommage - Explication 📝

Vue convertit automatiquement `kebab-case` en `camelCase` !

---

# Événements personnalisés : emit 📣

Les **emits** permettent à l'enfant de communiquer avec le parent.

```js
<!-- Enfant : CounterButton.vue -->
<script setup lang="ts">
const emit = defineEmits<{
  (e: 'increment', value: number): void
  (e: 'decrement', value: number): void
}>()

function handleClick() {
  emit('increment', 1)
}
</script>

<template>
  <button @click="handleClick">+1</button>
</template>
```

---

# Écouter les émissions 📣

```js
<!-- Parent -->
<script setup>
import CounterButton from './CounterButton.vue'
import { ref } from 'vue'

const count = ref(0)

function onIncrement(value: number) {
  count.value += value
}
</script>

<template>
  <p>Compteur : {{ count }}</p>
  <CounterButton @increment="onIncrement" />
</template>
```

---

# Flux de donnees Parent/Enfant 🔄

```mermaid {theme: 'base', themeVariables: {primaryColor: '#42b883', primaryTextColor: '#fff', primaryBorderColor: '#35495e', lineColor: '#35495e', secondaryColor: '#35495e'}}
flowchart TB
    subgraph Parent["🏠 Composant Parent"]
        P1["state: count = 0"]
        P2["@increment handler"]
    end
    
    subgraph Enfant["👶 Composant Enfant"]
        E1[":count prop"]
        E2["emit increment"]
    end
    
    P1 -->|"⬇️ Props"| E1
    E2 -->|"⬆️ Events"| P2
    
    style Parent fill:#35495e,stroke:#42b883,stroke-width:2px
    style Enfant fill:#42b883,stroke:#35495e,stroke-width:2px
```

---

# Slots : Contenu flexible 📦

Les **slots** permettent d'injecter du contenu dans un composant.

```js
<!-- Card.vue -->
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
```

---

# Slots : Utilisation 📦

```js
<!-- Parent -->
<template>
  <Card>
    <h2>Mon titre</h2>
    <p>Mon contenu personnalisé !</p>
  </Card>
</template>
```

---

# Slots : Contenu par défaut 📦

```js
<!-- Card.vue -->
<template>
  <div class="card">
    <slot>
      <!-- Contenu par défaut si rien n'est fourni -->
      <p>Aucun contenu</p>
    </slot>
  </div>
</template>
```

---

# Slots nommés 🏷️

Plusieurs slots dans un même composant :

```js
<!-- Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header"></slot>
    </header>
    
    <main>
      <slot></slot> <!-- slot par défaut -->
    </main>
    
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

---

# Slots nommés : Utilisation 🏷️

```js
<!-- Parent -->
<template>
  <Layout>
    <template #header>
      <h1>Mon Application</h1>
    </template>
    
    <p>Contenu principal</p>
    
    <template #footer>
      <p>© 2025</p>
    </template>
  </Layout>
</template>
```

---

# Slots nommés : Syntaxe 🏷️

`#header` est le raccourci pour `v-slot:header`

---

# Scoped Slots : Passer des données 🔗

Le slot peut exposer des données au parent :

```js
<!-- TodoList.vue -->
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <slot :item="item" :index="items.indexOf(item)">
        {{ item.text }}
      </slot>
    </li>
  </ul>
</template>
```

---

# Scoped Slots : Utilisation 🔗

```js
<!-- Parent -->
<template>
  <TodoList :items="todos">
    <template #default="{ item, index }">
      <strong>{{ index + 1 }}.</strong>
      {{ item.text }}
      <button @click="remove(item.id)">❌</button>
    </template>
  </TodoList>
</template>
```

---

# Provide / Inject 💉

Passer des données à travers plusieurs niveaux de composants :

```js
<!-- GrandParent.vue -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
provide('theme', theme)
</script>
```

---

# Provide / Inject : Inject 💉

```js
<!-- DeepChild.vue (n'importe où dans l'arbre) -->
<script setup>
import { inject } from 'vue'

const theme = inject('theme')
</script>

<template>
  <div :class="theme">
    Thème actuel : {{ theme }}
  </div>
</template>
```

---

# Provide / Inject : Avantages 💉


- ✅ Évite le "prop drilling" (passer des props niveau par niveau)
- ✅ Parfait pour les thèmes, l'internationalisation
- ✅ Les valeurs peuvent être réactives !


---

# Provide avec valeur par défaut 💉

```js
<script setup>
import { inject } from 'vue'

// Valeur par défaut si rien n'est fourni
const theme = inject('theme', 'light')
</script>
```

---

# Composants dynamiques 🔄

Changer de composant à la volée :

```js
<script setup>
import { ref, shallowRef } from 'vue'
import TabHome from './TabHome.vue'
import TabProfile from './TabProfile.vue'
import TabSettings from './TabSettings.vue'

const tabs = { TabHome, TabProfile, TabSettings }
const currentTab = shallowRef(TabHome)
</script>
```

---

# Composants dynamiques : Template 🔄

```js
<template>
  <div class="tabs">
    <button @click="currentTab = tabs.TabHome">Home</button>
    <button @click="currentTab = tabs.TabProfile">Profile</button>
    <button @click="currentTab = tabs.TabSettings">Settings</button>
  </div>
  
  <component :is="currentTab" />
</template>
```

---

# KeepAlive : Garder l'état 💾

Préserver l'état des composants dynamiques :

```js
<template>
  <KeepAlive>
    <component :is="currentTab" />
  </KeepAlive>
</template>
```

---

# KeepAlive : Explication 💾

Sans `KeepAlive`, chaque changement de tab recrée le composant.

Avec `KeepAlive`, l'état (formulaires, scroll...) est préservé !

---

# Teleport : Rendu ailleurs 🚀

Rendre un composant dans une autre partie du DOM :

```js
<template>
  <button @click="showModal = true">Ouvrir</button>
  
  <Teleport to="body">
    <div v-if="showModal" class="modal">
      <h2>Je suis dans body !</h2>
      <button @click="showModal = false">Fermer</button>
    </div>
  </Teleport>
</template>
```

---

# Teleport : Cas d'usage 🚀


- 🎭 Modales (évite les problèmes de z-index)
- 📋 Tooltips et dropdowns
- 🔔 Notifications
- 🖼️ Overlays plein écran


---

# Fragments : Plusieurs éléments racines 🧩

Vue 3 permet plusieurs éléments racines :

```js
<!-- ✅ Valide en Vue 3 -->
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

---

# Fragments : Explication 🧩

En Vue 2, un seul élément racine était autorisé.

Vue 3 gère automatiquement les fragments !

---

# Attributs passés automatiquement 📎

Les attributs non-props sont passés à l'élément racine :

```js
<!-- Parent -->
<MyButton class="big" id="main-btn" />
```

---

# Attributs passés automatiquement - Enfant 📎

```js
<!-- MyButton.vue -->
<template>
  <!-- Reçoit automatiquement class="big" id="main-btn" -->
  <button>Click me</button>
</template>
```

---

# Désactiver l'héritage d'attributs 📎

```js
<script setup>
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <div class="wrapper">
    <!-- Appliquer manuellement les attributs -->
    <button v-bind="$attrs">Click me</button>
  </div>
</template>
```

---

# Exposer des méthodes (defineExpose) 🔓

Rendre des méthodes accessibles au parent via ref :

```js
<!-- Child.vue -->
<script setup>
import { ref } from 'vue'

const count = ref(0)

function increment() {
  count.value++
}

// Exposer au parent
defineExpose({
  count,
  increment
})
</script>
```

---

# Exposer des méthodes - Parent 🔓

```js
<!-- Parent.vue -->
<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const childRef = ref(null)

function callChildMethod() {
  childRef.value?.increment()
  console.log(childRef.value?.count)
}
</script>

<template>
  <Child ref="childRef" />
  <button @click="callChildMethod">Appeler enfant</button>
</template>
```

---

# Organisation des composants 📁

```
src/components/
├── common/           # Composants réutilisables
│   ├── Button.vue
│   ├── Input.vue
│   └── Modal.vue
├── layout/           # Composants de structure
│   ├── Header.vue
│   ├── Sidebar.vue
│   └── Footer.vue
└── features/         # Composants métier
    ├── UserCard.vue
    └── ProductList.vue
```

---

# Conventions de nommage 📝


- 📁 **Fichiers** : PascalCase (`UserCard.vue`)
- 🏷️ **Usage template** : PascalCase (`<UserCard />`) ou kebab-case (`<user-card />`)
- 📦 **Composants de base** : Préfixe (`BaseButton`, `AppHeader`)
- 🔧 **Composants single-instance** : Préfixe `The` (`TheHeader`, `TheSidebar`)


---

# Résumé du Module 4 📝


- ✅ Les **composants** sont des unités réutilisables
- ✅ Les **props** passent des données parent → enfant
- ✅ Les **emits** communiquent enfant → parent
- ✅ Les **slots** injectent du contenu flexible
- ✅ **Provide/Inject** évite le prop drilling
- ✅ **Teleport** rend ailleurs dans le DOM


---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises les composants Vue.js !

