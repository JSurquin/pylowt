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

- 📋 **Liste de tâches centralisée** : Toutes vos tâches au même endroit
- 📝 **Tasks complètes** : Titre, description, priorité
- 🏷️ **Catégories** : Personnel, Travail, Urgent (avec couleurs et icônes)
- 📊 **Filtres** : Toutes, Actives, Terminées
- 🔍 **Recherche** : Trouver rapidement vos tâches
- 📊 **Dashboard** : Vue d'ensemble de votre productivité (admin)
- 🔐 **Authentification** : Gestion des permissions (admin, editor, user)

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
- `v-auto-focus` : Focus automatique sur les inputs
- `v-click-outside` : Fermer les modals en cliquant dehors
- `v-tooltip` : Afficher des infobulles

**Drag & Drop** :
- Implémentation native HTML5 dans `BoardColumn.vue`
- Attributs `draggable` et événements `@dragstart`, `@drop`

**SFC avancés** :
- CSS Scoped pour chaque composant
- Variables CSS réactives pour le thème
- TypeScript pour les interfaces Task, Category, User

---

# 📦 Module 4 - State Management avec Pinia

**Stores** :
- `useTasksStore()` : Gestion des tâches (CRUD, filtres, persistence)
- `useCategoriesStore()` : Gestion des catégories de tâches
- `useAuthStore()` : Authentification & permissions (admin, editor, user)

**Fonctionnalités** :
- CRUD complet des tâches
- Liaison tasks ↔ categories
- Filtres intégrés (all, active, done)
- Persistence avec localStorage
- Communication entre stores

---

# 📦 Module 5 - Navigation avec Vue Router

**Routes** :
```javascript
/                    → HomePage (page d'accueil)
/tasks               → Liste des tâches (TaskListView)
/task/:id            → Détail d'une tâche (TaskDetailView)
/categories          → Gestion des catégories (CategoriesView)
/dashboard           → Dashboard admin (statistiques)
/login               → Page de connexion
/404                 → Page non trouvée
```

**Features** :
- Lazy loading de toutes les vues
- Guards pour protéger `/dashboard` (admin uniquement)
- Guard pour protéger toutes les routes sauf `/` et `/login`
- Navigation programmatique (`$router.push`)
- Redirection après login avec query param `?redirect=`

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
│   │   ├── TaskItem.vue
│   │   ├── TaskList.vue
│   │   ├── TaskForm.vue
│   │   ├── TaskCard.vue
│   │   ├── BoardColumn.vue
│   │   └── TaskModal.vue
│   ├── views/
│   │   ├── HomePage.vue
│   │   ├── TaskListView.vue
│   │   ├── TaskDetailView.vue
│   │   ├── CategoriesView.vue
│   │   ├── DashboardView.vue
│   │   ├── LoginView.vue
│   │   └── NotFoundView.vue
│   ├── stores/
│   │   ├── tasks.js        # Store principal des tâches
│   │   ├── categories.js   # Catégories avec liaison tasks
│   │   └── auth.js         # Authentification et permissions
│   ├── directives/
│   │   ├── autoFocus.js
│   │   ├── clickOutside.js
│   │   ├── tooltip.js
│   │   └── index.js        # Plugin de directives
│   ├── router/
│   │   └── index.js
│   └── __tests__/
│       ├── components/
│       └── stores/
```

---

# 🧩 Exemple de Task (données)

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  categoryId: number;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
  completedAt?: string;
}

interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
}

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'editor' | 'user';
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
│  📋 Mes tâches  │  🏷️ Catégories  │  📊 Dashboard       │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  Filtres : [Toutes] [Actives] [Terminées]              │
│                                                          │
│  Catégories : 👤 Personnel (3)  💼 Travail (5)  🚨 Urgent (1) │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │ ✅ Apprendre Vue.js 3                   │  ✏️  🗑️   │
│  │    Suivre la formation complète          │            │
│  │    🔴 URGENT                             │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │ ⬜ Créer TaskFlow                       │  ✏️  🗑️   │
│  │    Application de gestion de tâches      │            │
│  │    🟠 HAUTE                              │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│  ┌─────────────────────────────────────────┐            │
│  │ ✅ Setup du projet                      │  ✏️  🗑️   │
│  │                                          │            │
│  │    🟡 MOYENNE                            │            │
│  └─────────────────────────────────────────┘            │
│                                                          │
│  + Ajouter une tâche                                    │
└──────────────────────────────────────────────────────────┘
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
