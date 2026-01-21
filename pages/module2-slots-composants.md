---
layout: new-section
routeAlias: 'module2-slots'
---

# Module 2
## Slots et composants génériques

---

# 🎓 Félicitations pour le Module 1 !

Vous venez de maîtriser les **fondamentaux** de Vue.js ! 👏

### 📊 Votre progression

```
    ╔════════════════════════╗
    ║ ████████░░░░░░░░░░░░░░ ║  30% complété
    ╚════════════════════════╝
```

### 🧠 Ce que vous savez maintenant

✅ Créer des composants réactifs
✅ Gérer l'état local
✅ Communiquer entre composants (props/emit)
✅ Faire des appels API

### 🚀 Module 2 : On monte en niveau !

Aujourd'hui on va apprendre à créer des **composants ultra-réutilisables** avec les slots.

**Objectif** : Un seul composant Modal pour TOUTE l'application !

### 💡 Astuce du jour

> "Un bon développeur est un développeur **fainéant** : il écrit du code réutilisable pour ne pas se répéter !"

---
layout: new-section
---

# 2.1 Concepts

---

# Qu'est-ce qu'un slot ?

Les **slots** permettent de passer du contenu HTML (ou des composants) à un composant enfant

### 🎰 Analogie : Les slots sont comme une machine à sous

Imaginez un **cadre photo** :
- Le cadre est votre composant (toujours le même design)
- Le **slot** est l'emplacement vide au centre
- Vous pouvez y mettre **n'importe quelle photo** !

```
┌─────────────────────┐
│  ╔═══════════════╗  │  ← Le cadre (composant)
│  ║               ║  │
│  ║   [SLOT]      ║  │  ← L'emplacement (slot)
│  ║   Mettez ce   ║  │
│  ║   que vous    ║  │
│  ║   voulez ici! ║  │
│  ╚═══════════════╝  │
└─────────────────────┘
```

---

# Slots : Vue vs React

### 🆚 En React : ce sont les `children` !

**Vue** : `<slot></slot>`
**React** : `{children}` ou props personnalisées

### Pourquoi utiliser des slots ?

- 🎯 **Composants flexibles** : un composant Card pour 1000 usages différents
- 🧩 **Composer des interfaces** : assembler des briques comme des Lego
- 🎨 **Personnaliser sans casser** : chaque utilisation est unique
- ♻️ **DRY** : un seul composant Modal, 50 contenus différents

---

# Problème sans les slots

```vue
<!-- AlertSuccess.vue -->
<template>
  <div class="alert success">
    <span class="icon">✓</span>
    <span>Opération réussie</span>
  </div>
</template>

<!-- AlertError.vue -->
<template>
  <div class="alert error">
    <span class="icon">✗</span>
    <span>Une erreur est survenue</span>
  </div>
</template>
```

---

# Pourquoi c'est problématique ?

❌ Duplication de code
❌ Un composant par type de message
❌ Difficile à maintenir

---

# Solution avec les slots

```vue
<!-- Alert.vue - Composant générique -->
<template>
  <div class="alert">
    <span class="icon">
      <slot name="icon">ℹ️</slot>
    </span>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
```

---

# Utilisation du composant avec slots

```vue
<template>
  <Alert>
    <template #icon>✓</template>
    Opération réussie !
  </Alert>
  
  <Alert>
    <template #icon>✗</template>
    Une erreur est survenue
  </Alert>
  
  <Alert>
    <template #icon>⚠️</template>
    <strong>Attention :</strong> action irréversible
  </Alert>
</template>
```

---

# Avantages des slots

✅ Un seul composant
✅ Contenu flexible
✅ Facile à maintenir

---

# Composants génériques

Un **composant générique** est un composant réutilisable qui s'adapte à différents contextes

### Exemples de composants génériques

- 📦 **Card** : conteneur avec header, body, footer
- 🔘 **Button** : bouton personnalisable
- 📋 **Modal** : fenêtre modale
- 📰 **Layout** : mise en page avec sidebar, content, header
- 🗂️ **Tabs** : onglets

---

# Relations parent/enfant avec slots

```
┌─────────────────────────────────┐
│         PARENT                  │
│                                 │
│  ┌───────────────────────────┐  │
│  │       ENFANT              │  │
│  │                           │  │
│  │  <slot name="header">    │  │ ← Slot nommé
│  │                           │  │
│  │  <slot>                   │  │ ← Slot par défaut
│  │                           │  │
│  │  <slot name="footer">    │  │ ← Slot nommé
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
└─────────────────────────────────┘
```

---
layout: new-section
---

# 2.2 Implémentation

---

# Slots simples (slot par défaut)

Le slot le plus basique - un seul emplacement pour le contenu

```vue
<!-- Button.vue -->
<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<!-- Utilisation -->
<Button>Cliquer ici</Button>
<Button>Enregistrer</Button>
<Button>
  <span class="icon">✓</span>
  Valider
</Button>
```

---

# Slot par défaut avec contenu fallback

On peut définir un contenu par défaut si rien n'est fourni

```vue
<!-- Button.vue -->
<template>
  <button class="btn">
    <slot>Bouton par défaut</slot>
  </button>
</template>

<!-- Utilisation -->
<Button>Mon texte</Button>
<!-- Rendu: Mon texte -->

<Button></Button>
<!-- Rendu: Bouton par défaut -->
```

---

# Slots nommés

Quand on a besoin de plusieurs emplacements distincts

```vue
<!-- Card.vue -->
<template>
  <div class="card">
    <header class="card-header">
      <slot name="header"></slot>
    </header>
    
    <div class="card-body">
      <slot></slot>
    </div>
    
    <footer class="card-footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

---

# Utilisation des slots nommés

```vue
<script>
import Card from './components/Card.vue';

export default {
  components: {
    Card
  }
}
</script>

<template>
  <Card>
    <template #header>
      <h2>Titre de la carte</h2>
    </template>
    
    <p>Contenu principal de la carte</p>
    <p>Encore du contenu...</p>
    
    <template #footer>
      <button>Action</button>
    </template>
  </Card>
</template>
```

---

# Directive v-slot

Syntaxes disponibles pour les slots

```vue
<!-- Syntaxe complète -->
<template v-slot:header>
  <h1>Titre</h1>
</template>

<!-- Syntaxe abrégée (recommandée) -->
<template #header>
  <h1>Titre</h1>
</template>

<!-- Slot par défaut -->
<template #default>
  <p>Contenu</p>
</template>

<!-- Ou directement -->
<p>Contenu</p>
```

---

# Scoped Slots - Introduction

Les **scoped slots** permettent au composant enfant de passer des données au parent

### 🎁 Analogie : C'est comme une boîte cadeau avec mode d'emploi

Le composant enfant dit au parent :
> "Tiens, voici les données (le cadeau 🎁), maintenant fais-en ce que tu veux !"

### 🤔 Problème à résoudre

**Sans scoped slots** : 
- L'enfant décide TOUT (comment afficher)
- Pas flexible

**Avec scoped slots** : 
- L'enfant donne les données
- Le parent décide comment les afficher
- **Super flexible** ! 🎨

---

# Scoped Slots - Exemple concret

### Cas d'usage typique

Le composant enfant fait le **travail de récupération/logique** (ex: boucle, tri)
Le parent décide du **rendu visuel** (ex: carte, tableau, liste...)

```vue
<!-- TodoList.vue - L'enfant donne les données -->
<template>
  <ul>
    <li v-for="(todo, index) in todos" :key="todo.id">
      <slot :todo="todo" :index="index">
        <!-- Contenu par défaut si pas de slot fourni -->
        {{ todo.text }}
      </slot>
    </li>
  </ul>
</template>
```

---

# Scoped Slots vs React

### 💡 En React : render props ou children function

Vue rend ça plus simple et plus lisible !

---

# Scoped Slots - Utilisation

```vue
<script>
import TodoList from './components/TodoList.vue';

export default {
  components: {
    TodoList
  },
  data() {
    return {
      todos: [
        { id: 1, text: 'Apprendre Vue', done: true },
        { id: 2, text: 'Créer un projet', done: false }
      ]
    }
  }
}
</script>

<template>
  <TodoList :todos="todos">
    <template #default="{ todo, index }">
      <span :class="{ done: todo.done }">
        {{ index + 1 }}. {{ todo.text }}
      </span>
      <span v-if="todo.done"> ✓</span>
    </template>
  </TodoList>
</template>
```

---

# Scoped Slots - Cas avancé

```vue
<!-- DataTable.vue -->
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
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">
          {{ col.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="col in columns" :key="col.key">
          <slot 
            :name="col.key" 
            :item="item" 
            :value="item[col.key]"
          >
            {{ item[col.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>
```

---

# Utilisation DataTable avec scoped slots

```vue
<template>
  <DataTable :items="users" :columns="columns">
    <template #nom="{ item }">
      <strong>{{ item.nom }}</strong>
    </template>
    
    <template #email="{ value }">
      <a :href="`mailto:${value}`">{{ value }}</a>
    </template>
    
    <template #actions="{ item }">
      <button @click="edit(item)">Éditer</button>
      <button @click="delete(item)">Supprimer</button>
    </template>
  </DataTable>
</template>
```

---

# Slots dynamiques

Les slots peuvent être déterminés dynamiquement

```vue
<script>
import Card from './components/Card.vue';

export default {
  components: {
    Card
  },
  data() {
    return {
      slotActif: 'header'
    }
  }
}
</script>

<template>
  <Card>
    <template #[slotActif]>
      Ce contenu ira dans le slot actif
    </template>
  </Card>
  
  <button @click="slotActif = 'header'">Header</button>
  <button @click="slotActif = 'footer'">Footer</button>
</template>
```

---

# Combinaison Props & Slots

Les slots et props travaillent ensemble pour créer des composants puissants

```vue
<!-- Modal.vue -->
<script>
export default {
  props: {
    show: Boolean,
    title: String,
    size: {
      type: String,
      default: 'medium'
    }
  },
  emits: ['close'],
  methods: {
    handleClose() {
      this.$emit('close');
    }
  }
}
</script>
```

---

# Modal - Template

```vue
<template>
  <Teleport to="body">
    <div v-if="show" class="modal-overlay" @click="handleClose">
      <div 
        class="modal-content" 
        :class="`modal-${size}`"
        @click.stop
      >
        <header class="modal-header">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
          <button @click="handleClose">×</button>
        </header>
        
        <div class="modal-body">
          <slot></slot>
        </div>
        
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="handleClose">Fermer</button>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>
```

---

# Utilisation du Modal

```vue
<script>
import Modal from './components/Modal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    confirmer() {
      // Logique de confirmation
      this.showModal = false;
    }
  }
}
</script>

<template>
  <button @click="showModal = true">Ouvrir Modal</button>
  
  <Modal 
    :show="showModal" 
    title="Confirmation"
    size="small"
    @close="showModal = false"
  >
    <p>Êtes-vous sûr de vouloir continuer ?</p>
    
    <template #footer>
      <button @click="showModal = false">Annuler</button>
      <button @click="confirmer">Confirmer</button>
    </template>
  </Modal>
</template>
```

---

# Exemple : Composant Layout

```vue
<!-- AppLayout.vue -->
<template>
  <div class="app-layout">
    <aside class="sidebar">
      <slot name="sidebar"></slot>
    </aside>
    
    <div class="main-content">
      <header class="header">
        <slot name="header"></slot>
      </header>
      
      <main class="content">
        <slot></slot>
      </main>
      
      <footer class="footer">
        <slot name="footer"></slot>
      </footer>
    </div>
  </div>
</template>
```

---

# Utilisation du Layout

```vue
<template>
  <AppLayout>
    <template #sidebar>
      <nav>
        <a href="/">Accueil</a>
        <a href="/produits">Produits</a>
        <a href="/contact">Contact</a>
      </nav>
    </template>
    
    <template #header>
      <h1>Mon Application</h1>
      <UserMenu />
    </template>
    
    <!-- Contenu principal -->
    <div>
      <h2>Bienvenue</h2>
      <p>Contenu de la page...</p>
    </div>
    
    <template #footer>
      <p>© 2025 Mon Application</p>
    </template>
  </AppLayout>
</template>
```

---

# Exemple : Composant Tabs

```vue
<!-- Tabs.vue -->
<script>
export default {
  data() {
    return {
      activeTab: 0
    }
  },
  provide() {
    return {
      activeTab: this.activeTab,
      setActiveTab: (index) => {
        this.activeTab = index;
      }
    }
  }
}
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
```

---

# Tab et TabPanel

```vue
<!-- Tab.vue -->
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  inject: ['activeTab', 'setActiveTab'],
  computed: {
    isActive() {
      return this.activeTab === this.index;
    }
  }
}
</script>

<template>
  <button 
    @click="setActiveTab(index)"
    :class="{ active: isActive }"
  >
    <slot></slot>
  </button>
</template>

<!-- TabPanel.vue -->
<script>
export default {
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  inject: ['activeTab']
}
</script>

<template>
  <div v-show="activeTab === index">
    <slot></slot>
  </div>
</template>
```

---

# Utilisation des Tabs

```vue
<template>
  <Tabs>
    <template #tabs>
      <Tab :index="0">Profil</Tab>
      <Tab :index="1">Paramètres</Tab>
      <Tab :index="2">Notifications</Tab>
    </template>
    
    <TabPanel :index="0">
      <h2>Profil</h2>
      <p>Informations du profil...</p>
    </TabPanel>
    
    <TabPanel :index="1">
      <h2>Paramètres</h2>
      <p>Configuration...</p>
    </TabPanel>
    
    <TabPanel :index="2">
      <h2>Notifications</h2>
      <p>Vos notifications...</p>
    </TabPanel>
  </Tabs>
</template>
```

---

# Composant Dropdown générique

```vue
<!-- Dropdown.vue -->
<script>
export default {
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
    }
  }
}
</script>
```

---

# Dropdown - Template

```vue
<template>
  <div class="dropdown" v-click-outside="close">
    <div class="dropdown-trigger" @click="toggle">
      <slot name="trigger" :isOpen="isOpen">
        <button>Menu ▼</button>
      </slot>
    </div>
    
    <Transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <slot :close="close"></slot>
      </div>
    </Transition>
  </div>
</template>

<style>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
```

---

# Utilisation du Dropdown

```vue
<template>
  <Dropdown>
    <template #trigger="{ isOpen }">
      <button class="btn">
        Options {{ isOpen ? '▲' : '▼' }}
      </button>
    </template>
    
    <template #default="{ close }">
      <a href="#" @click="close">Éditer</a>
      <a href="#" @click="close">Partager</a>
      <a href="#" @click="close">Supprimer</a>
    </template>
  </Dropdown>
</template>
```

---

# Liste avec template customisable

```vue
<!-- List.vue -->
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    emptyText: {
      type: String,
      default: 'Aucun élément'
    }
  }
}
</script>

<template>
  <div class="list">
    <div v-if="items.length === 0" class="empty">
      <slot name="empty">
        {{ emptyText }}
      </slot>
    </div>
    
    <div v-else>
      <slot name="header" :count="items.length"></slot>
      
      <div v-for="(item, index) in items" :key="item.id || index">
        <slot :item="item" :index="index">
          {{ item }}
        </slot>
      </div>
      
      <slot name="footer" :count="items.length"></slot>
    </div>
  </div>
</template>
```

---

# Utilisation de la List

```vue
<script>
import List from './components/List.vue';

export default {
  components: {
    List
  },
  data() {
    return {
      produits: [
        { id: 1, nom: 'Laptop', prix: 899 },
        { id: 2, nom: 'Souris', prix: 49 }
      ]
    }
  }
}
</script>

<template>
  <List :items="produits">
    <template #header="{ count }">
      <h2>{{ count }} produits</h2>
    </template>
    
    <template #default="{ item, index }">
      <div class="product-card">
        <span>{{ index + 1 }}.</span>
        <strong>{{ item.nom }}</strong>
        <span>{{ item.prix }}€</span>
      </div>
    </template>
    
    <template #footer="{ count }">
      <p>Total: {{ count }} articles</p>
    </template>
    
    <template #empty>
      <p>😢 Aucun produit disponible</p>
    </template>
  </List>
</template>
```

---

# Renderless Components

Composants qui fournissent de la logique sans UI

```vue
<!-- MouseTracker.vue -->
<script>
export default {
  data() {
    return {
      x: 0,
      y: 0
    }
  },
  methods: {
    update(event) {
      this.x = event.clientX;
      this.y = event.clientY;
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.update);
  },
  beforeUnmount() {
    window.removeEventListener('mousemove', this.update);
  }
}
</script>

<template>
  <slot :x="x" :y="y"></slot>
</template>
```

---

# Utilisation du Renderless Component

```vue
<template>
  <MouseTracker v-slot="{ x, y }">
    <p>Position de la souris: {{ x }}, {{ y }}</p>
    
    <div 
      class="cursor"
      :style="{ 
        left: x + 'px', 
        top: y + 'px' 
      }"
    ></div>
  </MouseTracker>
</template>
```

---

# Bonnes pratiques - Slots

### ✅ Faire

- Utiliser des noms de slots descriptifs
- Fournir du contenu fallback pertinent
- Documenter les props des scoped slots
- Utiliser TypeScript pour typer les slots

### ❌ Éviter

- Trop de slots dans un seul composant (> 5)
- Noms de slots génériques (slot1, slot2...)
- Slots obligatoires sans fallback
- Logique complexe dans les slots

---

# Pattern de composition avec slots

```vue
<!-- BaseButton.vue -->
<template>
  <button class="btn" :class="variant">
    <span v-if="$slots.icon" class="icon">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
    <span v-if="loading" class="spinner"></span>
  </button>
</template>

<!-- Utilisation -->
<BaseButton variant="primary">
  <template #icon>
    <IconSave />
  </template>
  Enregistrer
</BaseButton>
```

---

# Détection de slots

Vérifier si un slot est fourni

```vue
<script>
export default {
  computed: {
    hasHeader() {
      return !!this.$slots.header;
    },
    hasFooter() {
      return !!this.$slots.footer;
    }
  }
}
</script>

<template>
  <div class="card">
    <header v-if="hasHeader" class="header">
      <slot name="header"></slot>
    </header>
    
    <div class="body">
      <slot></slot>
    </div>
    
    <footer v-if="hasFooter" class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

---

# Slots multiples avec v-for

```vue
<!-- Accordion.vue -->
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="accordion">
    <div 
      v-for="(item, index) in items" 
      :key="item.id"
      class="accordion-item"
    >
      <slot 
        name="item" 
        :item="item" 
        :index="index"
      >
        <div class="default-item">
          {{ item.title }}
        </div>
      </slot>
    </div>
  </div>
</template>
```

---

# Résumé du Module 2

✅ **Concepts** : Slots, composants génériques, relations parent/enfant

✅ **Slots simples** : Slot par défaut, contenu fallback

✅ **Slots nommés** : Plusieurs emplacements, directive v-slot

✅ **Scoped slots** : Passage de données enfant → parent

✅ **Slots dynamiques** : Détermination dynamique des slots

✅ **Props & Slots** : Combinaison pour composants puissants

---

# Cas d'usage des slots

| Type de slot | Cas d'usage |
|-------------|-------------|
| **Slot simple** | Contenu unique flexible (Button, Badge) |
| **Slots nommés** | Multiples zones (Card, Modal, Layout) |
| **Scoped slots** | Personnalisation du rendu (List, Table) |
| **Renderless** | Logique réutilisable (Mouse, Fetch) |
| **Slots dynamiques** | UI configurable dynamiquement |

---

# Travaux pratiques - Module 2

### Exercices à réaliser

1. 🎴 **Card générique** : Créer une carte avec header/body/footer
2. 📋 **Modal réutilisable** : Modal avec slots et props
3. 📊 **DataTable** : Tableau avec colonnes customisables
4. 🎨 **Layout** : Page layout avec sidebar/header/content/footer
5. 🗂️ **Tabs** : Système d'onglets avec slots
6. 🔽 **Dropdown** : Menu déroulant avec scoped slots

### Projet fil rouge

Enrichir l'application de produits avec des composants génériques
