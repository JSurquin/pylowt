---
layout: exercices
routeAlias: 'module3-exercices'
---

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
<script setup>
import { vPermission } from './directives/permission';
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
