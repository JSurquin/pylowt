---
layout: new-section
---

# Exercices Pratiques - Module 2 🎯

Pratiquons les templates et directives Vue.js !

---
layout: exercices
---

# Exercice 1 : Interpolation 📝

### Objectif : Afficher des données dynamiquement

**Instructions :**

Crée un composant `UserCard.vue` qui affiche :
- Le nom complet (prénom + nom)
- L'âge
- L'email en majuscules

---
layout: exercices
---

# Solution Exercice 1 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

const user = ref({
  firstName: 'Marie',
  lastName: 'Dupont',
  age: 28,
  email: 'marie.dupont@email.com'
})
</script>
```

---
layout: exercices
---

# Solution Exercice 1 - Template ✅

```vue
<template>
  <div class="user-card">
    <h2>{{ user.firstName }} {{ user.lastName }}</h2>
    <p>Âge : {{ user.age }} ans</p>
    <p>Email : {{ user.email.toUpperCase() }}</p>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 1 - Style ✅

```vue
<style scoped>
.user-card {
  padding: 1.5rem;
  border-radius: 12px;
  background: #f5f5f5;
  max-width: 300px;
}
</style>
```

---
layout: exercices
---

# Exercice 2 : v-bind dynamique 🔗

### Objectif : Lier des attributs dynamiquement

**Instructions :**

Crée un composant `DynamicImage.vue` avec :
- Une image dont l'URL change avec un bouton
- Un style dynamique (bordure colorée)

---
layout: exercices
---

# Solution Exercice 2 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

const images = [
  'https://picsum.photos/200/200?random=1',
  'https://picsum.photos/200/200?random=2',
  'https://picsum.photos/200/200?random=3'
]

const currentIndex = ref(0)
const borderColor = ref('#42b883')

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}
</script>
```

---
layout: exercices
---

# Solution Exercice 2 - Template ✅

```vue
<template>
  <div class="image-container">
    <img 
      :src="images[currentIndex]"
      :style="{ border: `4px solid ${borderColor}` }"
      alt="Image dynamique"
    />
    <button @click="nextImage">
      Image suivante
    </button>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 2 - Style ✅

```vue
<style scoped>
.image-container {
  text-align: center;
}

img {
  border-radius: 12px;
  margin-bottom: 1rem;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>
```

---
layout: exercices
---

# Exercice 3 : v-if/v-else 🔀

### Objectif : Affichage conditionnel

**Instructions :**

Crée un composant `LoginStatus.vue` qui :
- Affiche "Bienvenue !" si l'utilisateur est connecté
- Affiche "Veuillez vous connecter" sinon
- Un bouton pour basculer l'état

---
layout: exercices
---

# Solution Exercice 3 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isLoggedIn = ref(false)
const username = ref('Jean')

function toggleLogin() {
  isLoggedIn.value = !isLoggedIn.value
}
</script>
```

---
layout: exercices
---

# Solution Exercice 3 - Template ✅

```vue
<template>
  <div class="login-status">
    <div v-if="isLoggedIn" class="welcome">
      <h2>👋 Bienvenue {{ username }} !</h2>
      <p>Vous êtes connecté</p>
    </div>
    
    <div v-else class="login-prompt">
      <h2>🔐 Veuillez vous connecter</h2>
      <p>Accédez à votre espace personnel</p>
    </div>
    
    <button @click="toggleLogin">
      {{ isLoggedIn ? 'Se déconnecter' : 'Se connecter' }}
    </button>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 3 - Style ✅

```vue
<style scoped>
.login-status {
  padding: 2rem;
  text-align: center;
}

.welcome {
  background: #d4edda;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.login-prompt {
  background: #f8d7da;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>
```

---
layout: exercices
---

# Exercice 4 : v-for Liste 📋

### Objectif : Afficher une liste dynamique

**Instructions :**

Crée un composant `TodoList.vue` avec :
- Une liste de tâches
- Possibilité d'ajouter une tâche
- Possibilité de supprimer une tâche

---
layout: exercices
---

# Solution Exercice 4 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Todo {
  id: number
  text: string
}

const todos = ref<Todo[]>([
  { id: 1, text: 'Apprendre Vue.js' },
  { id: 2, text: 'Créer un projet' },
  { id: 3, text: 'Déployer en production' }
])

const newTodo = ref('')
let nextId = 4
</script>
```

---
layout: exercices
---

# Solution Exercice 4 - Script Suite ✅

```vue
<script setup lang="ts">
// ... suite du script

function addTodo() {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value
    })
    newTodo.value = ''
  }
}

function removeTodo(id: number) {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>
```

---
layout: exercices
---

# Solution Exercice 4 - Template ✅

```vue
<template>
  <div class="todo-list">
    <h2>📋 Ma Todo List</h2>
    
    <div class="add-todo">
      <input 
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="Nouvelle tâche..."
      />
      <button @click="addTodo">Ajouter</button>
    </div>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        {{ todo.text }}
        <button @click="removeTodo(todo.id)">❌</button>
      </li>
    </ul>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 4 - Style ✅

```vue
<style scoped>
.todo-list {
  max-width: 400px;
  padding: 1rem;
}

.add-todo {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  margin: 4px 0;
  background: #f5f5f5;
  border-radius: 4px;
}
</style>
```

---
layout: exercices
---

# Exercice 5 : Classes dynamiques 🎨

### Objectif : Appliquer des classes conditionnellement

**Instructions :**

Crée un composant `ThemeSwitcher.vue` avec :
- 3 boutons pour choisir un thème (light, dark, colorful)
- Le conteneur change de style selon le thème

---
layout: exercices
---

# Solution Exercice 5 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

type Theme = 'light' | 'dark' | 'colorful'

const currentTheme = ref<Theme>('light')

function setTheme(theme: Theme) {
  currentTheme.value = theme
}
</script>
```

---
layout: exercices
---

# Solution Exercice 5 - Template ✅

```vue
<template>
  <div 
    class="container" 
    :class="currentTheme"
  >
    <h2>Choisissez un thème</h2>
    
    <div class="buttons">
      <button 
        @click="setTheme('light')"
        :class="{ active: currentTheme === 'light' }"
      >
        ☀️ Light
      </button>
      <button 
        @click="setTheme('dark')"
        :class="{ active: currentTheme === 'dark' }"
      >
        🌙 Dark
      </button>
      <button 
        @click="setTheme('colorful')"
        :class="{ active: currentTheme === 'colorful' }"
      >
        🌈 Colorful
      </button>
    </div>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 5 - Style ✅

```vue
<style scoped>
.container {
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.light {
  background: #ffffff;
  color: #333;
}

.dark {
  background: #1a1a1a;
  color: #fff;
}

.colorful {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.active {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}
</style>
```

---
layout: exercices
---

# Exercice Bonus : Tableau filtrable 🔍

### Objectif : Combiner v-for et v-if correctement

**Instructions :**

Crée un composant `ProductList.vue` avec :
- Une liste de produits (nom, prix, catégorie)
- Un filtre par catégorie
- Affichage du nombre de résultats

---
layout: exercices
---

# Solution Bonus - Script ✅

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  price: number
  category: string
}

const products = ref<Product[]>([
  { id: 1, name: 'iPhone', price: 999, category: 'tech' },
  { id: 2, name: 'MacBook', price: 1999, category: 'tech' },
  { id: 3, name: 'T-Shirt', price: 29, category: 'fashion' },
  { id: 4, name: 'Jeans', price: 89, category: 'fashion' },
  { id: 5, name: 'Livre Vue.js', price: 45, category: 'books' }
])

const selectedCategory = ref('all')
</script>
```

---
layout: exercices
---

# Solution Bonus - Script Suite ✅

```vue
<script setup lang="ts">
// ... suite du script

const categories = computed(() => {
  const cats = products.value.map(p => p.category)
  return ['all', ...new Set(cats)]
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') {
    return products.value
  }
  return products.value.filter(
    p => p.category === selectedCategory.value
  )
})
</script>
```

---
layout: exercices
---

# Solution Bonus - Template ✅

```vue
<template>
  <div class="product-list">
    <h2>🛍️ Nos Produits</h2>
    
    <select v-model="selectedCategory">
      <option 
        v-for="cat in categories" 
        :key="cat" 
        :value="cat"
      >
        {{ cat === 'all' ? 'Toutes catégories' : cat }}
      </option>
    </select>
    
    <p>{{ filteredProducts.length }} produit(s) trouvé(s)</p>
    
    <ul>
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.name }} - {{ product.price }}€
      </li>
    </ul>
  </div>
</template>
```

---
layout: intro
---

# Bravo ! 🎉

Tu as terminé les exercices du Module 2 !

Tu maîtrises maintenant :
- ✅ L'interpolation `{{ }}`
- ✅ Les directives v-bind et v-on
- ✅ Le rendu conditionnel v-if/v-else
- ✅ Les boucles v-for avec :key
- ✅ Les classes et styles dynamiques

**Prochaine étape : Les Composants Vue.js ! 🧩**

