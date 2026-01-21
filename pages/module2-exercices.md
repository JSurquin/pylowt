---
layout: exercices
routeAlias: 'module2-exercices'
---

# Exercices Pratiques
## Module 2 - Slots et composants génériques

---

# Exercice 1 - Card avec slots

### Objectif
Créer un composant Card générique avec header, body et footer

### Spécifications

- Slot nommé "header" pour l'en-tête
- Slot par défaut pour le contenu principal
- Slot nommé "footer" pour le pied de page
- Contenu fallback pour chaque slot
- Prop `variant` (default, primary, danger)

---

# Exercice 1 - Solution Card.vue (1/2)

```vue
<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => {
      return ['default', 'primary', 'danger'].includes(value);
    }
  }
});
</script>
```

---

# Exercice 1 - Solution Card.vue (2/2)

```vue
<template>
  <div class="card" :class="`card-${variant}`">
    <header v-if="$slots.header" class="card-header">
      <slot name="header"></slot>
    </header>
    
    <div class="card-body">
      <slot>
        <p class="placeholder">Contenu de la carte</p>
      </slot>
    </div>
    
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  padding: 1rem;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 1rem;
}

.card-footer {
  padding: 1rem;
  background: #f5f5f5;
  border-top: 1px solid #ddd;
}

.card-primary {
  border-color: #42b883;
}

.card-danger {
  border-color: #f56c6c;
}
</style>
```

---

# Exercice 1 - Utilisation

```vue
<template>
  <div class="demo">
    <Card variant="primary">
      <template #header>
        <h2>Mon Titre</h2>
      </template>
      
      <p>Contenu principal de la carte</p>
      <p>Encore du contenu...</p>
      
      <template #footer>
        <button>Action</button>
      </template>
    </Card>
    
    <Card variant="danger">
      <template #header>
        <h2>⚠️ Attention</h2>
      </template>
      
      <p>Message d'avertissement</p>
    </Card>
  </div>
</template>
```

---

# Exercice 2 - Modal réutilisable

### Objectif
Créer un composant Modal avec props et slots

### Spécifications

- Prop `show` pour afficher/masquer
- Prop `title` pour le titre
- Prop `size` (small, medium, large)
- Slot "header" pour personnaliser l'en-tête
- Slot par défaut pour le contenu
- Slot "footer" pour les actions
- Événement `close` pour fermer
- Fermeture sur clic extérieur
- Fermeture sur touche Escape

---

# Exercice 2 - Solution Modal.vue (1/3)

```vue
<script setup>
import { onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  title: String,
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large'].includes(v)
  },
  closeOnClickOutside: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const handleEscape = (e) => {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
};
```

---

# Exercice 2 - Solution Modal.vue (2/3)

```vue
onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
});

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

const handleOverlayClick = () => {
  if (props.closeOnClickOutside) {
    emit('close');
  }
};
</script>
```

---

# Exercice 2 - Solution Modal.vue (3/3)

```vue
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="handleOverlayClick">
        <div 
          class="modal-content" 
          :class="`modal-${size}`"
          @click.stop
        >
          <header class="modal-header">
            <slot name="header">
              <h2>{{ title }}</h2>
            </slot>
            <button class="close-btn" @click="emit('close')">×</button>
          </header>
          
          <div class="modal-body">
            <slot></slot>
          </div>
          
          <footer v-if="$slots.footer" class="modal-footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

---

# Exercice 2 - Styles Modal

```vue
<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-small { width: 400px; }
.modal-medium { width: 600px; }
.modal-large { width: 800px; }

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #6b7280;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
```

---

# Exercice 2 - Utilisation du Modal

```vue
<script setup>
import { ref } from 'vue';
import Modal from './components/Modal.vue';

const showModal = ref(false);
const showConfirm = ref(false);

const handleConfirm = () => {
  console.log('Confirmé!');
  showConfirm.value = false;
};
</script>

<template>
  <div>
    <button @click="showModal = true">Ouvrir Modal</button>
    <button @click="showConfirm = true">Confirmation</button>
    
    <Modal :show="showModal" @close="showModal = false">
      <template #header>
        <h2>Mon Modal</h2>
      </template>
      
      <p>Contenu du modal...</p>
      
      <template #footer>
        <button @click="showModal = false">Fermer</button>
      </template>
    </Modal>
  </div>
</template>
```

---

# Exercice 3 - DataTable avec scoped slots

### Objectif
Créer un tableau générique avec colonnes personnalisables

### Spécifications

- Props: `items` (données), `columns` (configuration colonnes)
- Scoped slot par défaut pour les cellules
- Scoped slots nommés par colonne
- Slot "empty" si pas de données
- Slot "header" pour en-tête personnalisé
- Gestion du tri (bonus)
- Pagination (bonus)

---

# Exercice 3 - Solution DataTable.vue (1/2)

```vue
<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  columns: {
    type: Array,
    required: true
  }
});

const sortKey = ref('');
const sortOrder = ref('asc');

const sortedItems = computed(() => {
  if (!sortKey.value) return props.items;
  
  return [...props.items].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];
    const order = sortOrder.value === 'asc' ? 1 : -1;
    
    if (aVal < bVal) return -1 * order;
    if (aVal > bVal) return 1 * order;
    return 0;
  });
});
```

---

# Exercice 3 - Solution DataTable.vue (2/2)

```vue
const handleSort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};
</script>

<template>
  <div class="data-table">
    <div v-if="items.length === 0" class="empty">
      <slot name="empty">
        <p>Aucune donnée disponible</p>
      </slot>
    </div>
    
    <table v-else>
      <thead>
        <tr>
          <th 
            v-for="col in columns" 
            :key="col.key"
            @click="col.sortable && handleSort(col.key)"
            :class="{ sortable: col.sortable }"
          >
            <slot 
              :name="`header-${col.key}`" 
              :column="col"
            >
              {{ col.label }}
              <span v-if="sortKey === col.key">
                {{ sortOrder === 'asc' ? '▲' : '▼' }}
              </span>
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in sortedItems" :key="item.id || index">
          <td v-for="col in columns" :key="col.key">
            <slot 
              :name="col.key" 
              :item="item" 
              :value="item[col.key]"
              :index="index"
            >
              {{ item[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

---

# Exercice 3 - Styles DataTable

```vue
<style scoped>
.data-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f9fafb;
  font-weight: 600;
}

th.sortable {
  cursor: pointer;
  user-select: none;
}

th.sortable:hover {
  background: #f3f4f6;
}

tr:hover {
  background: #f9fafb;
}

.empty {
  padding: 2rem;
  text-align: center;
  color: #6b7280;
}
</style>
```

---

# Exercice 3 - Utilisation DataTable

```vue
<script setup>
import { ref } from 'vue';
import DataTable from './components/DataTable.vue';

const users = ref([
  { id: 1, nom: 'Alice', email: 'alice@ex.com', role: 'admin' },
  { id: 2, nom: 'Bob', email: 'bob@ex.com', role: 'user' },
  { id: 3, nom: 'Charlie', email: 'charlie@ex.com', role: 'user' }
]);

const columns = [
  { key: 'nom', label: 'Nom', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Rôle', sortable: false },
  { key: 'actions', label: 'Actions', sortable: false }
];

const deleteUser = (id) => {
  users.value = users.value.filter(u => u.id !== id);
};
</script>
```

---

# Exercice 3 - Template avec slots

```vue
<template>
  <DataTable :items="users" :columns="columns">
    <template #nom="{ value }">
      <strong>{{ value }}</strong>
    </template>
    
    <template #email="{ value }">
      <a :href="`mailto:${value}`">{{ value }}</a>
    </template>
    
    <template #role="{ value }">
      <span 
        class="badge" 
        :class="value === 'admin' ? 'badge-primary' : 'badge-default'"
      >
        {{ value }}
      </span>
    </template>
    
    <template #actions="{ item }">
      <button @click="deleteUser(item.id)">Supprimer</button>
    </template>
  </DataTable>
</template>
```

---

# Exercice 4 - Layout avec slots

### Objectif
Créer un layout de page complet

### Spécifications

- Slot "sidebar" pour menu latéral
- Slot "header" pour en-tête
- Slot par défaut pour contenu principal
- Slot "footer" pour pied de page
- Props pour contrôler la largeur de la sidebar
- Props pour afficher/masquer des sections
- Responsive (mobile, tablet, desktop)

---

# Exercice 4 - Solution AppLayout.vue (1/2)

```vue
<script setup>
import { ref } from 'vue';

const props = defineProps({
  sidebarWidth: {
    type: String,
    default: '250px'
  },
  showSidebar: {
    type: Boolean,
    default: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  showFooter: {
    type: Boolean,
    default: true
  }
});

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>
```

---

# Exercice 4 - Solution AppLayout.vue (2/2)

```vue
<template>
  <div class="app-layout">
    <aside 
      v-if="showSidebar"
      class="sidebar"
      :class="{ 'sidebar-closed': !isSidebarOpen }"
      :style="{ width: sidebarWidth }"
    >
      <slot name="sidebar"></slot>
    </aside>
    
    <div class="main-wrapper">
      <header v-if="showHeader" class="header">
        <button class="menu-toggle" @click="toggleSidebar">
          ☰
        </button>
        <slot name="header"></slot>
      </header>
      
      <main class="content">
        <slot></slot>
      </main>
      
      <footer v-if="showFooter" class="footer">
        <slot name="footer">
          <p>© 2025 Mon Application</p>
        </slot>
      </footer>
    </div>
  </div>
</template>
```

---

# Exercice 4 - Styles Layout

```vue
<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  background: #1f2937;
  color: white;
  transition: transform 0.3s ease;
}

.sidebar-closed {
  transform: translateX(-100%);
}

.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  background: white;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 2rem;
}

.footer {
  background: #f9fafb;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
  text-align: center;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 100;
  }
}
</style>
```

---

# Exercice 5 - Tabs avec slots

### Objectif
Créer un système d'onglets réutilisable

### Spécifications

- Composant `Tabs` (conteneur)
- Composant `Tab` (bouton d'onglet)
- Composant `TabPanel` (contenu)
- Communication via provide/inject
- Onglet actif par défaut
- Événement `change` lors du changement
- Animations de transition

---

# Exercice 5 - Solution Tabs.vue

```vue
<script setup>
import { ref, provide } from 'vue';

const props = defineProps({
  defaultTab: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['change']);

const activeTab = ref(props.defaultTab);

const setActiveTab = (index) => {
  activeTab.value = index;
  emit('change', index);
};

provide('tabsState', {
  activeTab,
  setActiveTab
});
</script>

<template>
  <div class="tabs">
    <div class="tabs-header">
      <slot name="tabs"></slot>
    </div>
    
    <div class="tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
}

.tabs-header {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.tabs-content {
  padding: 1.5rem;
}
</style>
```

---

# Exercice 5 - Solution Tab.vue

```vue
<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  disabled: Boolean
});

const tabsState = inject('tabsState');

const isActive = computed(() => {
  return tabsState.activeTab.value === props.index;
});

const handleClick = () => {
  if (!props.disabled) {
    tabsState.setActiveTab(props.index);
  }
};
</script>

<template>
  <button
    class="tab"
    :class="{ active: isActive, disabled: disabled }"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.tab {
  padding: 1rem 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #6b7280;
  transition: all 0.2s;
}

.tab:hover:not(.disabled) {
  background: #f3f4f6;
}

.tab.active {
  color: #42b883;
  border-bottom: 2px solid #42b883;
  font-weight: 600;
}

.tab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
```

---

# Exercice 5 - Solution TabPanel.vue

```vue
<script setup>
import { inject, computed } from 'vue';

const props = defineProps({
  index: {
    type: Number,
    required: true
  }
});

const tabsState = inject('tabsState');

const isActive = computed(() => {
  return tabsState.activeTab.value === props.index;
});
</script>

<template>
  <Transition name="tab">
    <div v-if="isActive" class="tab-panel">
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.tab-panel {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.tab-enter-active,
.tab-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.tab-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.tab-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

---

# Exercice 5 - Utilisation Tabs

```vue
<script setup>
import Tabs from './components/Tabs.vue';
import Tab from './components/Tab.vue';
import TabPanel from './components/TabPanel.vue';

const handleTabChange = (index) => {
  console.log('Onglet actif:', index);
};
</script>

<template>
  <Tabs :default-tab="0" @change="handleTabChange">
    <template #tabs>
      <Tab :index="0">Profil</Tab>
      <Tab :index="1">Paramètres</Tab>
      <Tab :index="2">Notifications</Tab>
      <Tab :index="3" :disabled="true">Admin</Tab>
    </template>
    
    <TabPanel :index="0">
      <h2>Profil</h2>
      <p>Informations du profil utilisateur...</p>
    </TabPanel>
    
    <TabPanel :index="1">
      <h2>Paramètres</h2>
      <p>Configuration de l'application...</p>
    </TabPanel>
    
    <TabPanel :index="2">
      <h2>Notifications</h2>
      <p>Gérer vos notifications...</p>
    </TabPanel>
  </Tabs>
</template>
```

---

# Exercice 6 - Dropdown avec scoped slots

### Objectif
Créer un menu déroulant réutilisable

### Spécifications

- Scoped slot "trigger" avec état `isOpen`
- Slot par défaut pour le contenu du menu
- Fermeture sur clic extérieur
- Fermeture sur Escape
- Méthode `close` fournie au slot
- Positions configurables (bottom, top, left, right)
- Animations

---

# Exercice 6 - Solution Dropdown.vue (1/2)

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  position: {
    type: String,
    default: 'bottom',
    validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v)
  }
});

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const close = () => {
  isOpen.value = false;
};

const handleClickOutside = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    close();
  }
};
```

---

# Exercice 6 - Solution Dropdown.vue (2/2)

```vue
const handleEscape = (e) => {
  if (e.key === 'Escape') {
    close();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  document.removeEventListener('keydown', handleEscape);
});
</script>

<template>
  <div ref="dropdownRef" class="dropdown">
    <div class="dropdown-trigger" @click="toggle">
      <slot name="trigger" :isOpen="isOpen" :toggle="toggle">
        <button>Menu ▼</button>
      </slot>
    </div>
    
    <Transition name="dropdown">
      <div 
        v-if="isOpen" 
        class="dropdown-menu"
        :class="`position-${position}`"
      >
        <slot :close="close" :isOpen="isOpen"></slot>
      </div>
    </Transition>
  </div>
</template>
```

---

# Exercice 6 - Styles Dropdown

```vue
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 100;
}

.position-bottom {
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
}

.position-top {
  bottom: 100%;
  left: 0;
  margin-bottom: 0.5rem;
}

.position-right {
  left: 100%;
  top: 0;
  margin-left: 0.5rem;
}

.position-left {
  right: 100%;
  top: 0;
  margin-right: 0.5rem;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

---

# Projet Fil Rouge - Partie 2

### Enrichir l'application de produits

**Objectif**: Utiliser les composants génériques créés

1. **Remplacer les cartes produits** par le composant Card
2. **Ajouter un Modal** pour éditer/ajouter des produits
3. **Utiliser DataTable** pour une vue tableau des produits
4. **Créer un Layout** pour l'application
5. **Ajouter des Tabs** : Vue liste / Vue tableau / Statistiques
6. **Dropdown** pour actions rapides sur chaque produit

---

# Projet Fil Rouge - Structure

```vue
<template>
  <AppLayout>
    <template #sidebar>
      <nav>
        <a href="#produits">Produits</a>
        <a href="#categories">Catégories</a>
        <a href="#stats">Statistiques</a>
      </nav>
    </template>
    
    <template #header>
      <h1>Gestion des Produits</h1>
      <button @click="showAddModal = true">
        Ajouter un produit
      </button>
    </template>
    
    <Tabs>
      <template #tabs>
        <Tab :index="0">Liste</Tab>
        <Tab :index="1">Tableau</Tab>
        <Tab :index="2">Stats</Tab>
      </template>
      
      <TabPanel :index="0">
        <!-- Vue liste avec Cards -->
      </TabPanel>
      
      <TabPanel :index="1">
        <!-- Vue DataTable -->
      </TabPanel>
      
      <TabPanel :index="2">
        <!-- Statistiques -->
      </TabPanel>
    </Tabs>
  </AppLayout>
</template>
```

---

# Checklist de validation

Avant de passer au Module 3, assurez-vous de maîtriser :

- ✅ Comprendre le concept de slots
- ✅ Créer des slots simples avec contenu fallback
- ✅ Utiliser des slots nommés
- ✅ Maîtriser la directive v-slot et sa syntaxe abrégée
- ✅ Implémenter des scoped slots
- ✅ Créer des composants génériques réutilisables
- ✅ Combiner props et slots efficacement
- ✅ Détecter la présence de slots
- ✅ Utiliser provide/inject avec slots
- ✅ Créer des composants de layout complexes
