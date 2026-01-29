---
layout: exercices
routeAlias: 'module3-exercices'
---

<a name="module3-exercices" id="module3-exercices"></a>

# Exercices Pratiques
## Module 3 - Vue.js avancé

---

# Exercice 1 - Badge fonctionnel

### Objectif
Créer un composant Badge optimisé

### Spécifications

- Composant fonctionnel
- Props: `type` (success, error, warning, info)
- Props: `size` (small, medium, large)
- Slot pour le contenu
- Styles appropriés par type

---

# Exercice 2 - Composant avec CSS dynamique

### Objectif
Créer un composant avec variables CSS réactives

### Fonctionnalités

- Thème personnalisable (couleur primaire, secondaire)
- Taille de texte ajustable
- Espacement configurable
- Coin arrondis ajustables
- Mode clair/sombre

---

# Exercice 3 - Directive v-click-outside

### Objectif
Implémenter une directive qui détecte les clics extérieurs

### Utilisation

```vue
<div v-click-outside="handleClickOutside">
  Contenu
</div>
```

---

# Exercice 2 - Bonus

### Bonus

- Support des modificateurs (capture, once)
- Exclure certains éléments
- Support touch events

---

# Exercice 3 - Solution

```javascript
// directives/clickOutside.js
export const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event);
      }
    };
    
    const capture = binding.modifiers.capture || false;
    document.addEventListener('click', el.clickOutsideEvent, capture);
  },
  
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
```

---

# Exercice 4 - Directive v-tooltip

### Objectif
Créer une directive pour afficher des tooltips

### Fonctionnalités

- Position configurable (top, bottom, left, right)
- Délai d'affichage
- Styling personnalisable
- Support HTML dans le tooltip (avec modificateur)

---

# Exercice 4 - Solution (1/2)

```javascript
// directives/tooltip.js
export const vTooltip = {
  mounted(el, binding) {
    const tooltip = document.createElement('div');
    tooltip.className = 'v-tooltip';
    
    if (binding.modifiers.html) {
      tooltip.innerHTML = binding.value;
    } else {
      tooltip.textContent = binding.value;
    }
    
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '9999';
    document.body.appendChild(tooltip);
    
    const position = binding.arg || 'top';
    const delay = 200;
    let timeout;
```

---

# Exercice 4 - Solution (2/2)

```javascript
    el.addEventListener('mouseenter', () => {
      timeout = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        
        switch(position) {
          case 'top':
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            break;
          case 'bottom':
            tooltip.style.top = rect.bottom + 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            break;
        }
        
        tooltip.style.display = 'block';
      }, delay);
    });
    
    el.addEventListener('mouseleave', () => {
      clearTimeout(timeout);
      tooltip.style.display = 'none';
    });
    
    el._tooltip = tooltip;
  },
  
  unmounted(el) {
    if (el._tooltip) {
      el._tooltip.remove();
    }
  }
};
```

---

# Exercice 5 - Directive v-lazy-load

### Objectif
Implémenter le lazy loading pour les images

### Fonctionnalités

- Utiliser IntersectionObserver
- Placeholder pendant le chargement
- Gestion des erreurs
- Support des backgrounds
- Effet de transition

---

# Exercice 5 - Solution

```javascript
// directives/lazyLoad.js
export const vLazyLoad = {
  mounted(el, binding) {
    const options = {
      threshold: 0.1,
      rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          img.addEventListener('load', () => {
            img.classList.add('loaded');
          });
          
          img.addEventListener('error', () => {
            img.src = '/placeholder-error.jpg';
          });
          
          if (binding.modifiers.background) {
            img.style.backgroundImage = `url(${binding.value})`;
          } else {
            img.src = binding.value;
          }
          
          observer.unobserve(img);
        }
      });
    }, options);
    
    observer.observe(el);
    el._observer = observer;
  },
  
  unmounted(el) {
    if (el._observer) {
      el._observer.disconnect();
    }
  }
};
```

---

# Exercice 6 - Directive v-permission

### Objectif
Système de contrôle d'accès basé sur les permissions

### Fonctionnalités

- Cacher/Afficher selon permissions
- Support AND et OR
- Désactiver au lieu de cacher (modificateur)
- Récupérer les permissions du store Pinia

---

# Exercice 6 - Solution

```javascript
// directives/permission.js
import { useAuthStore } from '@/stores/auth';

export const vPermission = {
  mounted(el, binding) {
    const authStore = useAuthStore();
    const requiredPermissions = Array.isArray(binding.value) 
      ? binding.value 
      : [binding.value];
    
    const userPermissions = authStore.permissions || [];
    
    let hasPermission;
    
    if (binding.modifiers.or) {
      // Au moins une permission
      hasPermission = requiredPermissions.some(
        perm => userPermissions.includes(perm)
      );
    } else {
      // Toutes les permissions (AND par défaut)
      hasPermission = requiredPermissions.every(
        perm => userPermissions.includes(perm)
      );
    }
    
    if (!hasPermission) {
      if (binding.modifiers.disable) {
        el.disabled = true;
        el.style.opacity = '0.5';
        el.style.cursor = 'not-allowed';
      } else {
        el.style.display = 'none';
      }
    }
  }
};
```

---

# Exercice 6 - Utilisation

```vue
<script>
import { vPermission } from './directives/permission';

export default {
  directives: {
    permission: vPermission
  }
}
</script>

<template>
  <!-- Cacher si pas la permission -->
  <button v-permission="'write'">
    Éditer
  </button>
  
  <!-- Désactiver au lieu de cacher -->
  <button v-permission.disable="'admin'">
    Admin Panel
  </button>
  
  <!-- Multiples permissions (AND) -->
  <button v-permission="['write', 'delete']">
    Supprimer
  </button>
  
  <!-- Au moins une permission (OR) -->
  <button v-permission.or="['user', 'admin']">
    Voir
  </button>
</template>
```

---

# Exercice 7 - Directive v-infinite-scroll

### Objectif
Détecter quand l'utilisateur atteint le bas de la page

### Fonctionnalités

- Callback quand proche du bas
- Distance configurable
- Throttle des événements
- Support pour éléments scrollables

---

# Exercice 7 - Solution

```javascript
// directives/infiniteScroll.js
export const vInfiniteScroll = {
  mounted(el, binding) {
    const distance = binding.arg ? parseInt(binding.arg) : 100;
    let isLoading = false;
    
    const checkScroll = () => {
      if (isLoading) return;
      
      const scrollable = el === window ? document.documentElement : el;
      const scrollTop = el === window ? window.scrollY : el.scrollTop;
      const scrollHeight = scrollable.scrollHeight;
      const clientHeight = el === window ? window.innerHeight : el.clientHeight;
      
      if (scrollTop + clientHeight >= scrollHeight - distance) {
        isLoading = true;
        
        const result = binding.value();
        
        if (result && result.finally) {
          result.finally(() => {
            isLoading = false;
          });
        } else {
          isLoading = false;
        }
      }
    };
    
    let throttleTimeout;
    const throttledCheck = () => {
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        checkScroll();
        throttleTimeout = null;
      }, 200);
    };
    
    const target = el === window ? window : el;
    target.addEventListener('scroll', throttledCheck);
    
    el._scrollHandler = throttledCheck;
    el._target = target;
  },
  
  unmounted(el) {
    if (el._scrollHandler && el._target) {
      el._target.removeEventListener('scroll', el._scrollHandler);
    }
  }
};
```

---

# Exercice 8 - Plugin de directives

### Objectif
Créer un plugin regroupant toutes vos directives

### Structure

```
plugins/
└── directives/
    ├── index.js
    ├── clickOutside.js
    ├── tooltip.js
    ├── lazyLoad.js
    ├── permission.js
    └── infiniteScroll.js
```

---

# Exercice 8 - Solution

```javascript
// plugins/directives/index.js
import { vClickOutside } from './clickOutside';
import { vTooltip } from './tooltip';
import { vLazyLoad } from './lazyLoad';
import { vPermission } from './permission';
import { vInfiniteScroll } from './infiniteScroll';

export default {
  install(app) {
    app.directive('click-outside', vClickOutside);
    app.directive('tooltip', vTooltip);
    app.directive('lazy-load', vLazyLoad);
    app.directive('permission', vPermission);
    app.directive('infinite-scroll', vInfiniteScroll);
  }
};
```

---

# Utilisation du plugin

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';
import directivesPlugin from './plugins/directives';

const app = createApp(App);

app.use(directivesPlugin);

app.mount('#app');
```

---

# Projet Fil Rouge - Partie 3

### Améliorer l'application avec les fonctionnalités avancées

**Objectifs**:

1. Migrer vers TypeScript
2. Ajouter v-lazy-load sur les images produits
3. Implémenter v-tooltip pour les descriptions
4. Utiliser v-permission pour les actions admin
5. Ajouter v-infinite-scroll pour le chargement progressif
6. Créer des composants fonctionnels pour les badges
7. Utiliser des variables CSS dynamiques pour le thème

---

# Checklist de validation

Avant de passer au Module 4, assurez-vous de maîtriser :

- ✅ Comprendre les composants fonctionnels
- ✅ Maîtriser la structure des SFC
- ✅ Utiliser scoped CSS et CSS modules
- ✅ Implémenter des variables CSS réactives
- ✅ Utiliser TypeScript dans les composants
- ✅ Connaître les directives natives avancées
- ✅ Créer des directives personnalisées
- ✅ Gérer le lifecycle des directives
- ✅ Nettoyer les ressources (event listeners, observers)
- ✅ Créer un plugin de directives

---
layout: new-section
---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 3

---

# TaskFlow - Exercice 1 : Directive v-auto-focus

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

# TaskFlow - Solution v-auto-focus

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

# TaskFlow - Utilisation v-auto-focus

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

# TaskFlow - Exercice 2 : Directive v-click-outside

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

---

# TaskFlow - Solution v-click-outside (1/2)

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

# TaskFlow - Solution v-click-outside (2/2)

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

# TaskFlow - Exercice 3 : Directive v-tooltip

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

---

# TaskFlow - Solution v-tooltip (1/3)

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

# TaskFlow - Solution v-tooltip (2/3)

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

# TaskFlow - Solution v-tooltip Styles

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

# TaskFlow - Utilisation v-tooltip

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

# TaskFlow - Exercice 4 : Plugin de Directives

### Objectif
Créer un plugin pour enregistrer toutes les directives TaskFlow

### Spécifications

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

---

# TaskFlow - Solution Plugin Directives

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

✅ **v-auto-focus** : Focus automatique des inputs  
✅ **v-click-outside** : Détection clics externes  
✅ **v-tooltip** : Tooltips personnalisables  
✅ **Plugin** : Package réutilisable de directives  

### Concepts utilisés

- ✅ Lifecycle des directives (mounted, updated, unmounted)
- ✅ Binding values (string, object)
- ✅ Manipulation DOM directe
- ✅ Event listeners (addEventListener, removeEventListener)
- ✅ Cleanup des ressources
- ✅ Positionnement absolu/fixe
- ✅ Création de plugins Vue

### 🚀 Next : Module 4

On va gérer l'**état global** de TaskFlow avec **Pinia** !

- Store de tâches centralisé
- Actions asynchrones
- Persistance localStorage
