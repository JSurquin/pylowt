# 🎯 RAPPORT : Intégration du fil rouge TaskFlow dans les modules théoriques

**Date** : 29 janvier 2026  
**Objectif** : Vérifier que les exercices TaskFlow sont intégrés DANS les slides théoriques (pas seulement dans les fichiers exercices séparés)

---

## 🎯 CE QUI EST ATTENDU

### Pédagogie souhaitée :

```
1. Slide théorique : "Voici les Props"
2. Slide théorique : "Voici les Events"
3. 🎯 SLIDE EXERCICE : "Créons TaskItem.vue avec Props & Events !"
   ↳ Élèves codent TaskItem.vue
   ↳ Correction dans `taskflow-app/src/components/TaskItem.vue`
4. Slide théorique : "Voici les Computed"
5. 🎯 SLIDE EXERCICE : "Ajoutons des filtres dans TaskList.vue !"
   ↳ Et ainsi de suite...
```

**Avantage** : Alternance immédiate théorie ↔️ pratique !

---

## 📊 RÉSULTATS DE L'ANALYSE

### ✅ MODULES BIEN INTÉGRÉS

| Module | Fichier théorique | Mentions TaskFlow | Statut |
|--------|-------------------|-------------------|--------|
| **Module 3** | `module3-vuejs-avance.md` | 80 mentions | ✅ EXCELLENT |

### ⚠️ MODULES À AMÉLIORER

| Module | Fichier théorique | Mentions TaskFlow | Problème |
|--------|-------------------|-------------------|----------|
| **Module 1** | `module1-introduction-bases.md` | 2 mentions | ❌ Exercices absents |
| **Module 2** | `module2-slots-composants.md` | 0 mention | ❌ Pas de TaskFlow ! |
| **Module 4** | `module4-pinia-state.md` | À vérifier | ⚠️ À analyser |
| **Module 5** | `module5-vue-router.md` | À vérifier | ⚠️ À analyser |
| **Module 6** | `module6-tests-vitest.md` | À vérifier | ⚠️ À analyser |

---

## 📦 DÉTAIL PAR MODULE

### MODULE 1 : Introduction et Bases

**Fichier** : `pages/module1-introduction-bases.md` (2470 lignes)

#### État actuel :
- ✅ Ligne ~1937 : Présentation du fil rouge TaskFlow
- ⚠️ Ligne ~2308 : Mention "projet fil rouge" mais parle d'une app de produits (pas TaskFlow)
- ❌ **Aucun exercice TaskFlow intégré dans la théorie**

#### Exercices à ajouter :

| Après ce concept théorique | Ligne | Exercice TaskFlow manquant |
|----------------------------|-------|----------------------------|
| Props & Events | ~1420 | 🎯 Créer **TaskItem.vue** |
| v-for + composants | ~1625 | 🎯 Créer **TaskList.vue** |
| v-model + formulaires | ~1150 | 🎯 Créer **TaskForm.vue** |
| Computed properties | ~1820 | 🎯 Ajouter filtres (activeCount, doneCount) |
| Watch + debounce | ~1935 | 🎯 Ajouter recherche avec debounce |

#### Exemple de slide à ajouter (après Props & Events) :

```markdown
---
layout: exercice-pratique
---

# 🎯 Exercice TaskFlow : TaskItem.vue

Maintenant qu'on maîtrise **Props** et **Events**, créons le premier composant de TaskFlow !

### 📝 Objectif
Créer un composant qui affiche une tâche et permet de la toggle/supprimer

### 🎯 Spécifications

**Props** :
```vue
task: {
  type: Object,
  required: true
  // { id, title, description, priority, done }
}
```

**Events** :
- `@toggle` : Émis quand on coche/décoche (émettre l'id)
- `@delete` : Émis quand on clique sur supprimer (émettre l'id)

**Affichage** :
- Titre de la tâche
- Description (optionnelle)
- Badge de priorité coloré (low/medium/high/urgent)
- Checkbox pour marquer done
- Bouton supprimer (🗑️)
- Classe CSS `.done` si la tâche est terminée (texte barré)

### 💡 Indice
Utilisez une `computed` property pour formater le label de priorité !

### ✅ Correction
👉 Voir `taskflow-app/src/components/TaskItem.vue`

### 🎨 Styles
```css
.task-item.done {
  opacity: 0.6;
}
.task-item.done .task-title {
  text-decoration: line-through;
}
```

---
```

---

### MODULE 2 : Slots et Composants Génériques

**Fichier** : `pages/module2-slots-composants.md` (1247 lignes)

#### État actuel :
- ❌ **AUCUNE mention de TaskFlow**
- ❌ **Aucun exercice TaskFlow intégré**

**C'est le module le plus problématique !**

#### Exercices à ajouter :

| Après ce concept théorique | Ligne estimée | Exercice TaskFlow manquant |
|----------------------------|---------------|----------------------------|
| Slots simples + nommés | ~350 | 🎯 Créer **TaskCard.vue** (4 slots) |
| Scoped slots | ~550 | 🎯 Créer **BoardColumn.vue** |
| Teleport | ~900 | 🎯 Créer **TaskModal.vue** |

#### Exemple 1 - TaskCard.vue (après Slots nommés) :

```markdown
---
# 🎯 Exercice TaskFlow : TaskCard.vue

Créons un composant **ultra-flexible** avec des slots nommés !

### 📝 Objectif
Une carte réutilisable pour afficher n'importe quel contenu dans TaskFlow

### 🎯 Spécifications

**Props** :
```vue
variant: {
  type: String,
  default: 'default',
  validator: (v) => ['default', 'success', 'warning', 'danger'].includes(v)
},
padding: {
  type: Boolean,
  default: true
}
```

**Slots nommés** :
- `header` : En-tête personnalisable (optionnel)
- `default` : Contenu principal (obligatoire)
- `actions` : Zone de boutons (optionnel)
- `footer` : Pied de page (optionnel)

**Comportement** :
- N'afficher le header que si le slot est fourni → `v-if="$slots.header"`
- Border-left colorée selon le variant
- Padding conditionnel selon la prop

### 💡 Astuces
- Utilisez `computed` pour générer les classes dynamiques
- Testez avec différents variants !

### ✅ Correction
👉 Voir `taskflow-app/src/components/TaskCard.vue`

---
```

#### Exemple 2 - BoardColumn.vue (après Scoped Slots) :

```markdown
---
# 🎯 Exercice TaskFlow : BoardColumn.vue

Créons une colonne Kanban avec **scoped slots** pour la flexibilité maximale !

### 📝 Objectif
Une colonne réutilisable qui expose les données des tâches au parent

### 🎯 Spécifications

**Props** :
```vue
title: { type: String, required: true },
tasks: { type: Array, default: () => [] },
color: { type: String, default: '#3b82f6' }
```

**Scoped Slot `task`** (expose) :
```vue
<slot 
  name="task"
  :task="task"
  :index="index"
  :isFirst="index === 0"
  :isLast="index === tasks.length - 1"
>
  <!-- Fallback -->
</slot>
```

**Slots nommés** :
- `header` : En-tête personnalisable (scoped: `title`, `count`)
- `empty` : Message si `tasks.length === 0`

**Bonus** :
- Drag & drop des tâches (@dragstart, @drop, @dragover)
- Classe `.drag-over` quand on survole avec une tâche

### ✅ Correction
👉 Voir `taskflow-app/src/components/BoardColumn.vue`

---
```

---

### MODULE 3 : Vue.js Avancé

**Fichier** : `pages/module3-vuejs-avance.md`

#### État actuel :
- ✅ **80 occurrences de "TaskFlow"** 🎉
- ✅ Exercices intégrés dans la théorie

**Module déjà bien fait !** Pas de modifications nécessaires.

**Vérification** :
- v-auto-focus ✅
- v-click-outside ✅
- v-tooltip ✅
- Plugin directives ✅

---

### MODULE 4 : State Management (Pinia)

**Fichier** : `pages/module4-pinia-state.md`

#### État actuel :
- ⚠️ **4 mentions** de mots-clés liés (TaskFlow, store, etc.)
- ❌ **Seulement 2 emojis 🎯** (pas de vrais exercices)
- ❌ **Aucun exercice TaskFlow intégré dans la théorie**

#### Exercices à ajouter :

| Après ce concept théorique | Ligne estimée | Exercice TaskFlow manquant |
|----------------------------|---------------|----------------------------|
| defineStore + state | ~300 | 🎯 Créer **useTasksStore()** (state) |
| Getters | ~450 | 🎯 Ajouter getters (filteredTasks, activeCount) |
| Actions | ~600 | 🎯 Ajouter actions CRUD (addTask, deleteTask, etc.) |
| Stores multiples | ~750 | 🎯 Créer **useCategoriesStore()** |
| Communication stores | ~850 | 🎯 Faire communiquer tasks ↔️ categories |
| Persistence | ~900 | 🎯 Ajouter localStorage dans stores |
| Utilisation dans vues | ~950 | 🎯 Connecter TaskListView au store |

#### Exemple de slide à ajouter (après defineStore) :

```markdown
---
# 🎯 Exercice TaskFlow : useTasksStore()

Créons notre premier **store Pinia** pour gérer les tâches !

### 📝 Objectif
Un store centralisé pour toutes les opérations sur les tâches

### 🎯 Spécifications

**State** :
```js
state: () => ({
  tasks: [],
  filter: 'all',
  loading: false,
  error: null
})
```

**Getters** :
- `filteredTasks` : Retourne les tâches selon le filtre actif
- `activeCount` : Nombre de tâches non terminées
- `doneCount` : Nombre de tâches terminées
- `getTaskById(id)` : Getter paramétré

**Actions** :
- `addTask(task)` : Ajouter une tâche
- `deleteTask(id)` : Supprimer une tâche
- `toggleTask(id)` : Toggle done/undone
- `setFilter(filter)` : Changer le filtre

### 💡 Astuces
- Utilisez `Date.now()` pour générer les IDs
- N'oubliez pas `this.` dans les actions pour accéder au state !

### ✅ Correction
👉 Voir `taskflow-app/src/stores/tasks.js`

---
```

**Statut** : ❌ **7 exercices à ajouter**

---

### MODULE 5 : Vue Router

**Fichier** : `pages/module5-vue-router.md`

#### État actuel :
- ⚠️ **58 mentions** de mots-clés (router, route, etc.)
- ❌ **Seulement 2 emojis 🎯** (pas de vrais exercices)
- ❌ **Aucun exercice TaskFlow intégré dans la théorie**

#### Exercices à ajouter :

| Après ce concept théorique | Ligne estimée | Exercice TaskFlow manquant |
|----------------------------|---------------|----------------------------|
| createRouter | ~250 | 🎯 Créer **router/index.js** avec routes de base |
| Routes simples | ~300 | 🎯 Créer routes /, /tasks, /login |
| Lazy loading | ~400 | 🎯 Convertir en lazy loading |
| Routes dynamiques | ~500 | 🎯 Ajouter /task/:id |
| beforeEach guard | ~650 | 🎯 Ajouter protection auth |
| Meta fields | ~700 | 🎯 Ajouter meta (requiresAuth, requiresAdmin) |
| Vues + router | ~800 | 🎯 Créer TaskListView.vue avec store |
| Vue détail | ~850 | 🎯 Créer TaskDetailView.vue (params) |
| LoginView | ~900 | 🎯 Créer LoginView avec redirect |
| 404 | ~450 | 🎯 Créer NotFoundView.vue |

#### Exemple de slide à ajouter (après beforeEach) :

```markdown
---
# 🎯 Exercice TaskFlow : Navigation Guards

Protégeons les routes de TaskFlow avec des **guards** !

### 📝 Objectif
Empêcher l'accès aux routes protégées si l'utilisateur n'est pas connecté

### 🎯 Spécifications

**Guard global (beforeEach)** :
```js
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  // 1. Changer le titre de la page
  document.title = to.meta.title || 'TaskFlow';
  
  // 2. Vérifier l'authentification
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    });
    return;
  }
  
  // 3. Vérifier les droits admin
  if (to.meta.requiresAdmin && !authStore.canCreateCategories) {
    alert('Accès réservé aux administrateurs');
    next({ name: 'Home' });
    return;
  }
  
  next();
});
```

**Meta fields à ajouter** :
- `requiresAuth: true` sur /tasks, /dashboard
- `requiresAdmin: true` sur /dashboard

### ✅ Correction
👉 Voir `taskflow-app/src/router/index.js` (ligne 77-106)

---
```

**Statut** : ❌ **10 exercices à ajouter**

---

### MODULE 6 : Tests (Vitest)

**Fichier** : `pages/module6-tests-vitest.md`

#### État actuel :
- ✅ **99 mentions** de mots-clés (test, vitest, etc.)
- ❌ **Seulement 3 emojis 🎯** (pas de vrais exercices)
- ⚠️ Quelques exemples de tests mais **pas d'exercices TaskFlow intégrés**

#### Exercices à ajouter :

| Après ce concept théorique | Ligne estimée | Exercice TaskFlow manquant |
|----------------------------|---------------|----------------------------|
| Configuration Vitest | ~200 | 🎯 Configurer Vitest pour TaskFlow |
| Tests de base | ~300 | 🎯 Premier test : store state initial |
| Tests store actions | ~450 | 🎯 Tester addTask(), deleteTask() |
| Tests getters | ~500 | 🎯 Tester filteredTasks, activeCount |
| Tests composants | ~650 | 🎯 Tester TaskItem.vue (props, events) |
| mount() | ~700 | 🎯 Tester TaskForm.vue avec mount |
| setActivePinia | ~550 | 🎯 Tester store avec Pinia |

#### Exemple de slide à ajouter (après Tests de store) :

```markdown
---
# 🎯 Exercice TaskFlow : Tester useTasksStore()

Testons notre **store Pinia** avec Vitest !

### 📝 Objectif
Suite de tests complète pour le store tasks

### 🎯 Tests à écrire

**Fichier** : `src/__tests__/stores/tasks.spec.js`

```js
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTasksStore } from '@/stores/tasks';

describe('Tasks Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('initialise avec les tâches par défaut', () => {
    const store = useTasksStore();
    expect(store.tasks).toHaveLength(3);
    expect(store.filter).toBe('all');
  });
  
  it('ajoute une tâche', () => {
    const store = useTasksStore();
    const taskData = { title: 'Test', priority: 'high' };
    store.addTask(taskData);
    expect(store.tasks).toHaveLength(4);
  });
  
  // TODO: Ajouter tests pour deleteTask, toggleTask, etc.
});
```

### 💡 Astuces
- `setActivePinia()` avant CHAQUE test
- `toHaveLength()` pour vérifier les tableaux
- `toMatchObject()` pour comparer des objets partiels

### ✅ Correction
👉 Voir `taskflow-app/src/__tests__/stores/tasks.spec.js`

---
```

**Statut** : ⚠️ **7 exercices à ajouter** (mais moins critique car les élèves auront pas le temps)

---

## 🎯 PLAN D'ACTION COMPLET

### 🔴 PRIORITÉ HAUTE (À FAIRE IMMÉDIATEMENT)

1. **Module 2** : ❌ Ajouter **3 exercices** TaskFlow
   - TaskCard.vue (après slots nommés) → ligne ~350
   - BoardColumn.vue (après scoped slots) → ligne ~550
   - TaskModal.vue (après Teleport) → ligne ~900

2. **Module 1** : ❌ Ajouter **5 exercices** TaskFlow
   - TaskItem.vue (après Props & Events) → ligne ~1420
   - TaskList.vue (après v-for) → ligne ~1625
   - TaskForm.vue (après v-model) → ligne ~1150
   - Filtres (après Computed) → ligne ~1820
   - Recherche (après Watch) → ligne ~1935

### 🟡 PRIORITÉ MOYENNE

3. **Module 4 (Pinia)** : ❌ Ajouter **7 exercices** TaskFlow
   - useTasksStore (state) → ligne ~300
   - Getters → ligne ~450
   - Actions CRUD → ligne ~600
   - useCategoriesStore → ligne ~750
   - Communication stores → ligne ~850
   - Persistence localStorage → ligne ~900
   - Connexion vues → ligne ~950

4. **Module 5 (Router)** : ❌ Ajouter **10 exercices** TaskFlow
   - router/index.js → ligne ~250
   - Routes de base → ligne ~300
   - Lazy loading → ligne ~400
   - /task/:id → ligne ~500
   - 404 → ligne ~450
   - beforeEach guard → ligne ~650
   - Meta fields → ligne ~700
   - TaskListView → ligne ~800
   - TaskDetailView → ligne ~850
   - LoginView → ligne ~900

### 🟢 PRIORITÉ BASSE (si temps)

5. **Module 6 (Tests)** : ⚠️ Ajouter **7 exercices** TaskFlow
   - Config Vitest → ligne ~200
   - Test store state → ligne ~300
   - Test actions → ligne ~450
   - Test getters → ligne ~500
   - Test composant → ligne ~650
   - Test mount() → ligne ~700
   - Test avec Pinia → ligne ~550

### 📊 RÉCAPITULATIF DES EXERCICES

| Module | Actuellement | À ajouter | Total final |
|--------|--------------|-----------|-------------|
| Module 1 | 0 exercice | 5 exercices | 5 |
| Module 2 | 0 exercice | 3 exercices | 3 |
| Module 3 | ✅ Bien intégré | 0 | ✅ OK |
| Module 4 | 0 exercice | 7 exercices | 7 |
| Module 5 | 0 exercice | 10 exercices | 10 |
| Module 6 | 0 exercice | 7 exercices | 7 |
| **TOTAL** | **~0** | **32 exercices** | **32** |

---

## 📝 TEMPLATE DE SLIDE EXERCICE

Voici le template à utiliser pour chaque exercice TaskFlow :

```markdown
---
layout: exercice-pratique
---

# 🎯 Exercice TaskFlow : [NomComposant.vue]

[Phrase d'accroche liée au concept qu'on vient de voir]

### 📝 Objectif
[Description courte de ce qu'on va créer]

### 🎯 Spécifications

**Props** :
```vue
[Props avec types et validations]
```

**Events / Slots / Autre** :
[Détails techniques]

**Comportement** :
- [Point 1]
- [Point 2]

### 💡 Indice
[Un conseil pour réussir l'exercice]

### ✅ Correction
👉 Voir `taskflow-app/src/components/[NomComposant].vue`

---
```

---

## ✅ CONCLUSION

### 📊 État actuel de l'intégration

| Module | Exercices intégrés | Mentions TaskFlow | Statut |
|--------|-------------------|-------------------|--------|
| **Module 1** | 0 | 2 | ❌ Absent |
| **Module 2** | 0 | 0 | ❌ Absent |
| **Module 3** | ✅ | 80 | ✅ **PARFAIT** |
| **Module 4** | 0 | 4 | ❌ Absent |
| **Module 5** | 0 | 58 | ❌ Absent |
| **Module 6** | 0 | 99 | ❌ Absent |

### 🎯 Travail à effectuer

**TOTAL : 32 exercices TaskFlow à intégrer dans les slides théoriques**

Répartition :
- 🔴 **Priorité haute** : 8 exercices (Modules 1 & 2)
- 🟡 **Priorité moyenne** : 17 exercices (Modules 4 & 5)  
- 🟢 **Priorité basse** : 7 exercices (Module 6)

### 💡 Bénéfice attendu

**AVANT** (actuellement) :
```
Théorie → Théorie → Théorie → Exercices à la fin
❌ Ennuyeux, les élèves décrochent
```

**APRÈS** (objectif) :
```
Théorie → 🎯 Exercice immédiat → Théorie → 🎯 Exercice immédiat
✅ Alternance, apprentissage actif, fil rouge construit pas à pas
```

### 🚀 Prochaines étapes

1. ✅ Rapport terminé avec templates de slides prêts à l'emploi
2. ⏭️ Copier/coller les templates dans les modules théoriques
3. ⏭️ Ajuster les numéros de lignes si nécessaire
4. ⏭️ Tester le flow pédagogique

**Objectif final** : Les élèves construisent TaskFlow **en même temps** qu'ils apprennent les concepts !

---

**Auteur** : Analyse automatique  
**Date** : 29 janvier 2026
