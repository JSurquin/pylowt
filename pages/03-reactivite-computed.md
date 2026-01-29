---
layout: new-section
routeAlias: 'reactivite-computed'
---

<a name="reactivite-computed" id="reactivite-computed"></a>

# Module 5 : Réactivité et Computed ⚡

Le cœur battant de Vue.js - la magie qui fait tout fonctionner !

---

# Qu'est-ce que la réactivité ? 🔄

La **réactivité** est le mécanisme qui permet à Vue.js de détecter les changements de données et de mettre à jour automatiquement l'interface.


- 🎯 Tu modifies une donnée
- ⚡ Vue détecte le changement
- 🖥️ L'interface se met à jour toute seule
- 🧘 Tu n'as rien à faire !


---

# L'analogie du Tableau de Bord 🚗

Imagine le tableau de bord de ta voiture :


- **Les capteurs** = Le système de réactivité Vue
- **L'aiguille de vitesse** = L'interface (template)
- **La vitesse réelle** = Les données (state)


---

# L'analogie du Tableau de Bord - Suite 🚗

Quand la vitesse change (données), l'aiguille bouge automatiquement (interface) grâce aux capteurs (réactivité).

Tu ne tournes pas l'aiguille à la main ! 🙌

---

# Systeme de reactivite Vue 3 ⚡

```mermaid {theme: 'base', themeVariables: {primaryColor: '#42b883', primaryTextColor: '#fff', lineColor: '#35495e'}}
flowchart LR
    subgraph State["📦 State Reactif"]
        R["ref() / reactive()"]
    end
    
    subgraph Track["🔍 Tracking"]
        T["Vue detecte les acces"]
    end
    
    subgraph Trigger["🎯 Trigger"]
        TR["Vue detecte les modifs"]
    end
    
    subgraph Update["🖥️ UI Update"]
        U["Re-render automatique"]
    end
    
    R --> T
    T --> TR
    TR --> U
    U -.->|"Cycle"| R
    
    style State fill:#42b883,stroke:#35495e,stroke-width:2px
    style Update fill:#3498db,stroke:#35495e,stroke-width:2px
```

---

# ref() : La base de la réactivité 📦

`ref()` crée une valeur réactive :

```js
<script setup>
import { ref } from 'vue'

// Crée une référence réactive
const count = ref(0)

// Pour lire ou modifier, utilise .value
console.log(count.value) // 0
count.value++            // Maintenant 1
</script>
```

---

# ref() dans le template 📦

```js
<template>
  <!-- Dans le template, pas besoin de .value ! -->
  <p>Compteur : {{ count }}</p>
  <button @click="count++">+1</button>
</template>
```

---

# ref() - Pourquoi .value ? 📦

**Pourquoi `.value` en JavaScript mais pas dans le template ?**


- En JS, `ref()` retourne un objet avec une propriété `value`
- Vue "déballe" automatiquement les refs dans le template
- C'est une convention Vue.js pour la réactivité


---

# Types de valeurs avec ref() 🎨

`ref()` accepte tous les types de valeurs :

```js
<script setup>
import { ref } from 'vue'

// Primitives
const nombre = ref(42)
const texte = ref('Hello')
const actif = ref(true)

// Objets et tableaux
const user = ref({ name: 'John', age: 30 })
const items = ref(['a', 'b', 'c'])
</script>
```

---

# reactive() : Pour les objets 📊

`reactive()` rend un objet entier réactif :

```js
<script setup>
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'Marie',
    age: 25
  },
  items: []
})

// Pas besoin de .value !
state.count++
state.user.name = 'Sophie'
</script>
```

---

# ref() vs reactive() 🥊

| Critère | ref() | reactive() |
|---------|-------|------------|
| Types | Tous | Objets uniquement |
| Accès en JS | `.value` | Direct |
| Réassignation | ✅ Possible | ❌ Perd la réactivité |
| Destructuration | ✅ Fonctionne | ⚠️ Perd la réactivité |

---

# ref() vs reactive() - Conseil 🥊

**Recommandation officielle Vue.js :**

Utilise `ref()` par défaut, c'est plus flexible et prévisible !

---

# Le piège de reactive() ⚠️

```js
<script setup>
import { reactive } from 'vue'

let state = reactive({ count: 0 })

// ❌ PIÈGE : Ceci casse la réactivité !
state = { count: 1 }

// ✅ Correct : Modifie les propriétés
state.count = 1
</script>
```

---

# Destructuration avec reactive() ⚠️

```js
<script setup>
import { reactive } from 'vue'

const state = reactive({ x: 1, y: 2 })

// ❌ PIÈGE : Ces variables ne sont PAS réactives
const { x, y } = state

// ✅ Solution : Utilise toRefs()
import { toRefs } from 'vue'
const { x, y } = toRefs(state)
</script>
```

---

# Computed Properties 🧮

Les **computed** sont des valeurs dérivées qui se recalculent automatiquement :

```js
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Jean')
const lastName = ref('Dupont')

// Computed : se recalcule si firstName ou lastName change
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>
```

---

# Computed Properties - Template 🧮

```js
<template>
  <p>Prénom : {{ firstName }}</p>
  <p>Nom : {{ lastName }}</p>
  <p>Nom complet : {{ fullName }}</p>
</template>
```

---

# L'analogie de la Calculatrice 🧮

Imagine une cellule Excel avec une formule :


- **Cellule A1** = Prénom (Jean)
- **Cellule A2** = Nom (Dupont)
- **Cellule A3** = `=A1 & " " & A2` (computed)


---

# L'analogie de la Calculatrice - Suite 🧮

Quand tu changes A1 ou A2, A3 se recalcule automatiquement !

C'est exactement ce que font les computed properties.

---

# Computed vs Méthode 🤔

**Pourquoi pas une simple fonction ?**

```js
<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

// ❌ Méthode : recalculée à chaque render
function doubled() {
  return count.value * 2
}

// ✅ Computed : mise en cache, recalculée si count change
const doubledComputed = computed(() => count.value * 2)
</script>
```

---

# Computed : Le cache magique ✨


- 🚀 **Performance** : Résultat mis en cache
- 🔄 **Intelligent** : Recalcul uniquement si les dépendances changent
- 📊 **Optimal** : Parfait pour les calculs coûteux


---

# Exemple pratique : Filtrage 🔍

```js
<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const users = ref([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
])

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user => 
    user.name.toLowerCase().includes(query)
  )
})
</script>
```

---

# Exemple pratique : Filtrage - Template 🔍

```js
<template>
  <input v-model="searchQuery" placeholder="Rechercher...">
  
  <ul>
    <li v-for="user in filteredUsers" :key="user.name">
      {{ user.name }} - {{ user.age }} ans
    </li>
  </ul>
  
  <p>{{ filteredUsers.length }} résultat(s)</p>
</template>
```

---

# Computed avec Getter et Setter ✏️

Par défaut, computed est en lecture seule. Mais tu peux le rendre modifiable :

```js
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Jean')
const lastName = ref('Dupont')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue) {
    const parts = newValue.split(' ')
    firstName.value = parts[0]
    lastName.value = parts[1] || ''
  }
})
</script>
```

---

# Computed avec Getter et Setter - Usage ✏️

```js
<template>
  <!-- Modifiable ! -->
  <input v-model="fullName" />
</template>
```

---

# Watch : Réagir aux changements 👀

`watch` observe une valeur et exécute du code quand elle change :

```js
<script setup>
import { ref, watch } from 'vue'

const question = ref('')

watch(question, (newValue, oldValue) => {
  console.log(`Question changée de "${oldValue}" à "${newValue}"`)
  
  if (newValue.includes('?')) {
    // Faire une requête API...
  }
})
</script>
```

---

# Watch : Cas d'usage 👀

Quand utiliser `watch` ?


- 🌐 Appeler une API quand une valeur change
- 💾 Sauvegarder dans localStorage
- 📊 Logger des analytics
- 🔄 Synchroniser avec un service externe


---

# Watch avec options 🔧

```js
<script setup>
import { ref, watch } from 'vue'

const user = ref({ name: 'John', age: 30 })

watch(
  user,
  (newUser) => {
    console.log('User modifié:', newUser)
  },
  {
    deep: true,     // Observer les changements profonds
    immediate: true // Exécuter immédiatement au montage
  }
)
</script>
```

---

# Watch multiple sources 📡

```js
<script setup>
import { ref, watch } from 'vue'

const firstName = ref('Jean')
const lastName = ref('Dupont')

// Observer plusieurs valeurs
watch(
  [firstName, lastName],
  ([newFirst, newLast], [oldFirst, oldLast]) => {
    console.log(`Nom changé de ${oldFirst} ${oldLast}`)
    console.log(`à ${newFirst} ${newLast}`)
  }
)
</script>
```

---

# watchEffect : L'observateur automatique 🤖

`watchEffect` détecte automatiquement ses dépendances :

```js
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)
const doubled = ref(0)

// S'exécute immédiatement et à chaque changement de count
watchEffect(() => {
  doubled.value = count.value * 2
  console.log(`Count: ${count.value}, Doubled: ${doubled.value}`)
})
</script>
```

---

# watch vs watchEffect 🥊

| Critère | watch | watchEffect |
|---------|-------|-------------|
| Dépendances | Explicites | Automatiques |
| Exécution initiale | Non (sauf immediate) | Oui |
| Accès ancienne valeur | ✅ Oui | ❌ Non |
| Cas d'usage | Précis | Simple |

---

# Exemple : Sauvegarde automatique 💾

```js
<script setup>
import { ref, watchEffect } from 'vue'

const notes = ref(
  localStorage.getItem('notes') || ''
)

// Sauvegarde automatique à chaque modification
watchEffect(() => {
  localStorage.setItem('notes', notes.value)
})
</script>
```

---

# Exemple : Sauvegarde automatique - Template 💾

```js
<template>
  <textarea 
    v-model="notes" 
    placeholder="Vos notes..."
  ></textarea>
  <p>Sauvegardé automatiquement ! ✅</p>
</template>
```

---

# Arrêter un watcher 🛑

```js
<script setup>
import { ref, watchEffect } from 'vue'

const count = ref(0)

// watchEffect retourne une fonction pour l'arrêter
const stop = watchEffect(() => {
  console.log(count.value)
})

// Arrêter l'observation
function stopWatching() {
  stop()
}
</script>
```

---

# shallowRef et shallowReactive 🏊

Pour les gros objets où tu ne veux pas de réactivité profonde :

```js
<script setup>
import { shallowRef, shallowReactive } from 'vue'

// Seul .value est réactif, pas le contenu
const bigData = shallowRef({ 
  items: [/* milliers d'éléments */] 
})

// Pour trigger une mise à jour :
bigData.value = { ...bigData.value }
</script>
```

---

# triggerRef : Forcer une mise à jour 🔫

```js
<script setup>
import { shallowRef, triggerRef } from 'vue'

const state = shallowRef({ count: 0 })

function increment() {
  // Modifie sans trigger automatique
  state.value.count++
  
  // Force manuellement le trigger
  triggerRef(state)
}
</script>
```

---

# toRef et toRefs 🔄

Créer des refs à partir de propriétés d'un objet réactif :

```js
<script setup>
import { reactive, toRef, toRefs } from 'vue'

const state = reactive({
  foo: 1,
  bar: 2
})

// Créer une ref pour une propriété
const fooRef = toRef(state, 'foo')

// Créer des refs pour toutes les propriétés
const { foo, bar } = toRefs(state)
</script>
```

---

# Débogage de la réactivité 🔍

Vue DevTools montre :


- 📊 L'état de toutes les refs et reactive
- 🔄 Les dépendances des computed
- 👀 Les watchers actifs
- ⏱️ Timeline des changements


---

# Bonnes pratiques réactivité ✅


- 🎯 Préfère `ref()` pour la plupart des cas
- 🧮 Utilise `computed` plutôt que des méthodes pour les valeurs dérivées
- 👀 `watch` pour les effets de bord (API, localStorage)
- 🤖 `watchEffect` pour les cas simples
- ⚠️ Évite de réassigner des objets `reactive`


---

# Résumé du Module 3 📝


- ✅ `ref()` pour créer des valeurs réactives (utilise `.value` en JS)
- ✅ `reactive()` pour des objets réactifs (pas de `.value`)
- ✅ `computed` pour des valeurs dérivées avec cache
- ✅ `watch` pour réagir aux changements avec contrôle précis
- ✅ `watchEffect` pour des effets automatiques


---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises la réactivité Vue.js !

