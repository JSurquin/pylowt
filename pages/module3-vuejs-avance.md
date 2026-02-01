---
layout: new-section
routeAlias: 'module3-avance'
---

<a name="module3-avance" id="module3-avance"></a>

# Module 3
## Vue.js - Fonctionnement avancé

---

# SOMMAIRE DU MODULE

<div class="flex flex-col gap-2">
<Link to="sfc-components">📦 3.1 Single File Components</Link>
<Link to="directives-personnalisees">✨ 3.2 Directives personnalisées</Link>
</div>

<br>

<Link to="module3-exercices">💪 Exercices Pratiques du Module 3</Link>

---
layout: new-section
routeAlias: "sfc-components"
---

<a name="sfc-components" id="sfc-components"></a>

# 3.1 Single File Components (SFC)

---

# Single File Components (SFC)

Les **SFC** sont des fichiers `.vue` contenant template, script et style

### Avantages des SFC

<small>

- 📦 Encapsulation complète
- 🎨 Scoped CSS
- 🔧 Syntaxe spécifique à Vue
- ⚡ Hot Module Replacement
- 📝 Support IDE excellent

</small>

---

# Schéma : Architecture SFC

```mermaid
graph TB
    subgraph SFC["Fichier MonComposant.vue"]
        S[Script<br/>Logique JavaScript<br/>data methods computed]
        T[Template<br/>Structure HTML<br/>Rendu du composant]
        ST[Style scoped<br/>CSS isole<br/>Styles du composant]
    end
    
    subgraph Compilation["Compilation par Vite"]
        C[Compilation]
    end
    
    subgraph Output["Resultat"]
        JS[JavaScript optimise]
        HTML[DOM virtuel]
        CSS[CSS scope]
    end
    
    S --> C
    T --> C
    ST --> C
    C --> JS
    C --> HTML
    C --> CSS
    
    style S fill:#42b883,stroke:#35495e,stroke-width:3px,color:#fff
    style T fill:#3498db,stroke:#2980b9,stroke-width:3px,color:#fff
    style ST fill:#e74c3c,stroke:#c0392b,stroke-width:3px,color:#fff
    style C fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:#fff
```

---

# Structure d'un SFC

```vue
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>

<template>
  <!-- Template du composant -->
  <div>
    <p>{{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>

<style scoped>
/* Styles scopés au composant */
div {
  padding: 20px;
}

button {
  background: #42b883;
  color: white;
}
</style>
```

---

# SFC - Ordre des sections

L'ordre recommandé (mais flexible) :

```vue
<!-- 1. Script -->
<script>
// Imports, logique, configuration
export default {
  // Configuration du composant
}
</script>

<!-- 2. Template -->
<template>
  <!-- Structure HTML -->
</template>

<!-- 3. Style -->
<style scoped>
/* CSS du composant */
</style>
```

---

# Options API - Structure classique

L'Options API offre une structure claire et intuitive

```vue
<script>
export default {
  data() {
    return {
      count: 0
    };
  },
  computed: {
    double() {
      return this.count * 2;
    }
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};
</script>
```

**💡 Note :** Pour des cas d'usage avancés, Vue 3 propose aussi la Composition API disponible en module bonus

---

# Scoped CSS

Le CSS scopé ne s'applique qu'au composant actuel

```vue
<style scoped>
/* Ne s'applique qu'à ce composant */
.button {
  background: #42b883;
}

/* Sélecteur profond - affecte les enfants */
:deep(.child-class) {
  color: red;
}

/* Sélecteur slotted - pour le contenu des slots */
:slotted(.slot-content) {
  font-weight: bold;
}

/* Sélecteur global dans scoped */
:global(.global-class) {
  margin: 0;
}
</style>
```

---

# CSS Modules

Alternative au scoped CSS

```vue
<style module>
.container {
  padding: 20px;
}

.title {
  font-size: 24px;
  color: #42b883;
}
</style>

<template>
  <div :class="$style.container">
    <h1 :class="$style.title">Titre</h1>
  </div>
</template>
```

---

# Variables CSS réactives

Lier des variables JavaScript aux variables CSS

```vue
<script>
export default {
  data() {
    return {
      color: '#42b883',
      size: 20
    }
  }
}
</script>

<template>
  <div class="dynamic">
    <p>Texte avec couleur dynamique</p>
    <input v-model="color" type="color" />
  </div>
</template>

<style scoped>
.dynamic {
  color: v-bind(color);
  font-size: v-bind(size + 'px');
}
</style>
```

---

# Support des preprocesseurs CSS

Vue.js supporte nativement les preprocesseurs CSS comme Sass, Less et Stylus.

Il suffit d'installer le preprocesseur souhaité et d'utiliser l'attribut `lang` :

```bash
npm install -D sass
```

```vue
<style lang="scss" scoped>
$primary-color: #42b883;

.container {
  background: $primary-color;
  
  .title {
    font-size: 24px;
    &:hover { opacity: 0.8; }
  }
}
</style>
```

---

# TypeScript dans les SFC

**💡 Note :** Vue 3 supporte TypeScript de manière native. Voir module bonus pour plus de détails.

```vue
<script>
// Exemple équivalent en JavaScript
export default {
  data() {
    return {
      user: {
        id: 1,
        nom: 'Alice',
        email: 'alice@example.com'
      }
    }
  },
  computed: {
    displayName() {
      return this.user.nom.toUpperCase();
    }
  },
  methods: {
    updateUser(newUser) {
      this.user = newUser;
    }
  }
}
</script>
```

---

# Props validés avec JavaScript

```vue
<script>
export default {
  props: {
    nom: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      default: 18
    },
    isActive: {
      type: Boolean,
      required: true
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  emits: {
    update: (value) => typeof value === 'string',
    delete: (id) => typeof id === 'number'
  }
}
</script>
```

---
layout: new-section
routeAlias: "directives-personnalisees"
---

<a name="directives-personnalisees" id="directives-personnalisees"></a>

# 3.2 Directives personnalisées

---

# Qu'est-ce qu'une directive ?

Les directives sont des attributs spéciaux qui modifient le comportement des éléments DOM

### Directives natives Vue.js

<small>

- `v-if` / `v-show`
- `v-for`
- `v-bind` (`:`)
- `v-on` (`@`)
- `v-model`
- `v-html` / `v-text`
- `v-cloak`
- `v-pre` / `v-once`

</small>

---

# Directives natives avancées

Vue.js propose plusieurs directives natives pour des cas spécifiques

| Directive | Utilisation |
|-----------|-------------|
| **v-html** | Rendre du HTML brut (⚠️ attention XSS) |
| **v-once** | Rendre une seule fois (pas de réactivité) |
| **v-pre** | Sauter la compilation Vue |
| **v-cloak** | Cacher l'élément jusqu'au chargement de Vue |
| **v-memo** | Mémoiser un sous-arbre (Vue 3.2+) |

---

```vue
<template>
  <!-- v-html -->
  <div v-html="htmlContent"></div>
  
  <!-- v-once : restera "Initial" même si message change -->
  <p v-once>{{ message }}</p>
  
  <!-- v-pre : {{ ceci ne sera pas interprété }} -->
  <div v-pre>{{ texte brut }}</div>
  
  <!-- v-memo : mise à jour uniquement si count change -->
  <div v-memo="[count]">
    <p>{{ count }}</p>
    <p>{{ text }}</p>
  </div>
</template>
```

---

# Créer une directive personnalisée

Syntaxe de base

```javascript
// directives/focus.js
export const vFocus = {
  mounted(el) {
    el.focus();
  }
};
```

---

# Schéma : Cycle de vie directive

```mermaid
graph LR
    subgraph Definition["Definition de la directive"]
        D[Directive v-focus]
        H[Hooks du cycle de vie:<br/>mounted updated unmounted]
    end
    
    subgraph Usage["Utilisation"]
        T[Template:<br/>input v-focus]
    end
    
    subgraph Execution["Execution"]
        M[mounted el<br/>el.focus]
        E[Element DOM modifie]
    end
    
    D --> H
    H --> T
    T --> M
    M --> E
    
    style D fill:#42b883,stroke:#35495e,stroke-width:3px,color:#fff
    style H fill:#3498db,stroke:#2980b9,stroke-width:2px,color:#fff
    style T fill:#9b59b6,stroke:#8e44ad,stroke-width:2px,color:#fff
    style M fill:#e67e22,stroke:#d35400,stroke-width:2px,color:#fff
    style E fill:#e74c3c,stroke:#c0392b,stroke-width:3px,color:#fff
```

---

# Utilisation d'une directive personnalisée

```vue
<script>
import { vFocus } from './directives/focus';

export default {
  directives: {
    focus: vFocus
  }
}
</script>

<template>
  <input v-focus type="text" />
</template>
```

---

# Lifecycle hooks des directives

<small>

```javascript
const myDirective = {
  // Avant que l'élément soit inséré dans le DOM
  created(el, binding, vnode, prevVnode) {},
  
  // Avant les mises à jour du composant parent
  beforeMount(el, binding, vnode, prevVnode) {},
  
  // Quand l'élément est monté
  mounted(el, binding, vnode, prevVnode) {},
  
  // Avant mise à jour
  beforeUpdate(el, binding, vnode, prevVnode) {},
  
  // Après mise à jour
  updated(el, binding, vnode, prevVnode) {},
  
  // Avant démontage
  beforeUnmount(el, binding, vnode, prevVnode) {},
  
  // Après démontage
  unmounted(el, binding, vnode, prevVnode) {}
};
```

</small>

---

# Arguments de la directive

```javascript
export const vExample = {
  mounted(el, binding, vnode) {
    // el: l'élément DOM
    console.log(el);
    
    // binding.value: la valeur passée à la directive
    console.log(binding.value);
    
    // binding.arg: l'argument après les deux-points
    console.log(binding.arg);
    
    // binding.modifiers: objet des modificateurs
    console.log(binding.modifiers);
    
    // vnode: le VNode de l'élément
    console.log(vnode);
  }
};
```

---

# Exemple : Directive v-click-outside

```javascript
// directives/clickOutside.js
export const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      // Vérifier si le clic est en dehors de l'élément
      if (!(el === event.target || el.contains(event.target))) {
        // Appeler la fonction fournie
        binding.value(event);
      }
    };
    
    document.addEventListener('click', el.clickOutsideEvent);
  },
  
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent);
  }
};
```

---

# Utilisation de v-click-outside

```vue
<script>
import { vClickOutside } from './directives/clickOutside';

export default {
  directives: {
    clickOutside: vClickOutside
  },
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    closeDropdown() {
      this.isOpen = false;
    }
  }
}
</script>

<template>
  <div v-click-outside="closeDropdown" class="dropdown">
    <button @click="isOpen = !isOpen">Toggle</button>
    <div v-if="isOpen" class="menu">
      Contenu du menu
    </div>
  </div>
</template>
```

---

# Exemple : Directive v-tooltip

<small>

```javascript
// directives/tooltip.js
export const vTooltip = {
  mounted(el, binding) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = binding.value;
    tooltip.style.position = 'absolute';
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);
    
    el.addEventListener('mouseenter', () => {
      const rect = el.getBoundingClientRect();
      tooltip.style.top = rect.top - 30 + 'px';
      tooltip.style.left = rect.left + 'px';
      tooltip.style.display = 'block';
    });
    
    el.addEventListener('mouseleave', () => {
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

</small>

---

# Utilisation de v-tooltip

<small>

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
  <button v-tooltip="'Cliquez pour enregistrer'">
    Enregistrer
  </button>
  
  <span v-tooltip="'Information importante'">
    Hover me
  </span>
</template>

<style>
.tooltip {
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
}
</style>
```

</small>

---

# Directive globale

Enregistrer une directive globalement

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Directive globale
app.directive('focus', {
  mounted(el) {
    el.focus();
  }
});

app.mount('#app');
```

---

# Plugin de directives

Grouper plusieurs directives dans un plugin

```javascript
// plugins/directives.js
import { vFocus } from '../directives/focus';
import { vClickOutside } from '../directives/clickOutside';
import { vTooltip } from '../directives/tooltip';
import { vLazyLoad } from '../directives/lazyLoad';

export default {
  install(app) {
    app.directive('focus', vFocus);
    app.directive('click-outside', vClickOutside);
    app.directive('tooltip', vTooltip);
    app.directive('lazy-load', vLazyLoad);
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

# Bonnes pratiques - Directives

### ✅ Faire

<small>

- Nettoyer les event listeners dans unmounted
- Utiliser des noms descriptifs
- Documenter les arguments et modificateurs
- Gérer les cas edge
- Utiliser TypeScript pour les types

</small>

### ❌ Éviter

<small>

- Manipuler le state du composant
- Logique métier complexe
- Directives trop génériques
- Oublier le nettoyage des ressources

</small>

---

# Résumé du Module 3

✅ **Single File Components** : Structure, scoped CSS, CSS modules

✅ **Variables CSS réactives** : v-bind dans le CSS

✅ **TypeScript** : Props typées, interfaces

✅ **Directives natives** : v-html, v-once, v-pre, v-memo

✅ **Directives personnalisées** : Création, lifecycle, arguments

✅ **Exemples pratiques** : v-focus, v-click-outside, v-tooltip

---

# Cas d'usage des directives

| Directive | Cas d'usage |
|-----------|-------------|
| **v-focus** | Auto-focus sur un input |
| **v-click-outside** | Fermer dropdown/modal |
| **v-tooltip** | Afficher des infobulles |

---

# Travaux pratiques - Module 3

### Exercices à réaliser

1. 📝 **SFC avancé** : Composant 
2. 🎨 **CSS dynamique** : Thème avec variables réactives
3. 🔧 **Directive v-click-outside** : Implémenter
4. 💬 **Directive v-tooltip** : Créer des tooltips

<br/>

### Projet fil rouge

Refactoriser l'application avec des directives personnalisées


