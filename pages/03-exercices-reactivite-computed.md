---
layout: new-section
---

# Exercices Pratiques - Module 5 🎯

Pratiquons la réactivité et les computed properties !

---
layout: exercices
---

# Exercice 1 : Compteur avancé 🔢

### Objectif : Créer un compteur avec computed

**Instructions :**

Crée un composant `Counter.vue` avec :
- Un compteur avec boutons +1 et -1
- Une computed qui affiche si le nombre est pair ou impair
- Une computed qui affiche le double du compteur

---
layout: exercices
---

# Solution Exercice 1 - Script ✅

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const count = ref(0)

const isEven = computed(() => 
  count.value % 2 === 0 ? 'Pair' : 'Impair'
)

const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}
</script>
```

---
layout: exercices
---

# Solution Exercice 1 - Template ✅

```vue
<template>
  <div class="counter">
    <h2>Compteur : {{ count }}</h2>
    
    <div class="buttons">
      <button @click="decrement">-1</button>
      <button @click="increment">+1</button>
    </div>
    
    <p>Type : {{ isEven }}</p>
    <p>Double : {{ doubled }}</p>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 1 - Style ✅

```vue
<style scoped>
.counter {
  text-align: center;
  padding: 2rem;
}

.buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1rem 0;
}

button {
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background: #42b883;
  color: white;
  cursor: pointer;
}
</style>
```

---
layout: exercices
---

# Exercice 2 : Panier d'achat 🛒

### Objectif : Utiliser computed pour calculer un total

**Instructions :**

Crée un composant `ShoppingCart.vue` avec :
- Une liste de produits avec quantité modifiable
- Une computed pour le nombre total d'articles
- Une computed pour le prix total

---
layout: exercices
---

# Solution Exercice 2 - Script ✅

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  quantity: number
}

const cart = ref<Product[]>([
  { id: 1, name: 'T-Shirt Vue.js', price: 25, quantity: 1 },
  { id: 2, name: 'Mug Vue.js', price: 15, quantity: 2 },
  { id: 3, name: 'Stickers', price: 5, quantity: 3 }
])
</script>
```

---
layout: exercices
---

# Solution Exercice 2 - Script Suite ✅

```vue
<script setup lang="ts">
// ... suite du script

const totalItems = computed(() => 
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const totalPrice = computed(() => 
  cart.value.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  )
)

function updateQuantity(id: number, delta: number) {
  const item = cart.value.find(p => p.id === id)
  if (item && item.quantity + delta >= 0) {
    item.quantity += delta
  }
}
</script>
```

---
layout: exercices
---

# Solution Exercice 2 - Template ✅

```vue
<template>
  <div class="cart">
    <h2>🛒 Mon Panier</h2>
    
    <div v-for="item in cart" :key="item.id" class="item">
      <span>{{ item.name }}</span>
      <span>{{ item.price }}€</span>
      <div class="quantity">
        <button @click="updateQuantity(item.id, -1)">-</button>
        <span>{{ item.quantity }}</span>
        <button @click="updateQuantity(item.id, 1)">+</button>
      </div>
      <span>{{ item.price * item.quantity }}€</span>
    </div>
    
    <div class="total">
      <p>Articles : {{ totalItems }}</p>
      <p><strong>Total : {{ totalPrice }}€</strong></p>
    </div>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 2 - Style ✅

```vue
<style scoped>
.cart {
  max-width: 500px;
  padding: 1rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.total {
  margin-top: 1rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
}
</style>
```

---
layout: exercices
---

# Exercice 3 : Watch API 👀

### Objectif : Utiliser watch pour une recherche avec debounce

**Instructions :**

Crée un composant `SearchBox.vue` avec :
- Un champ de recherche
- Un watch qui simule une requête API après 500ms
- Affichage d'un état "Recherche en cours..."

---
layout: exercices
---

# Solution Exercice 3 - Script ✅

```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

const searchQuery = ref('')
const isSearching = ref(false)
const results = ref<string[]>([])

// Données simulées
const allItems = [
  'Vue.js', 'React', 'Angular', 'Svelte', 
  'Vite', 'Webpack', 'TypeScript', 'JavaScript'
]
</script>
```

---
layout: exercices
---

# Solution Exercice 3 - Script Suite ✅

```vue
<script setup lang="ts">
// ... suite du script

let timeout: number | null = null

watch(searchQuery, (newValue) => {
  // Clear le timeout précédent
  if (timeout) clearTimeout(timeout)
  
  if (!newValue) {
    results.value = []
    return
  }
  
  isSearching.value = true
  
  // Debounce de 500ms
  timeout = setTimeout(() => {
    results.value = allItems.filter(item =>
      item.toLowerCase().includes(newValue.toLowerCase())
    )
    isSearching.value = false
  }, 500)
})
</script>
```

---
layout: exercices
---

# Solution Exercice 3 - Template ✅

```vue
<template>
  <div class="search-box">
    <input 
      v-model="searchQuery"
      placeholder="Rechercher..."
    />
    
    <p v-if="isSearching">🔍 Recherche en cours...</p>
    
    <ul v-else-if="results.length">
      <li v-for="item in results" :key="item">
        {{ item }}
      </li>
    </ul>
    
    <p v-else-if="searchQuery">
      Aucun résultat pour "{{ searchQuery }}"
    </p>
  </div>
</template>
```

---
layout: exercices
---

# Exercice 4 : watchEffect 🤖

### Objectif : Sauvegarder automatiquement dans localStorage

**Instructions :**

Crée un composant `NotePad.vue` avec :
- Un textarea pour écrire des notes
- Sauvegarde automatique dans localStorage
- Récupération des notes au chargement

---
layout: exercices
---

# Solution Exercice 4 - Script ✅

```vue
<script setup lang="ts">
import { ref, watchEffect } from 'vue'

// Récupérer les notes sauvegardées
const notes = ref(
  localStorage.getItem('my-notes') || ''
)

const lastSaved = ref<Date | null>(null)

// Sauvegarder automatiquement
watchEffect(() => {
  localStorage.setItem('my-notes', notes.value)
  if (notes.value) {
    lastSaved.value = new Date()
  }
})
</script>
```

---
layout: exercices
---

# Solution Exercice 4 - Template ✅

```vue
<template>
  <div class="notepad">
    <h2>📝 Bloc-notes</h2>
    
    <textarea 
      v-model="notes"
      placeholder="Écrivez vos notes ici..."
      rows="10"
    ></textarea>
    
    <p v-if="lastSaved" class="save-status">
      ✅ Sauvegardé à {{ lastSaved.toLocaleTimeString() }}
    </p>
    
    <p class="hint">
      Vos notes sont sauvegardées automatiquement
    </p>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 4 - Style ✅

```vue
<style scoped>
.notepad {
  max-width: 600px;
  padding: 1rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
}

textarea:focus {
  border-color: #42b883;
  outline: none;
}

.save-status {
  color: #42b883;
  font-size: 0.9rem;
}

.hint {
  color: #999;
  font-size: 0.8rem;
}
</style>
```

---
layout: exercices
---

# Exercice 5 : Computed avec getter/setter ✏️

### Objectif : Créer un champ de nom complet éditable

**Instructions :**

Crée un composant `FullNameEditor.vue` avec :
- Deux champs pour prénom et nom
- Un champ pour le nom complet (éditable)
- Synchronisation bidirectionnelle

---
layout: exercices
---

# Solution Exercice 5 - Script ✅

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const firstName = ref('Jean')
const lastName = ref('Dupont')

const fullName = computed({
  get() {
    return `${firstName.value} ${lastName.value}`
  },
  set(newValue: string) {
    const parts = newValue.split(' ')
    firstName.value = parts[0] || ''
    lastName.value = parts.slice(1).join(' ') || ''
  }
})
</script>
```

---
layout: exercices
---

# Solution Exercice 5 - Template ✅

```vue
<template>
  <div class="name-editor">
    <h2>Éditeur de nom</h2>
    
    <div class="field">
      <label>Prénom :</label>
      <input v-model="firstName" />
    </div>
    
    <div class="field">
      <label>Nom :</label>
      <input v-model="lastName" />
    </div>
    
    <div class="field">
      <label>Nom complet :</label>
      <input v-model="fullName" />
    </div>
    
    <p class="preview">
      Bonjour, {{ fullName }} ! 👋
    </p>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 5 - Style ✅

```vue
<style scoped>
.name-editor {
  max-width: 400px;
  padding: 1rem;
}

.field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.preview {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f9f4;
  border-radius: 8px;
  text-align: center;
}
</style>
```

---
layout: exercices
---

# Exercice Bonus : Minuteur ⏱️

### Objectif : Créer un minuteur avec start/pause/reset

**Instructions :**

Crée un composant `Timer.vue` avec :
- Affichage du temps (minutes:secondes)
- Boutons Start, Pause, Reset
- Computed pour formater le temps

---
layout: exercices
---

# Solution Bonus - Script ✅

```vue
<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'

const seconds = ref(0)
const isRunning = ref(false)
let intervalId: number | null = null

const formattedTime = computed(() => {
  const mins = Math.floor(seconds.value / 60)
  const secs = seconds.value % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})
</script>
```

---
layout: exercices
---

# Solution Bonus - Script Suite ✅

```vue
<script setup lang="ts">
// ... suite du script

function start() {
  if (!isRunning.value) {
    isRunning.value = true
    intervalId = setInterval(() => {
      seconds.value++
    }, 1000)
  }
}

function pause() {
  isRunning.value = false
  if (intervalId) clearInterval(intervalId)
}

function reset() {
  pause()
  seconds.value = 0
}

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>
```

---
layout: exercices
---

# Solution Bonus - Template ✅

```vue
<template>
  <div class="timer">
    <div class="display">{{ formattedTime }}</div>
    
    <div class="controls">
      <button @click="start" :disabled="isRunning">
        ▶️ Start
      </button>
      <button @click="pause" :disabled="!isRunning">
        ⏸️ Pause
      </button>
      <button @click="reset">
        🔄 Reset
      </button>
    </div>
  </div>
</template>
```

---
layout: intro
---

# Bravo ! 🎉

Tu as terminé les exercices du Module 3 !

Tu maîtrises maintenant :
- ✅ ref() et reactive()
- ✅ Les computed properties
- ✅ watch et watchEffect
- ✅ La sauvegarde automatique
- ✅ Les computed avec getter/setter

**Prochaine étape : Les Formulaires et v-model ! 📋**

