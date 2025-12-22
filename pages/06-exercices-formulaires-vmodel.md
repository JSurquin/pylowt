---
layout: new-section
---

# Exercices Pratiques - Module 6 🎯

Pratiquons les formulaires et v-model !

---
layout: exercices
---

# Exercice 1 : Formulaire d'inscription 📝

### Objectif : Créer un formulaire complet

**Instructions :**

Crée un composant `SignupForm.vue` avec :
- Champs : email, password, confirmPassword
- Validation en temps réel
- Message d'erreur si les passwords ne correspondent pas

---
layout: exercices
---

# Solution Exercice 1 - Script ✅

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const isEmailValid = computed(() => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const isPasswordValid = computed(() => 
  password.value.length >= 8
)

const passwordsMatch = computed(() => 
  password.value === confirmPassword.value
)

const isFormValid = computed(() => 
  isEmailValid.value && 
  isPasswordValid.value && 
  passwordsMatch.value
)
</script>
```

---
layout: exercices
---

# Solution Exercice 1 - Script Suite ✅

```vue
<script setup lang="ts">
// ... suite du script

function handleSubmit() {
  if (isFormValid.value) {
    console.log('Inscription:', {
      email: email.value,
      password: password.value
    })
    alert('Inscription réussie !')
  }
}
</script>
```

---
layout: exercices
---

# Solution Exercice 1 - Template ✅

```vue
<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="field">
      <label>Email</label>
      <input v-model.trim="email" type="email" />
      <span v-if="email && !isEmailValid" class="error">
        Email invalide
      </span>
    </div>
    
    <div class="field">
      <label>Mot de passe</label>
      <input v-model="password" type="password" />
      <span v-if="password && !isPasswordValid" class="error">
        8 caractères minimum
      </span>
    </div>
    
    <div class="field">
      <label>Confirmer</label>
      <input v-model="confirmPassword" type="password" />
      <span v-if="confirmPassword && !passwordsMatch" class="error">
        Les mots de passe ne correspondent pas
      </span>
    </div>
    
    <button :disabled="!isFormValid">S'inscrire</button>
  </form>
</template>
```

---
layout: exercices
---

# Solution Exercice 1 - Style ✅

```vue
<style scoped>
.form {
  max-width: 400px;
}

.field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: #e74c3c;
  font-size: 0.875rem;
}

button:disabled {
  opacity: 0.5;
}
</style>
```

---
layout: exercices
---

# Exercice 2 : Sondage multi-choix 📊

### Objectif : Gérer différents types d'inputs

**Instructions :**

Crée un composant `Survey.vue` avec :
- Radio buttons pour le genre
- Checkboxes pour les intérêts
- Select pour le pays
- Affichage des résultats

---
layout: exercices
---

# Solution Exercice 2 - Script ✅

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const gender = ref('')
const interests = ref<string[]>([])
const country = ref('')

const genderOptions = [
  { value: 'male', label: 'Homme' },
  { value: 'female', label: 'Femme' },
  { value: 'other', label: 'Autre' }
]

const interestOptions = [
  'Technologie', 'Sport', 'Musique', 'Voyage', 'Cuisine'
]

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
  { value: 'ch', label: 'Suisse' },
  { value: 'ca', label: 'Canada' }
]

const isComplete = computed(() => 
  gender.value && interests.value.length > 0 && country.value
)
</script>
```

---
layout: exercices
---

# Solution Exercice 2 - Template Partie 1 ✅

```vue
<template>
  <div class="survey">
    <h2>Sondage</h2>
    
    <!-- Genre -->
    <fieldset>
      <legend>Genre</legend>
      <label v-for="opt in genderOptions" :key="opt.value">
        <input 
          type="radio" 
          :value="opt.value" 
          v-model="gender"
        />
        {{ opt.label }}
      </label>
    </fieldset>
    
    <!-- Suite dans la slide suivante -->
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 2 - Template Partie 2 ✅

```vue
<template>
  <div class="survey">
    <!-- ... genre ... -->
    
    <!-- Intérêts -->
    <fieldset>
      <legend>Intérêts (plusieurs choix)</legend>
      <label v-for="interest in interestOptions" :key="interest">
        <input 
          type="checkbox" 
          :value="interest" 
          v-model="interests"
        />
        {{ interest }}
      </label>
    </fieldset>
    
    <!-- Pays -->
    <div class="field">
      <label>Pays</label>
      <select v-model="country">
        <option value="" disabled>Sélectionner...</option>
        <option 
          v-for="c in countries" 
          :key="c.value" 
          :value="c.value"
        >
          {{ c.label }}
        </option>
      </select>
    </div>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 2 - Template Partie 3 ✅

```vue
<template>
  <div class="survey">
    <!-- ... formulaire ... -->
    
    <!-- Résultats -->
    <div v-if="isComplete" class="results">
      <h3>Vos réponses :</h3>
      <p>Genre : {{ gender }}</p>
      <p>Intérêts : {{ interests.join(', ') }}</p>
      <p>Pays : {{ country }}</p>
    </div>
  </div>
</template>
```

---
layout: exercices
---

# Exercice 3 : Input personnalisé 🧩

### Objectif : Créer un composant input réutilisable

**Instructions :**

Crée un composant `BaseInput.vue` avec :
- Props : label, type, placeholder, error
- Support de v-model avec defineModel
- Affichage conditionnel de l'erreur

---
layout: exercices
---

# Solution Exercice 3 - Script ✅

```vue
<script setup lang="ts">
interface Props {
  label?: string
  type?: string
  placeholder?: string
  error?: string
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: ''
})

const model = defineModel<string>()
</script>
```

---
layout: exercices
---

# Solution Exercice 3 - Template ✅

```vue
<template>
  <div class="base-input">
    <label v-if="label" class="label">
      {{ label }}
    </label>
    
    <input 
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :class="{ 'has-error': error }"
    />
    
    <span v-if="error" class="error">
      {{ error }}
    </span>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 3 - Style ✅

```vue
<style scoped>
.base-input {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.2s;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

input.has-error {
  border-color: #e74c3c;
}

.error {
  display: block;
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
</style>
```

---
layout: exercices
---

# Solution Exercice 3 - Utilisation ✅

```vue
<script setup>
import { ref, computed } from 'vue'
import BaseInput from './BaseInput.vue'

const email = ref('')

const emailError = computed(() => {
  if (!email.value) return ''
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    return 'Email invalide'
  }
  return ''
})
</script>

<template>
  <BaseInput 
    v-model="email"
    label="Email"
    type="email"
    placeholder="votre@email.com"
    :error="emailError"
  />
</template>
```

---
layout: exercices
---

# Exercice 4 : Rating component ⭐

### Objectif : Créer un composant de notation avec v-model

**Instructions :**

Crée un composant `RatingStars.vue` avec :
- Affiche 5 étoiles cliquables
- Support v-model pour la note (1-5)
- Effet hover

---
layout: exercices
---

# Solution Exercice 4 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

const model = defineModel<number>({ default: 0 })
const hoverRating = ref(0)

function setRating(value: number) {
  model.value = value
}

function setHover(value: number) {
  hoverRating.value = value
}

function resetHover() {
  hoverRating.value = 0
}
</script>
```

---
layout: exercices
---

# Solution Exercice 4 - Template ✅

```vue
<template>
  <div class="rating" @mouseleave="resetHover">
    <span 
      v-for="star in 5" 
      :key="star"
      class="star"
      :class="{ 
        filled: star <= (hoverRating || model),
        hovered: star <= hoverRating
      }"
      @click="setRating(star)"
      @mouseenter="setHover(star)"
    >
      ★
    </span>
    <span class="value">{{ model }}/5</span>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 4 - Style ✅

```vue
<style scoped>
.rating {
  display: flex;
  align-items: center;
  gap: 4px;
}

.star {
  font-size: 2rem;
  cursor: pointer;
  color: #ddd;
  transition: all 0.2s;
}

.star.filled {
  color: #f1c40f;
}

.star.hovered {
  transform: scale(1.2);
}

.value {
  margin-left: 1rem;
  font-weight: bold;
}
</style>
```

---
layout: exercices
---

# Solution Exercice 4 - Utilisation ✅

```vue
<script setup>
import { ref } from 'vue'
import RatingStars from './RatingStars.vue'

const rating = ref(3)
</script>

<template>
  <h3>Notez ce produit</h3>
  <RatingStars v-model="rating" />
  <p>Vous avez donné {{ rating }} étoile(s)</p>
</template>
```

---
layout: exercices
---

# Exercice Bonus : Formulaire dynamique 🔄

### Objectif : Ajouter/supprimer des champs dynamiquement

**Instructions :**

Crée un composant `DynamicForm.vue` avec :
- Un tableau d'items avec nom et valeur
- Boutons + et - pour ajouter/supprimer des lignes

---
layout: exercices
---

# Solution Bonus - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: number
  name: string
  value: string
}

const items = ref<Item[]>([
  { id: 1, name: '', value: '' }
])

let nextId = 2

function addItem() {
  items.value.push({ id: nextId++, name: '', value: '' })
}

function removeItem(id: number) {
  if (items.value.length > 1) {
    items.value = items.value.filter(item => item.id !== id)
  }
}
</script>
```

---
layout: exercices
---

# Solution Bonus - Template ✅

```vue
<template>
  <div class="dynamic-form">
    <div 
      v-for="item in items" 
      :key="item.id" 
      class="row"
    >
      <input 
        v-model="item.name" 
        placeholder="Nom"
      />
      <input 
        v-model="item.value" 
        placeholder="Valeur"
      />
      <button 
        @click="removeItem(item.id)"
        :disabled="items.length === 1"
      >
        ❌
      </button>
    </div>
    
    <button @click="addItem" class="add-btn">
      ➕ Ajouter une ligne
    </button>
    
    <pre>{{ JSON.stringify(items, null, 2) }}</pre>
  </div>
</template>
```

---
layout: intro
---

# Bravo ! 🎉

Tu as terminé les exercices du Module 6 !

Tu maîtrises maintenant :
- ✅ Les formulaires avec v-model
- ✅ Les différents types d'inputs
- ✅ Les composants input personnalisés
- ✅ defineModel() de Vue 3.4
- ✅ Les formulaires dynamiques

**Fin du Jour 2 ! Demain : Vue Router ! 🛤️**

