---
layout: intro
routeAlias: 'fil-rouge'
---

<a name="fil-rouge" id="fil-rouge"></a>

# 🎯 Fil Rouge : TaskFlow
## Notre Trello-like progressif

---

# 🚀 TaskFlow : Votre projet fil rouge

### 📱 Une application de gestion de tâches complète

Tout au long de la formation, nous allons construire **TaskFlow**, une application moderne de gestion de tâches (type Trello/Notion).

### 🎨 Fonctionnalités

- 📋 **Boards multiples** : Personnel, Travail, Projets
- 📝 **Tasks complètes** : Titre, description, priorité, deadline
- 🏷️ **Colonnes customisables** : À faire, En cours, Terminé, En attente
- 🎨 **Labels colorés** : Urgent, Bug, Feature, Idée
- 👤 **Assignation** : Attribuer des tâches aux membres
- 🔍 **Recherche & filtres** : Trouver rapidement vos tâches
- 📊 **Dashboard** : Vue d'ensemble de votre productivité
- 🌙 **Dark mode** : Parce que c'est stylé !

---

# 🗺️ Progression Module par Module

### 📦 Module 1 - Les fondations

**Composants de base** :
- `TaskItem.vue` : Une tâche individuelle
- `TaskList.vue` : Liste de tâches
- `TaskForm.vue` : Formulaire d'ajout/édition
- `TaskFilter.vue` : Filtres de recherche

**Concepts utilisés** :
- Data binding
- Directives (v-for, v-if, v-model)
- Props & Events
- Computed properties
- Watch pour la recherche

---

# 📦 Module 2 - Composants réutilisables

**Avec les Slots** :
- `TaskCard.vue` : Carte générique avec slots (header, content, actions)
- `Modal.vue` : Modal réutilisable pour éditer/supprimer
- `BoardColumn.vue` : Colonne avec slot pour les tâches

**Concepts utilisés** :
- Slots simples
- Slots nommés
- Scoped slots (passer les données de task)
- Composition de composants

---

# 📦 Module 3 - Fonctionnalités avancées

**Directives personnalisées** :
- `v-drag` : Drag & drop pour déplacer les tâches
- `v-auto-focus` : Focus automatique sur les inputs
- `v-click-outside` : Fermer les modals en cliquant dehors

**SFC avancés** :
- CSS Scoped pour chaque composant
- Variables CSS réactives pour le thème
- TypeScript pour les interfaces Task, Board, User

---

# 📦 Module 4 - State Management avec Pinia

**Stores** :
- `useTaskStore()` : Gestion des tâches (CRUD complet)
- `useBoardStore()` : Gestion des boards
- `useUserStore()` : Authentification & préférences
- `useFilterStore()` : État des filtres actifs

**Actions** :
- Créer, modifier, supprimer des tâches
- Déplacer entre colonnes
- Persistence avec localStorage
- Communication entre stores

---

# 📦 Module 5 - Navigation avec Vue Router

**Routes** :
```javascript
/                    → Dashboard (vue d'ensemble)
/boards              → Liste des boards
/board/:id           → Vue détaillée d'un board
/board/:id/task/:taskId  → Détail d'une tâche (nested route)
/settings            → Paramètres utilisateur
/login               → Page de connexion
/404                 → Page non trouvée
```

**Features** :
- Lazy loading des boards
- Guards pour protéger /settings
- Navigation programmatique
- Transitions entre pages

---

# 📦 Module 6 - Tests avec Vitest

**Suite de tests complète** :

**Tests unitaires** :
- Logique du store (ajout/suppression tâches)
- Filtres et recherche
- Calculs (tâches terminées, etc.)

**Tests de composants** :
- TaskItem affiche correctement les props
- TaskForm émet les événements
- Drag & drop fonctionne

**Tests d'intégration** :
- Flux complet : créer → modifier → déplacer → supprimer
- Filtres + recherche ensemble
- Navigation entre boards

---

# 🎨 Architecture finale de TaskFlow

```
TaskFlow/
├── src/
│   ├── components/
│   │   ├── task/
│   │   │   ├── TaskItem.vue
│   │   │   ├── TaskList.vue
│   │   │   ├── TaskForm.vue
│   │   │   └── TaskFilter.vue
│   │   ├── board/
│   │   │   ├── BoardColumn.vue
│   │   │   ├── BoardHeader.vue
│   │   │   └── BoardCard.vue
│   │   ├── common/
│   │   │   ├── Modal.vue
│   │   │   ├── Button.vue
│   │   │   ├── Input.vue
│   │   │   └── Select.vue
│   │   └── layout/
│   │       ├── AppHeader.vue
│   │       ├── AppSidebar.vue
│   │       └── AppFooter.vue
│   ├── views/
│   │   ├── DashboardView.vue
│   │   ├── BoardsView.vue
│   │   ├── BoardDetailView.vue
│   │   ├── SettingsView.vue
│   │   └── LoginView.vue
│   ├── stores/
│   │   ├── task.js
│   │   ├── board.js
│   │   ├── user.js
│   │   └── filter.js
│   ├── directives/
│   │   ├── drag.js
│   │   ├── auto-focus.js
│   │   └── click-outside.js
│   ├── router/
│   │   └── index.js
│   └── types/
│       └── index.ts
```

---

# 🧩 Exemple de Task (données)

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  columnId: 'todo' | 'in-progress' | 'done' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  labels: Label[];
  assignee: User | null;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Board {
  id: string;
  name: string;
  description: string;
  columns: Column[];
  members: User[];
  color: string;
}

interface Column {
  id: string;
  name: string;
  tasks: Task[];
  order: number;
}
```

---

# 💡 Pourquoi ce fil rouge ?

### 🎯 Avantages pédagogiques

- **Progression naturelle** : Chaque module ajoute des fonctionnalités
- **Contexte réel** : Vous comprenez POURQUOI on utilise chaque outil
- **Portfolio** : Une vraie app à montrer en entretien
- **Apprentissage actif** : Vous construisez, pas seulement vous écoutez

### 🚀 À la fin de la formation

Vous aurez :
- ✅ Une application **complète et fonctionnelle**
- ✅ Un projet **déployable** (Vercel/Netlify)
- ✅ Une **vraie compréhension** de Vue.js
- ✅ Des **compétences recherchées** par les entreprises

---

# 🎨 Aperçu visuel (wireframe)

```
┌──────────────────────────────────────────────────────────┐
│  TaskFlow                    🔍 Search...   👤 User  ⚙️  │
├──────────────────────────────────────────────────────────┤
│  📋 Boards  │  📊 Dashboard  │  ⚙️ Settings              │
├──────────┬──────────────┬─────────────┬──────────────────┤
│          │              │             │                  │
│ À FAIRE  │  EN COURS    │  TERMINÉ    │  BLOQUÉ          │
│ ──────── │  ─────────── │  ────────   │  ───────         │
│          │              │             │                  │
│ ┌──────┐ │ ┌──────────┐ │ ┌─────────┐ │                  │
│ │ Task │ │ │ Task     │ │ │ Task    │ │                  │
│ │ #1   │ │ │ #2       │ │ │ #3      │ │                  │
│ │ 🔴   │ │ │ 🟡       │ │ │ 🟢      │ │                  │
│ └──────┘ │ └──────────┘ │ └─────────┘ │                  │
│          │              │             │                  │
│ ┌──────┐ │ ┌──────────┐ │             │                  │
│ │ Task │ │ │ Task     │ │             │                  │
│ │ #4   │ │ │ #5       │ │             │                  │
│ │ 🟠   │ │ │ 🔵       │ │             │                  │
│ └──────┘ │ └──────────┘ │             │                  │
│          │              │             │                  │
│ + Add    │ + Add        │ + Add       │ + Add            │
└──────────┴──────────────┴─────────────┴──────────────────┘
```

---

# 🎓 Prêts à construire TaskFlow ?

### 💪 Ce qu'il vous faut

- ✅ Motivation (vous l'avez déjà !)
- ✅ Ordinateur avec Node.js
- ✅ Éditeur de code (VS Code recommandé)
- ✅ Navigateur moderne

### 🚀 On commence dès le Module 1 !

**Objectif** : À la fin du Module 1, vous aurez déjà :
- 📝 Créé votre première tâche
- 📋 Affiché une liste de tâches
- ✅ Marqué des tâches comme terminées
- 🔍 Filtré les tâches

**Let's go !** 🎉
