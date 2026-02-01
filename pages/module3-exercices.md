---
layout: new-section
routeAlias: 'module3-exercices'
---

<a name="module3-exercices" id="module3-exercices"></a>

# Exercices Pratiques
## Module 3 - Vue.js avancé

---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 3

Maintenant que vous avez vu tous les concepts avancés du Module 3, il est temps d'enrichir TaskFlow avec des directives personnalisées !

### Rappel des concepts du Module 3

<div class="text-sm">

**3.1 SFC avancés** : Scoped CSS, CSS Modules, Variables CSS réactives  
**3.2 Directives** : Directives personnalisées, lifecycle, manipulation DOM  
**3.3 Composants fonctionnels** : Performance et cas d'usage  
**3.4 Plugins** : Création et utilisation de plugins Vue

</div>

### Les 4 exercices progressifs

Nous allons ajouter des directives personnalisées pour améliorer l'UX de TaskFlow.

---

# Exercice 1 : Directive v-auto-focus

### Objectif
Créer une directive qui focus automatiquement un input

### Spécifications

**Nom** : `v-auto-focus`

**Comportement** :
- Focus l'élément au montage du composant
- Support d'une condition : `v-auto-focus="condition"`
- Refocus si la condition change de false à true

**Cas d'usage** :
- Input dans une modal qui s'ouvre
- Champ de recherche au chargement
- Formulaire d'édition de tâche

---

# Exercice 1 - Solution v-auto-focus

```js
// directives/autoFocus.js
export const vAutoFocus = {
  mounted(el, binding) {
    // Si binding.value est undefined ou true
    if (binding.value === undefined || binding.value) {
      // Attendre le prochain tick pour être sûr que le DOM est prêt
      setTimeout(() => {
        el.focus();
      }, 100);
    }
  },
  
  updated(el, binding) {
    // Si la valeur change de false à true
    if (!binding.oldValue && binding.value) {
      setTimeout(() => {
        el.focus();
      }, 100);
    }
  }
};
```

---

# Exercice 1 - Utilisation v-auto-focus

```vue
<script>
import { vAutoFocus } from './directives/autoFocus';

export default {
  directives: {
    autoFocus: vAutoFocus
  },
  data() {
    return {
      showModal: false,
      searchMode: false
    }
  }
}
</script>

<template>
  <div>
    <!-- Focus automatique au chargement -->
    <input 
      v-auto-focus
      type="text"
      placeholder="Rechercher..."
    />
    
    <!-- Focus conditionnel -->
    <input 
      v-auto-focus="searchMode"
      type="search"
      placeholder="Mode recherche..."
    />
    
    <!-- Dans une modal -->
    <TaskModal v-model="showModal">
      <template #title>Nouvelle tâche</template>
      
      <input 
        v-auto-focus="showModal"
        type="text"
        placeholder="Titre de la tâche"
      />
    </TaskModal>
  </div>
</template>
```

---

# Exercice 2 : Directive v-click-outside

<small>

### Objectif
Détecter les clics en dehors d'un élément

### Spécifications

**Nom** : `v-click-outside`

**Comportement** :
- Appelle une fonction quand on clique en dehors de l'élément
- Ignore les clics à l'intérieur de l'élément
- Cleanup des event listeners au démontage

**Cas d'usage** :
- Fermer un dropdown
- Fermer une modal
- Fermer un menu contextuel
- Fermer un date picker

</small>

---

# Exercice 2 - Solution v-click-outside (1/2)

```js
// directives/clickOutside.js
export const vClickOutside = {
  mounted(el, binding) {
    // Stocker la fonction de callback
    el._clickOutsideHandler = (event) => {
      // Vérifier si le clic est en dehors de l'élément
      if (!el.contains(event.target) && el !== event.target) {
        // Appeler la fonction passée en paramètre
        binding.value(event);
      }
    };
    
    // Ajouter l'event listener sur document
    // Utiliser capture pour détecter les clics avant la propagation
    document.addEventListener('click', el._clickOutsideHandler, true);
  },
  
  unmounted(el) {
    // ✅ CLEANUP : Retirer l'event listener
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler, true);
      delete el._clickOutsideHandler;
    }
  }
};
```

---

# Exercice 2 - Solution v-click-outside (2/2)

```vue
<script>
import { vClickOutside } from './directives/clickOutside';

export default {
  directives: {
    clickOutside: vClickOutside
  },
  data() {
    return {
      showDropdown: false,
      showContextMenu: false
    }
  },
  methods: {
    closeDropdown() {
      this.showDropdown = false;
    },
    closeContextMenu() {
      this.showContextMenu = false;
    }
  }
}
</script>

<template>
  <div>
    <!-- Dropdown -->
    <div 
      v-click-outside="closeDropdown"
      class="dropdown"
    >
      <button @click="showDropdown = !showDropdown">
        Options ▼
      </button>
      
      <div v-if="showDropdown" class="dropdown-menu">
        <button>Modifier</button>
        <button>Supprimer</button>
      </div>
    </div>
    
    <!-- Context Menu -->
    <div 
      v-click-outside="closeContextMenu"
      class="context-menu"
      v-if="showContextMenu"
    >
      <button>Copier</button>
      <button>Coller</button>
    </div>
  </div>
</template>
```

---

# Exercice 3 : Directive v-tooltip

<div class="text-[9px]">

### Objectif
Afficher un tooltip au survol d'un élément

### Spécifications

**Nom** : `v-tooltip`

**Valeur** : String (texte du tooltip) ou Object

**Options** :
- `text` : Texte à afficher
- `position` : 'top' | 'bottom' | 'left' | 'right'
- `theme` : 'dark' | 'light'

**Comportement** :
- Afficher au mouseenter
- Masquer au mouseleave
- Créer/détruire le DOM du tooltip
- Cleanup au démontage

</div>

---

# Exercice 3 - Solution v-tooltip (1/3)

```js
// directives/tooltip.js
export const vTooltip = {
  mounted(el, binding) {
    let tooltipEl;
    
    // Parser les options
    const options = typeof binding.value === 'string'
      ? { text: binding.value, position: 'top', theme: 'dark' }
      : { position: 'top', theme: 'dark', ...binding.value };
    
    // Fonction pour créer le tooltip
    const createTooltip = () => {
      tooltipEl = document.createElement('div');
      tooltipEl.className = `tooltip tooltip--${options.theme} tooltip--${options.position}`;
      tooltipEl.textContent = options.text;
      document.body.appendChild(tooltipEl);
      
      // Positionner le tooltip
      const rect = el.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();
      
      let top, left;
      
      switch (options.position) {
        case 'top':
          top = rect.top - tooltipRect.height - 8;
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          break;
        case 'bottom':
          top = rect.bottom + 8;
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          break;
        case 'left':
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          left = rect.left - tooltipRect.width - 8;
          break;
        case 'right':
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          left = rect.right + 8;
          break;
      }
      
      tooltipEl.style.top = `${top}px`;
      tooltipEl.style.left = `${left}px`;
      tooltipEl.style.opacity = '1';
    };
    
    // Suite dans la slide suivante...
  }
};
```

---

# Exercice 3 - Solution v-tooltip (2/3)

```js
// directives/tooltip.js (suite)
export const vTooltip = {
  mounted(el, binding) {
    // ... code précédent
    
    // Fonction pour détruire le tooltip
    const destroyTooltip = () => {
      if (tooltipEl) {
        tooltipEl.style.opacity = '0';
        setTimeout(() => {
          if (tooltipEl && tooltipEl.parentNode) {
            tooltipEl.parentNode.removeChild(tooltipEl);
            tooltipEl = null;
          }
        }, 200);
      }
    };
    
    // Event listeners
    el._mouseenterHandler = createTooltip;
    el._mouseleaveHandler = destroyTooltip;
    
    el.addEventListener('mouseenter', el._mouseenterHandler);
    el.addEventListener('mouseleave', el._mouseleaveHandler);
  },
  
  unmounted(el) {
    // ✅ CLEANUP
    if (el._mouseenterHandler) {
      el.removeEventListener('mouseenter', el._mouseenterHandler);
      delete el._mouseenterHandler;
    }
    if (el._mouseleaveHandler) {
      el.removeEventListener('mouseleave', el._mouseleaveHandler);
      delete el._mouseleaveHandler;
    }
  }
};
```

---

# Exercice 3 - Solution v-tooltip Styles

```css
/* styles/tooltip.css */
.tooltip {
  position: fixed;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.tooltip--dark {
  background: #1f2937;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.tooltip--light {
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Flèches (optionnel) */
.tooltip--top::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 4px solid transparent;
  border-top-color: #1f2937;
}
```

---

# Exercice 3 - Utilisation v-tooltip

```vue
<script>
import { vTooltip } from './directives/tooltip';

export default {
  directives: {
    tooltip: vTooltip
  }
}
</script>

<template>
  <div>
    <!-- Tooltip simple -->
    <button v-tooltip="'Cliquez pour ajouter une tâche'">
      ➕ Nouvelle tâche
    </button>
    
    <!-- Tooltip avec options -->
    <button 
      v-tooltip="{ 
        text: 'Supprimer la tâche', 
        position: 'right',
        theme: 'light'
      }"
    >
      🗑️
    </button>
    
    <!-- Sur un badge de priorité -->
    <span 
      v-tooltip="'Cette tâche est urgente !'"
      class="badge badge-urgent"
    >
      URGENT
    </span>
    
    <!-- Sur une icône d'aide -->
    <span 
      v-tooltip="{ 
        text: 'Les tâches archivées sont supprimées après 30 jours',
        position: 'bottom'
      }"
      class="help-icon"
    >
      ❓
    </span>
  </div>
</template>
```

---

#### Exercice 4 : Plugin de Directives

<div class="text-[11px]">

#### Objectif
Créer un plugin pour enregistrer toutes les directives TaskFlow

#### Spécifications

**Fichier** : `plugins/taskflowDirectives.js`

**Directives à inclure** :
- `v-auto-focus`
- `v-click-outside`
- `v-tooltip`

**Installation** :
```js
app.use(TaskFlowDirectives);
```

**Bonus** :
- Options de configuration globales
- Version du plugin

</div>

---

# Exercice 4 - Solution Plugin Directives

```js
// plugins/taskflowDirectives.js
import { vAutoFocus } from '../directives/autoFocus';
import { vClickOutside } from '../directives/clickOutside';
import { vTooltip } from '../directives/tooltip';

export const TaskFlowDirectives = {
  install(app, options = {}) {
    // Configuration par défaut
    const config = {
      prefix: 'task',
      ...options
    };
    
    // Enregistrer les directives
    app.directive('autoFocus', vAutoFocus);
    app.directive('clickOutside', vClickOutside);
    app.directive('tooltip', vTooltip);
    
    // Ajouter la config globale
    app.config.globalProperties.$taskflowDirectives = {
      version: '1.0.0',
      config
    };
    
    console.log('✅ TaskFlow Directives plugin installé !');
  }
};

// Utilisation dans main.js
// import { createApp } from 'vue';
// import App from './App.vue';
// import { TaskFlowDirectives } from './plugins/taskflowDirectives';
// 
// const app = createApp(App);
// app.use(TaskFlowDirectives);
// app.mount('#app');
```

---

# 🎯 Récap Module 3 - TaskFlow

### Ce que vous avez construit

<small>

✅ **v-auto-focus** : Focus automatique des inputs  
✅ **v-click-outside** : Détection clics externes  
✅ **v-tooltip** : Tooltips personnalisables  
✅ **Plugin** : Package réutilisable de directives  

### Concepts du Module 3 utilisés

- ✅ **3.1 SFC avancés** : Scoped styles, CSS modules
- ✅ **3.2 Directives** : Lifecycle (mounted, updated, unmounted), binding values
- ✅ **3.3 Manipulation DOM** : createElement, appendChild, event listeners
- ✅ **3.4 Plugins** : Structure plugin.install, config globale

#### 🚀 Prochaine étape : Module 4

On va gérer l'**état global** de TaskFlow avec **Pinia** !

- Store de tâches centralisé
- Actions asynchrones
- Persistance localStorage

</small>

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vue.js Custom Directives](https://vuejs.org/guide/reusability/custom-directives.html)
- 🔌 [Vue.js Plugins](https://vuejs.org/guide/reusability/plugins.html)
- 🎨 [SFC CSS Features](https://vuejs.org/api/sfc-css-features.html)

### Concepts avancés

- 🔧 Render Functions
- ⚡ Teleport API
- 🎭 Async Components

### Exemples

- 💡 [Directive Examples](https://vuejs.org/examples/#custom-directive)
- 🎯 [Plugin Patterns](https://vuejs.org/guide/reusability/plugins.html#writing-a-plugin)