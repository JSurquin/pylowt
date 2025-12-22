---
layout: new-section
---

# Exercices Pratiques - Module 3 🎯

Pratiquons la création de composants !

---
layout: exercices
---

# Exercice 1 : Composant Button 🔘

### Objectif : Créer un bouton réutilisable avec props

**Instructions :**

Crée un composant `BaseButton.vue` avec :
- Props : `variant` (primary/secondary/danger), `size` (sm/md/lg)
- Un slot pour le contenu
- Émission d'un événement click

---
layout: exercices
---

# Solution Exercice 1 - Script ✅

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit('click', event)
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
  <button
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
```

---
layout: exercices
---

# Solution Exercice 1 - Style Partie 1 ✅

```vue
<style scoped>
.btn {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--primary {
  background: #42b883;
  color: white;
}

.btn--secondary {
  background: #e0e0e0;
  color: #333;
}

.btn--danger {
  background: #e74c3c;
  color: white;
}
</style>
```

---
layout: exercices
---

# Solution Exercice 1 - Style Partie 2 ✅

```vue
<style scoped>
/* ... suite des styles */

.btn--sm {
  padding: 6px 12px;
  font-size: 0.875rem;
}

.btn--md {
  padding: 10px 20px;
  font-size: 1rem;
}

.btn--lg {
  padding: 14px 28px;
  font-size: 1.125rem;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
</style>
```

---
layout: exercices
---

# Exercice 2 : Composant Card avec slots 🃏

### Objectif : Créer une carte avec slots nommés

**Instructions :**

Crée un composant `BaseCard.vue` avec :
- Un slot "header" pour le titre
- Un slot par défaut pour le contenu
- Un slot "footer" optionnel

---
layout: exercices
---

# Solution Exercice 2 - Template ✅

```vue
<template>
  <div class="card">
    <header v-if="$slots.header" class="card-header">
      <slot name="header" />
    </header>
    
    <div class="card-body">
      <slot />
    </div>
    
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 2 - Style ✅

```vue
<style scoped>
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  background: #f9f9f9;
}
</style>
```

---
layout: exercices
---

# Solution Exercice 2 - Utilisation ✅

```vue
<template>
  <BaseCard>
    <template #header>
      <h3>Titre de la carte</h3>
    </template>
    
    <p>Contenu principal de la carte.</p>
    
    <template #footer>
      <BaseButton size="sm">Action</BaseButton>
    </template>
  </BaseCard>
</template>
```

---
layout: exercices
---

# Exercice 3 : Liste avec scoped slots 📋

### Objectif : Créer une liste personnalisable

**Instructions :**

Crée un composant `ItemList.vue` avec :
- Une prop `items` (tableau)
- Un scoped slot pour personnaliser l'affichage de chaque item

---
layout: exercices
---

# Solution Exercice 3 - Script ✅

```vue
<script setup lang="ts">
interface Props {
  items: unknown[]
  emptyMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  emptyMessage: 'Aucun élément'
})
</script>
```

---
layout: exercices
---

# Solution Exercice 3 - Template ✅

```vue
<template>
  <ul v-if="items.length" class="item-list">
    <li 
      v-for="(item, index) in items" 
      :key="index"
      class="item"
    >
      <slot 
        :item="item" 
        :index="index"
        :isFirst="index === 0"
        :isLast="index === items.length - 1"
      >
        {{ item }}
      </slot>
    </li>
  </ul>
  
  <p v-else class="empty">{{ emptyMessage }}</p>
</template>
```

---
layout: exercices
---

# Solution Exercice 3 - Utilisation ✅

```vue
<template>
  <ItemList :items="users">
    <template #default="{ item, index, isFirst }">
      <div class="user-row">
        <span v-if="isFirst">👑</span>
        <strong>{{ index + 1 }}.</strong>
        {{ item.name }} - {{ item.email }}
      </div>
    </template>
  </ItemList>
</template>
```

---
layout: exercices
---

# Exercice 4 : Provide/Inject Theme 🎨

### Objectif : Créer un système de thème

**Instructions :**

Crée :
- Un composant `ThemeProvider.vue` qui fournit le thème
- Un composant `ThemedBox.vue` qui consomme le thème

---
layout: exercices
---

# Solution Exercice 4 - ThemeProvider ✅

```vue
<!-- ThemeProvider.vue -->
<script setup lang="ts">
import { provide, ref } from 'vue'

type Theme = 'light' | 'dark'

const currentTheme = ref<Theme>('light')

function toggleTheme() {
  currentTheme.value = currentTheme.value === 'light' 
    ? 'dark' 
    : 'light'
}

provide('theme', currentTheme)
provide('toggleTheme', toggleTheme)
</script>

<template>
  <div :class="['theme-provider', currentTheme]">
    <slot />
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 4 - ThemedBox ✅

```vue
<!-- ThemedBox.vue -->
<script setup lang="ts">
import { inject, Ref } from 'vue'

const theme = inject<Ref<string>>('theme')
const toggleTheme = inject<() => void>('toggleTheme')
</script>

<template>
  <div :class="['themed-box', theme]">
    <slot />
    <button @click="toggleTheme">
      {{ theme === 'light' ? '🌙' : '☀️' }} Toggle
    </button>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 4 - Styles ✅

```vue
<style scoped>
.themed-box {
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.3s;
}

.themed-box.light {
  background: #ffffff;
  color: #333;
}

.themed-box.dark {
  background: #1a1a2e;
  color: #eee;
}
</style>
```

---
layout: exercices
---

# Exercice 5 : Modal avec Teleport 🎭

### Objectif : Créer une modale avec Teleport

**Instructions :**

Crée un composant `Modal.vue` avec :
- Props : `isOpen`, `title`
- Teleport vers `body`
- Fermeture au clic sur l'overlay

---
layout: exercices
---

# Solution Exercice 5 - Script ✅

```vue
<script setup lang="ts">
interface Props {
  isOpen: boolean
  title?: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

function handleOverlayClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}
</script>
```

---
layout: exercices
---

# Solution Exercice 5 - Template ✅

```vue
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen" 
        class="modal-overlay"
        @click="handleOverlayClick"
      >
        <div class="modal-content">
          <header v-if="title" class="modal-header">
            <h2>{{ title }}</h2>
            <button @click="emit('close')" class="close-btn">
              ✕
            </button>
          </header>
          
          <div class="modal-body">
            <slot />
          </div>
          
          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

---
layout: exercices
---

# Solution Exercice 5 - Style Partie 1 ✅

```vue
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: auto;
}
</style>
```

---
layout: exercices
---

# Solution Exercice 5 - Style Partie 2 ✅

```vue
<style scoped>
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```

---
layout: exercices
---

# Solution Exercice 5 - Utilisation ✅

```vue
<script setup>
import { ref } from 'vue'
import Modal from './Modal.vue'

const showModal = ref(false)
</script>

<template>
  <button @click="showModal = true">Ouvrir</button>
  
  <Modal 
    :is-open="showModal" 
    title="Ma Modale"
    @close="showModal = false"
  >
    <p>Contenu de la modale</p>
    
    <template #footer>
      <button @click="showModal = false">Fermer</button>
    </template>
  </Modal>
</template>
```

---
layout: intro
---

# Bravo ! 🎉

Tu as terminé les exercices du Module 4 !

Tu maîtrises maintenant :
- ✅ Créer des composants avec props et emits
- ✅ Utiliser les slots (default, nommés, scoped)
- ✅ Provide/Inject pour le contexte global
- ✅ Teleport pour les modales
- ✅ Les patterns de composants réutilisables

**Fin du Jour 1 ! Demain : La Composition API ! 🎯**

