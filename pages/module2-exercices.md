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
<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['default', 'primary', 'danger'].includes(value);
      }
    }
  }
}
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
<script>
export default {
  props: {
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
  },
  emits: ['close'],
  methods: {
    handleEscape(e) {
      if (e.key === 'Escape' && this.show) {
        this.$emit('close');
      }
    }
  }
}
```

---

# Exercice 2 - Solution Modal.vue (2/3)

```vue
export default {
  // ... props et emits précédents
  methods: {
    handleEscape(e) {
      if (e.key === 'Escape' && this.show) {
        this.$emit('close');
      }
    },
    handleOverlayClick() {
      if (this.closeOnClickOutside) {
        this.$emit('close');
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscape);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscape);
  }
}
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

# Exercice 2 - Styles Modal (1/3)

**Styles overlay et content :**

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
</style>
```

---

# Exercice 2 - Styles Modal (2/3)

**Styles header, body, footer :**

```vue
<style scoped>
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
</style>
```

---

# Exercice 2 - Styles Modal (3/3)

**Animations :**

```vue
<style scoped>
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
<script>
import Modal from './components/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
      showConfirm: false
    }
  },
  methods: {
    handleConfirm() {
      console.log('Confirmé!');
      this.showConfirm = false;
    }
  }
}
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
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortKey: '',
      sortOrder: 'asc'
    }
  },
  computed: {
    sortedItems() {
      if (!this.sortKey) return this.items;
      
      return [...this.items].sort((a, b) => {
        const aVal = a[this.sortKey];
        const bVal = b[this.sortKey];
        const order = this.sortOrder === 'asc' ? 1 : -1;
        
        if (aVal < bVal) return -1 * order;
        if (aVal > bVal) return 1 * order;
        return 0;
      });
    }
  }
}
```

---

# Exercice 3 - Solution DataTable.vue (2/3)

**Méthodes :**

```vue
export default {
  // ... props, data, computed précédents
  methods: {
    handleSort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    }
  }
}
</script>
```

---

# Exercice 3 - Solution DataTable.vue (3/3)

**Template :**

```vue
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
<script>
import DataTable from './components/DataTable.vue';

export default {
  components: {
    DataTable
  },
  data() {
    return {
      users: [
        { id: 1, nom: 'Alice', email: 'alice@ex.com', role: 'admin' },
        { id: 2, nom: 'Bob', email: 'bob@ex.com', role: 'user' },
        { id: 3, nom: 'Charlie', email: 'charlie@ex.com', role: 'user' }
      ],
      columns: [
        { key: 'nom', label: 'Nom', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'role', label: 'Rôle', sortable: false },
        { key: 'actions', label: 'Actions', sortable: false }
      ]
    }
  },
  methods: {
    deleteUser(id) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }
}
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
<script>
export default {
  props: {
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
  },
  data() {
    return {
      isSidebarOpen: true
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
}
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

# Exercice 4 - Styles Layout (1/2)

**Styles principaux :**

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
</style>
```

---

# Exercice 4 - Styles Layout (2/2)

**Styles responsive :**

```vue
<style scoped>
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

# Exercice 5 - Solution Tabs.vue (1/3)

**Script :**

```vue
<script>
export default {
  props: {
    defaultTab: {
      type: Number,
      default: 0
    }
  },
  emits: ['change'],
  data() {
    return {
      activeTab: this.defaultTab
    }
  },
  provide() {
    return {
      activeTab: this.activeTab,
      setActiveTab: this.setActiveTab
    }
  },
  methods: {
    setActiveTab(index) {
      this.activeTab = index;
      this.$emit('change', index);
    }
  }
}
</script>
```

---

# Exercice 5 - Solution Tabs.vue (2/3)

**Template :**

```vue
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
```

---

# Exercice 5 - Solution Tabs.vue (3/3)

**Styles :**

```vue
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

# Exercice 5 - Solution Tab.vue (1/3)

**Script :**

```vue
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    },
    disabled: Boolean
  },
  inject: ['activeTab', 'setActiveTab'],
  computed: {
    isActive() {
      return this.activeTab === this.index;
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.setActiveTab(this.index);
      }
    }
  }
}
</script>
```

---

# Exercice 5 - Solution Tab.vue (2/3)

**Template :**

```vue
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
```

---

# Exercice 5 - Solution Tab.vue (3/3)

**Styles :**

```vue
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

# Exercice 5 - Solution TabPanel.vue (1/2)

**Script et Template :**

```vue
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  inject: ['activeTab'],
  computed: {
    isActive() {
      return this.activeTab === this.index;
    }
  }
}
</script>

<template>
  <Transition name="tab">
    <div v-if="isActive" class="tab-panel">
      <slot></slot>
    </div>
  </Transition>
</template>
```

---

# Exercice 5 - Solution TabPanel.vue (2/2)

**Styles et animations :**

```vue
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
<script>
import Tabs from './components/Tabs.vue';
import Tab from './components/Tab.vue';
import TabPanel from './components/TabPanel.vue';

export default {
  components: {
    Tabs,
    Tab,
    TabPanel
  },
  methods: {
    handleTabChange(index) {
      console.log('Onglet actif:', index);
    }
  }
}
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
<script>
export default {
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v)
    }
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    handleClickOutside(e) {
      if (this.$refs.dropdown && !this.$refs.dropdown.contains(e.target)) {
        this.close();
      }
    },
    handleEscape(e) {
      if (e.key === 'Escape') {
        this.close();
      }
    }
  }
}
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

# Exercice 6 - Styles Dropdown (1/2)

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
</style>
```

---

# Exercice 6 - Styles Dropdown (2/2)

```vue
<style scoped>
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

---
layout: new-section
---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 2

---

# TaskFlow - Exercice 1 : TaskCard avec Slots

### Objectif
Créer un composant `TaskCard.vue` ultra-flexible avec slots

### Spécifications

**Slots nommés** :
- `header` : En-tête personnalisable
- `default` : Contenu principal
- `actions` : Boutons d'actions
- `footer` : Pied de page

**Props** :
- `variant` : 'default' | 'success' | 'warning' | 'danger'
- `padding` : Boolean (true par défaut)

**Fallback** :
- Contenu par défaut pour chaque slot

---

# TaskFlow - Solution TaskCard.vue (1/2)

```vue
<script>
export default {
  name: 'TaskCard',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'success', 'warning', 'danger'].includes(v)
    },
    padding: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cardClasses() {
      return [
        'task-card',
        `task-card--${this.variant}`,
        { 'task-card--no-padding': !this.padding }
      ];
    }
  }
}
</script>
```

---

# TaskFlow - Solution TaskCard.vue (2/3)

**Template :**

```vue
<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" class="task-card__header">
      <slot name="header">
        <h3>Titre par défaut</h3>
      </slot>
    </div>
    
    <div class="task-card__body">
      <slot>
        <p>Contenu par défaut</p>
      </slot>
    </div>
    
    <div v-if="$slots.actions" class="task-card__actions">
      <slot name="actions"></slot>
    </div>
    
    <div v-if="$slots.footer" class="task-card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
```

---

# TaskFlow - Solution TaskCard.vue (3/3)

**Styles :**

```vue
<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.task-card--default { border-left: 4px solid #3b82f6; }
.task-card--success { border-left: 4px solid #10b981; }
.task-card--warning { border-left: 4px solid #f59e0b; }
.task-card--danger { border-left: 4px solid #ef4444; }

.task-card__header {
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.task-card__body {
  padding: 1rem;
}

.task-card--no-padding .task-card__body {
  padding: 0;
}

.task-card__actions {
  padding: 0.75rem 1rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.task-card__footer {
  padding: 0.75rem 1rem;
  background: #f9fafb;
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
```

---

# TaskFlow - Utilisation TaskCard

```vue
<template>
  <div>
    <!-- Carte de tâche urgente -->
    <TaskCard variant="danger">
      <template #header>
        <div style="display: flex; justify-content: space-between;">
          <h3>🚨 Tâche urgente</h3>
          <span class="badge">URGENT</span>
        </div>
      </template>
      
      <p>Cette tâche nécessite une attention immédiate !</p>
      
      <template #actions>
        <button @click="markDone">✅ Terminer</button>
        <button @click="postpone">⏰ Reporter</button>
      </template>
      
      <template #footer>
        Échéance : Aujourd'hui 18h00
      </template>
    </TaskCard>
    
    <!-- Carte de tâche réussie -->
    <TaskCard variant="success">
      <template #header>
        <h3>✅ Tâche terminée</h3>
      </template>
      
      <p>Formation Vue.js complétée avec succès !</p>
      
      <template #footer>
        Complétée le 22/01/2026
      </template>
    </TaskCard>
  </div>
</template>
```

---

# TaskFlow - Exercice 2 : TaskModal avec Slots

### Objectif
Créer une modal ultra-flexible pour TaskFlow

### Spécifications

**Slots nommés** :
- `trigger` : Bouton qui ouvre la modal
- `title` : Titre de la modal
- `default` : Contenu principal
- `footer` : Actions (Annuler, Valider)

**Props** :
- `modelValue` (Boolean) : Contrôle ouverture/fermeture
- `size` : 'small' | 'medium' | 'large'
- `closable` : Boolean (permet fermeture avec X)

**Événements** :
- `@update:modelValue` : Pour v-model
- `@close` : Quand on ferme la modal
- `@confirm` : Quand on confirme

---

# TaskFlow - Solution TaskModal.vue (1/3)

```vue
<script>
export default {
  name: 'TaskModal',
  props: {
    modelValue: Boolean,
    size: {
      type: String,
      default: 'medium',
      validator: (v) => ['small', 'medium', 'large'].includes(v)
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close', 'confirm'],
  methods: {
    close() {
      this.$emit('update:modelValue', false);
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
      this.close();
    },
    handleBackdropClick(e) {
      if (this.closable && e.target === e.currentTarget) {
        this.close();
      }
    }
  }
}
</script>
```

---

# TaskFlow - Solution TaskModal.vue (2/3)

```vue
<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue"
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div :class="['modal-content', `modal-content--${size}`]">
          <!-- Header -->
          <div class="modal-header">
            <div class="modal-title">
              <slot name="title">
                <h2>Titre</h2>
              </slot>
            </div>
            
            <button 
              v-if="closable"
              class="modal-close"
              @click="close"
            >
              ✕
            </button>
          </div>
          
          <!-- Body -->
          <div class="modal-body">
            <slot></slot>
          </div>
          
          <!-- Footer -->
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer">
              <button @click="close">Annuler</button>
              <button @click="confirm" class="btn-primary">
                Confirmer
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

---

# TaskFlow - Solution TaskModal Styles (1/2)

```vue
<style scoped>
.modal-backdrop {
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
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-content--small { width: 400px; }
.modal-content--medium { width: 600px; }
.modal-content--large { width: 900px; }

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-title h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}
</style>
```

---

# TaskFlow - Solution TaskModal Styles (2/2)

```vue
<style scoped>
.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: #f3f4f6;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
```

---

# TaskFlow - Utilisation TaskModal (1/2)

**Script et Modal de suppression :**

```vue
<script>
export default {
  data() {
    return {
      showDeleteModal: false,
      showEditModal: false,
      taskToEdit: null
    }
  },
  methods: {
    confirmDelete() {
      console.log('Tâche supprimée !');
    },
    saveTask() {
      console.log('Tâche sauvegardée !');
    }
  }
}
</script>

<template>
  <div>
    <!-- Modal de confirmation de suppression -->
    <TaskModal 
      v-model="showDeleteModal"
      size="small"
    >
      <template #title>
        <h2>⚠️ Confirmer la suppression</h2>
      </template>
      
      <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
      <p><strong>Cette action est irréversible.</strong></p>
      
      <template #footer>
        <button @click="showDeleteModal = false">
          Annuler
        </button>
        <button 
          @click="confirmDelete" 
          class="btn-danger"
        >
          🗑️ Supprimer
        </button>
      </template>
    </TaskModal>
  </div>
</template>
```

---

# TaskFlow - Utilisation TaskModal (2/2)

**Modal d'édition :**

```vue
<template>
  <div>
    <!-- Modal d'édition -->
    <TaskModal 
      v-model="showEditModal"
      size="large"
    >
      <template #title>
        <h2>✏️ Modifier la tâche</h2>
      </template>
      
      <TaskForm 
        :task="taskToEdit"
        @submit="saveTask"
      />
    </TaskModal>
  </div>
</template>
```

---

# TaskFlow - Exercice 3 : BoardColumn (Scoped Slots)

### Objectif
Créer une colonne de board Kanban avec scoped slots

### Spécifications

**Props** :
- `title` : Titre de la colonne
- `tasks` : Array de tâches
- `color` : Couleur de la colonne

**Scoped Slots** :
- `task` : Template personnalisable pour chaque tâche
  - Expose : `{ task, index, isFirst, isLast }`

**Slots nommés** :
- `header` : En-tête personnalisable
- `empty` : Affiché si aucune tâche

**Events** :
- `@drop` : Drag & drop de tâches

---

# TaskFlow - Solution BoardColumn.vue (1/3)

```vue
<script>
export default {
  name: 'BoardColumn',
  props: {
    title: {
      type: String,
      required: true
    },
    tasks: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#3b82f6'
    }
  },
  emits: ['drop', 'task-click'],
  data() {
    return {
      isDragOver: false
    }
  },
  methods: {
    handleDragOver(e) {
      e.preventDefault();
      this.isDragOver = true;
    },
    handleDragLeave() {
      this.isDragOver = false;
    },
    handleDrop(e) {
      e.preventDefault();
      this.isDragOver = false;
      const taskId = e.dataTransfer.getData('taskId');
      this.$emit('drop', { taskId, column: this.title });
    }
  }
}
</script>
```

---

# TaskFlow - Solution BoardColumn.vue (2/4)

**Template - Header :**

```vue
<template>
  <div 
    class="board-column"
    :class="{ 'drag-over': isDragOver }"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop="handleDrop"
  >
    <!-- Header personnalisable -->
    <div 
      class="board-column__header"
      :style="{ borderTopColor: color }"
    >
      <slot name="header" :title="title" :count="tasks.length">
        <div class="header-default">
          <h3>{{ title }}</h3>
          <span class="task-count">{{ tasks.length }}</span>
        </div>
      </slot>
    </div>
  </div>
</template>
```

---

# TaskFlow - Solution BoardColumn.vue (3/4)

**Template - Body et Liste :**

```vue
<template>
  <div class="board-column">
    <!-- ... header de la slide précédente ... -->
    
    <!-- Liste des tâches -->
    <div class="board-column__body">
      <template v-if="tasks.length > 0">
        <div 
          v-for="(task, index) in tasks"
          :key="task.id"
          class="board-column__task"
          draggable="true"
          @dragstart="e => e.dataTransfer.setData('taskId', task.id)"
        >
          <slot 
            name="task"
            :task="task"
            :index="index"
            :isFirst="index === 0"
            :isLast="index === tasks.length - 1"
          >
            <!-- Fallback par défaut -->
            <div class="task-default">
              <h4>{{ task.title }}</h4>
              <p>{{ task.description }}</p>
            </div>
          </slot>
        </div>
      </template>
      
      <!-- Empty state -->
      <div v-else class="board-column__empty">
        <slot name="empty">
          <p>Aucune tâche</p>
        </slot>
      </div>
    </div>
  </div>
</template>
```

---

# TaskFlow - Solution BoardColumn Styles (1/2)

**Styles colonne et header :**

```vue
<style scoped>
.board-column {
  background: #f9fafb;
  border-radius: 12px;
  min-width: 300px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  max-height: 100%;
}

.board-column.drag-over {
  background: #eff6ff;
  border: 2px dashed #3b82f6;
}

.board-column__header {
  padding: 1rem;
  border-top: 4px solid;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: white;
}

.header-default {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-default h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.task-count {
  background: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
```

---

# TaskFlow - Solution BoardColumn Styles (2/2)

**Styles tâches et body :**

```vue
<style scoped>
.board-column__body {
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-column__task {
  cursor: grab;
  transition: transform 0.2s;
}

.board-column__task:active {
  cursor: grabbing;
}

.task-default {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.task-default h4 {
  margin: 0 0 0.5rem 0;
}

.task-default p {
  margin: 0;
  color: #6b7280;
  font-size: 0.875rem;
}

.board-column__empty {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
}
</style>
```

---

# TaskFlow - Utilisation BoardColumn (1/2)

**Script :**

```vue
<script>
export default {
  data() {
    return {
      columns: {
        todo: [
          { id: 1, title: 'Apprendre Vue.js', priority: 'high' },
          { id: 2, title: 'Créer TaskFlow', priority: 'urgent' }
        ],
        inProgress: [
          { id: 3, title: 'Setup projet', priority: 'medium' }
        ],
        done: [
          { id: 4, title: 'Formation terminée', priority: 'low' }
        ]
      }
    }
  },
  methods: {
    handleDrop({ taskId, column }) {
      console.log(`Tâche ${taskId} déplacée vers ${column}`);
    }
  }
}
</script>
```

---

# TaskFlow - Utilisation BoardColumn (2/2)

**Template :**

```vue
<template>
  <div class="kanban-board">
    <BoardColumn 
      title="À faire"
      :tasks="columns.todo"
      color="#ef4444"
      @drop="handleDrop"
    >
      <template #header="{ title, count }">
        <div class="custom-header">
          <h3>📋 {{ title }}</h3>
          <span class="badge-red">{{ count }}</span>
        </div>
      </template>
      
      <template #task="{ task, isFirst }">
        <div 
          class="task-card"
          :class="{ 'task-highlight': isFirst }"
        >
          <div class="task-priority" :class="`priority-${task.priority}`">
            {{ task.priority }}
          </div>
          <h4>{{ task.title }}</h4>
        </div>
      </template>
      
      <template #empty>
        <div class="empty-state">
          🎉 Aucune tâche à faire !
        </div>
      </template>
    </BoardColumn>
    
    <BoardColumn 
      title="En cours"
      :tasks="columns.inProgress"
      color="#f59e0b"
      @drop="handleDrop"
    />
    
    <BoardColumn 
      title="Terminé"
      :tasks="columns.done"
      color="#10b981"
      @drop="handleDrop"
    />
  </div>
</template>
```

---

# 🎯 Récap Module 2 - TaskFlow

### Ce que vous avez construit

✅ **TaskCard** : Composant flexible avec 4 slots nommés  
✅ **TaskModal** : Modal réutilisable avec Teleport  
✅ **BoardColumn** : Colonne Kanban avec scoped slots et drag&drop  

### Concepts utilisés

- ✅ Slots simples (default)
- ✅ Slots nommés (header, footer, actions)
- ✅ Scoped slots (expose data aux parents)
- ✅ Détection de slots ($slots)
- ✅ Fallback content
- ✅ Teleport (pour modal)
- ✅ v-model custom
- ✅ Drag & Drop API

### 🚀 Next : Module 3

On va ajouter des **directives personnalisées** à TaskFlow !

- v-auto-focus pour inputs
- v-click-outside pour fermer modals
- v-tooltip pour afficher des infos
