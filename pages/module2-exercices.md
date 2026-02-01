---
layout: new-section
routeAlias: 'module2-exercices'
---

<a name="module2-exercices" id="module2-exercices"></a>

# Exercices Pratiques
## Module 2 - Slots et composants génériques

---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 2

Maintenant que vous avez vu tous les concepts théoriques du Module 2, il est temps de rendre nos composants TaskFlow ultra-flexibles avec les slots !

### Rappel des concepts du Module 2

<div class="text-sm">

**2.1 Introduction aux slots** : Slots simples, nommés, fallback content  
**2.2 Implémentation** : Scoped slots, slots dynamiques, v-slot

</div>

### Les 3 exercices progressifs

Nous allons créer 3 composants TaskFlow modulaires et réutilisables avec les slots.

---

# Exercice 1 : TaskCard avec Slots

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

# Exercice 1 - Solution TaskCard.vue (1/2)

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

# Exercice 1 - Solution TaskCard.vue (2/3)

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

# Exercice 1 - Solution TaskCard.vue (3/3)

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

# Exercice 1 - Utilisation TaskCard

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

# Exercice 2 : TaskModal avec Slots

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

# Exercice 2 - Solution TaskModal.vue (1/3)

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

# Exercice 2 - Solution TaskModal.vue (2/3)

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

# Exercice 2 - Solution TaskModal Styles (1/2)

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

# Exercice 2 - Solution TaskModal Styles (2/2)

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

# Exercice 2 - Utilisation TaskModal (1/2)

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

# Exercice 2 - Utilisation TaskModal (2/2)

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

# Exercice 3 : BoardColumn (Scoped Slots)

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

# Exercice 3 - Solution BoardColumn.vue (1/3)

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

# Exercice 3 - Solution BoardColumn.vue (2/4)

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

# Exercice 3 - Solution BoardColumn.vue (3/4)

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

# Exercice 3 - Solution BoardColumn Styles (1/2)

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

# Exercice 3 - Solution BoardColumn Styles (2/2)

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

# Exercice 3 - Utilisation BoardColumn (1/2)

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

# Exercice 3 - Utilisation BoardColumn (2/2)

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

#### Ce que vous avez construit

<small>

✅ **TaskCard** : Composant flexible avec 4 slots nommés  
✅ **TaskModal** : Modal réutilisable avec Teleport  
✅ **BoardColumn** : Colonne Kanban avec scoped slots et drag&drop  

#### Concepts du Module 2 utilisés

- ✅ **2.1 Introduction** : Slots simples, nommés, fallback
- ✅ **2.2 Implémentation** : Scoped slots, $slots, v-slot, Teleport

#### Détails techniques

- **Slots nommés** : header, footer, actions, title
- **Scoped slots** : Expose task, index, isFirst, isLast
- **Détection de slots** : v-if="$slots.header"
- **Fallback content** : Contenu par défaut
- **Teleport** : Modal dans body
- **v-model custom** : modelValue + update:modelValue
- **Drag & Drop API** : dragstart, dragover, drop

#### 🚀 Prochaine étape : Module 3

On va ajouter des **directives personnalisées** à TaskFlow !

- v-auto-focus pour inputs
- v-click-outside pour fermer modals
- v-tooltip pour afficher des infos

</small>

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vue.js Slots Guide](https://vuejs.org/guide/components/slots.html)
- 🎯 [Scoped Slots](https://vuejs.org/guide/components/slots.html#scoped-slots)
- 🚀 [Teleport](https://vuejs.org/guide/built-ins/teleport.html)

### Concepts avancés

- 🔧 Render Functions avec slots
- ⚡ Slots et performance
- 🎨 Patterns de composants réutilisables

### Exemples

- 💡 [Vue Component Library Patterns](https://vuejs.org/examples/)
- 🎭 [Headless UI Components](https://headlessui.com/)

---

# Félicitations ! 🎉

<small>

### Vous avez terminé le Module 2 !

Vous maîtrisez maintenant :
- ✅ Les slots simples et nommés
- ✅ Les scoped slots pour exposer des données
- ✅ La détection de slots avec $slots
- ✅ Le fallback content
- ✅ Teleport pour les modals
- ✅ Composants ultra-flexibles et réutilisables

</small>

### Vos composants TaskFlow

<small>

**3 composants modulaires** :
- TaskCard : 4 slots nommés
- TaskModal : Teleport + slots
- BoardColumn : Scoped slots + drag&drop

</small>

### 🚀 Prochaine étape : Module 3

<small>

Rendez-vous au Module 3 pour ajouter des directives personnalisées à TaskFlow !

</small>
