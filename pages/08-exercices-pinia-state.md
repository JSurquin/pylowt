---

# Exercices Pratiques - Module 8 🎯

Pratiquons Pinia !

---

# Exercice 1 : Store Counter 🔢

### Objectif : Créer un store de compteur

**Instructions :**

Crée un store `useCounterStore` avec :
- State : count
- Getters : doubled, isPositive
- Actions : increment, decrement, reset

---

# Solution Exercice 1 ✅

```ts
// stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  
  const doubled = computed(() => count.value * 2)
  const isPositive = computed(() => count.value > 0)
  
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  function reset() {
    count.value = 0
  }
  
  return { count, doubled, isPositive, increment, decrement, reset }
})
```

---

# Solution Exercice 1 - Utilisation ✅

```js
<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const store = useCounterStore()
const { count, doubled, isPositive } = storeToRefs(store)
const { increment, decrement, reset } = store
</script>

<template>
  <div>
    <p>Count: {{ count }} (doubled: {{ doubled }})</p>
    <p :class="isPositive ? 'positive' : 'negative'">
      {{ isPositive ? 'Positif' : 'Négatif ou zéro' }}
    </p>
    <button @click="decrement">-</button>
    <button @click="increment">+</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

# Exercice 2 : Store Todo 📋

### Objectif : Créer un store pour une todo list

**Instructions :**

Crée un store `useTodoStore` avec :
- State : todos (array)
- Getters : completedCount, pendingCount
- Actions : addTodo, toggleTodo, removeTodo

---

# Solution Exercice 2 - Store ✅

```ts
// stores/todos.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([])
  let nextId = 1
  
  const completedCount = computed(() => 
    todos.value.filter(t => t.completed).length
  )
  
  const pendingCount = computed(() => 
    todos.value.filter(t => !t.completed).length
  )
  
  // Suite dans la slide suivante...
  return { todos, completedCount, pendingCount, addTodo, toggleTodo, removeTodo }
})
```

---

# Solution Exercice 2 - Actions ✅

```ts
// stores/todos.ts (suite)
function addTodo(text: string) {
  todos.value.push({
    id: nextId++,
    text,
    completed: false
  })
}

function toggleTodo(id: number) {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}
```

---

# Solution Exercice 2 - Composant ✅

```js
<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '@/stores/todos'

const store = useTodoStore()
const { todos, completedCount, pendingCount } = storeToRefs(store)
const { addTodo, toggleTodo, removeTodo } = store

const newTodo = ref('')

function handleAdd() {
  if (newTodo.value.trim()) {
    addTodo(newTodo.value)
    newTodo.value = ''
  }
}
</script>
```

---

# Solution Exercice 2 - Template ✅

```js
<template>
  <div class="todo-app">
    <div class="add-todo">
      <input v-model="newTodo" @keyup.enter="handleAdd" />
      <button @click="handleAdd">Ajouter</button>
    </div>
    
    <p>✅ {{ completedCount }} | ⏳ {{ pendingCount }}</p>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input 
          type="checkbox" 
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        <span :class="{ done: todo.completed }">{{ todo.text }}</span>
        <button @click="removeTodo(todo.id)">❌</button>
      </li>
    </ul>
  </div>
</template>
```

---

# Exercice 3 : Store User avec Auth 🔐

### Objectif : Créer un store d'authentification

**Instructions :**

Crée un store `useUserStore` avec :
- State : user, token, loading
- Getters : isLoggedIn, userName
- Actions : login, logout

---

# Solution Exercice 3 ✅

```ts
// stores/user.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const loading = ref(false)
  
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const userName = computed(() => user.value?.name ?? 'Invité')
  
  // Suite...
  return { user, token, loading, isLoggedIn, userName, login, logout }
})
```

---

# Solution Exercice 3 - Actions ✅

```ts
// stores/user.ts (suite)
async function login(email: string, password: string) {
  loading.value = true
  try {
    // Simule une requête API
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simule une réponse
    token.value = 'fake-jwt-token'
    user.value = { id: 1, name: 'John Doe', email }
    
    localStorage.setItem('token', token.value)
  } finally {
    loading.value = false
  }
}

function logout() {
  user.value = null
  token.value = null
  localStorage.removeItem('token')
}
```

---

# Exercice 4 : Store Cart avec Products 🛒

### Objectif : Créer un store panier qui utilise un store produits

**Instructions :**

Crée deux stores :
- `useProductStore` : liste de produits
- `useCartStore` : panier utilisant les produits

---

# Solution Exercice 4 - Product Store ✅

```ts
// stores/products.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  price: number
}

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([
    { id: 1, name: 'Vue.js Book', price: 49 },
    { id: 2, name: 'T-Shirt Vue', price: 25 },
    { id: 3, name: 'Mug Vue', price: 15 }
  ])
  
  const getProductById = computed(() => {
    return (id: number) => products.value.find(p => p.id === id)
  })
  
  return { products, getProductById }
})
```

---

# Solution Exercice 4 - Cart Store ✅

```ts
// stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useProductStore } from './products'

interface CartItem {
  productId: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const productStore = useProductStore()
  const items = ref<CartItem[]>([])
  
  const totalItems = computed(() => 
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )
  
  // Suite...
  return { items, totalItems, totalPrice, addToCart, removeFromCart }
})
```

---

# Solution Exercice 4 - Cart Getters ✅

```ts
// stores/cart.ts (suite)
const totalPrice = computed(() => {
  return items.value.reduce((sum, item) => {
    const product = productStore.getProductById(item.productId)
    return sum + (product?.price ?? 0) * item.quantity
  }, 0)
})

const cartWithDetails = computed(() => {
  return items.value.map(item => ({
    ...item,
    product: productStore.getProductById(item.productId)
  }))
})
```

---

# Solution Exercice 4 - Cart Actions ✅

```ts
// stores/cart.ts (actions)
function addToCart(productId: number) {
  const existing = items.value.find(i => i.productId === productId)
  if (existing) {
    existing.quantity++
  } else {
    items.value.push({ productId, quantity: 1 })
  }
}

function removeFromCart(productId: number) {
  const index = items.value.findIndex(i => i.productId === productId)
  if (index > -1) {
    if (items.value[index].quantity > 1) {
      items.value[index].quantity--
    } else {
      items.value.splice(index, 1)
    }
  }
}

function clearCart() {
  items.value = []
}
```

---

# Exercice Bonus : Persistance 💾

### Objectif : Persister le panier dans localStorage

**Instructions :**

Ajoute la persistance au store cart :
- Sauvegarder à chaque modification
- Restaurer au chargement

---

# Solution Bonus ✅

```ts
// stores/cart.ts (avec persistance)
export const useCartStore = defineStore('cart', () => {
  // Restaurer depuis localStorage
  const saved = localStorage.getItem('cart')
  const items = ref<CartItem[]>(saved ? JSON.parse(saved) : [])
  
  // ... getters et actions ...
  
  // Sauvegarder à chaque changement
  watch(
    items,
    (newItems) => {
      localStorage.setItem('cart', JSON.stringify(newItems))
    },
    { deep: true }
  )
  
  return { items, totalItems, totalPrice, addToCart, removeFromCart }
})
```

---

# Bravo ! 🎉

Tu as terminé les exercices du Module 8 !

Tu maîtrises maintenant :
- ✅ Créer des stores Pinia
- ✅ State, getters et actions
- ✅ storeToRefs pour la réactivité
- ✅ Stores composés
- ✅ Persistance des données

**Prochaine étape : Projet Final ! 🚀**

