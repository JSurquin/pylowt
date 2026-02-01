---
layout: new-section
routeAlias: 'module6-exercices'
---

<a name="module6-exercices" id="module6-exercices"></a>

# Exercices Pratiques
## Module 6 - Tests avec Vitest

---

# 🎯 Fil Rouge : TaskFlow
## Exercices Module 6

Maintenant que vous avez vu tous les concepts théoriques du Module 6, il est temps de tester TaskFlow avec Vitest !

### Rappel des concepts du Module 6

<div class="text-sm">

**6.1 Configuration Vitest** : Installation, vite.config.js  
**6.2 Tests unitaires** : describe, it, expect  
**6.3 Tests composants** : @vue/test-utils, mount, wrapper  
**6.4 Mocks** : vi.fn, vi.mock, fetch  
**6.5 Coverage** : v8, rapports

</div>

### Les 6 exercices progressifs

Nous allons tester l'application TaskFlow complète.

---

# Exercice 1 : Configuration Vitest

### Objectif
Configurer Vitest pour tester TaskFlow

### Installation

```bash
npm install -D vitest @vue/test-utils happy-dom @vitest/ui
```

### Configuration vite.config.js

```js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules', 'dist']
    }
  }
});
```

---

# Exercice 1 - Scripts package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**Lancer les tests** :

```bash
npm run test
npm run test:ui
npm run test:coverage
```

---

# Exercice 2 : Tester Store Tasks

### Objectif
Créer des tests pour le store tasks

### Fichier : `__tests__/stores/tasks.spec.js`

### Tests à écrire

- ✅ État initial
- ✅ `addTask()` ajoute une tâche
- ✅ `updateTask()` modifie une tâche
- ✅ `deleteTask()` supprime une tâche
- ✅ `toggleTask()` change le statut
- ✅ `filteredTasks` getter
- ✅ `activeCount` et `doneCount` getters

---

# Exercice 2 - Solution tasks.spec.js (1/3)

```js
// __tests__/stores/tasks.spec.js
import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTasksStore } from '@/stores/tasks';

describe('Tasks Store', () => {
  beforeEach(() => {
    // ✅ Créer une nouvelle instance de Pinia avant chaque test
    setActivePinia(createPinia());
  });
  
  it('initialise avec un état vide', () => {
    const store = useTasksStore();
    
    expect(store.tasks).toEqual([]);
    expect(store.filter).toBe('all');
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });
  
  it('ajoute une tâche', () => {
    const store = useTasksStore();
    
    const taskData = {
      title: 'Nouvelle tâche',
      description: 'Description',
      priority: 'high'
    };
    
    store.addTask(taskData);
    
    expect(store.tasks).toHaveLength(1);
    expect(store.tasks[0]).toMatchObject(taskData);
    expect(store.tasks[0].id).toBeDefined();
    expect(store.tasks[0].done).toBe(false);
  });
  
  // Suite dans slide suivante...
});
```

---

# Exercice 2 - Solution tasks.spec.js (2/3)

```js
// __tests__/stores/tasks.spec.js (suite)
describe('Tasks Store', () => {
  // ... tests précédents
  
  it('modifie une tâche', () => {
    const store = useTasksStore();
    
    store.addTask({ title: 'Tâche 1', priority: 'low' });
    const taskId = store.tasks[0].id;
    
    store.updateTask(taskId, { 
      title: 'Tâche modifiée', 
      priority: 'urgent' 
    });
    
    expect(store.tasks[0].title).toBe('Tâche modifiée');
    expect(store.tasks[0].priority).toBe('urgent');
  });
  
  it('supprime une tâche', () => {
    const store = useTasksStore();
    
    store.addTask({ title: 'Tâche 1' });
    store.addTask({ title: 'Tâche 2' });
    const taskId = store.tasks[0].id;
    
    store.deleteTask(taskId);
    
    expect(store.tasks).toHaveLength(1);
    expect(store.tasks[0].title).toBe('Tâche 2');
  });
  
  it('toggle le statut d\'une tâche', () => {
    const store = useTasksStore();
    
    store.addTask({ title: 'Tâche 1' });
    const taskId = store.tasks[0].id;
    
    expect(store.tasks[0].done).toBe(false);
    
    store.toggleTask(taskId);
    expect(store.tasks[0].done).toBe(true);
    
    store.toggleTask(taskId);
    expect(store.tasks[0].done).toBe(false);
  });
  
  // Suite dans slide suivante...
});
```

---

# Exercice 2 - Solution tasks.spec.js (3/3)

```js
// __tests__/stores/tasks.spec.js (suite)
describe('Tasks Store - Getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('filtre les tâches actives', () => {
    const store = useTasksStore();
    
    store.addTask({ title: 'Active 1' });
    store.addTask({ title: 'Active 2' });
    store.addTask({ title: 'Done 1' });
    store.toggleTask(store.tasks[2].id);
    
    store.setFilter('active');
    
    expect(store.filteredTasks).toHaveLength(2);
    expect(store.filteredTasks.every(t => !t.done)).toBe(true);
  });
  
  it('calcule activeCount et doneCount', () => {
    const store = useTasksStore();
    
    store.addTask({ title: 'Task 1' });
    store.addTask({ title: 'Task 2' });
    store.addTask({ title: 'Task 3' });
    store.toggleTask(store.tasks[0].id);
    
    expect(store.activeCount).toBe(2);
    expect(store.doneCount).toBe(1);
  });
  
  it('recherche une tâche par ID', () => {
    const store = useTasksStore();
    
    store.addTask({ title: 'Task 1' });
    const taskId = store.tasks[0].id;
    
    const found = store.getTaskById(taskId);
    
    expect(found).toBeDefined();
    expect(found.title).toBe('Task 1');
  });
});
```

---

# Exercice 3 : Tester TaskItem.vue

### Objectif
Tester le composant TaskItem

### Fichier : `__tests__/components/TaskItem.spec.js`

### Tests à écrire

- ✅ Affiche le titre de la tâche
- ✅ Affiche la description
- ✅ Affiche la priorité
- ✅ Émet `toggle` au clic sur checkbox
- ✅ Émet `delete` au clic sur bouton supprimer
- ✅ Applique classe `done` si tâche terminée

---

# Exercice 3 - Solution TaskItem.spec.js (1/2)

```js
// __tests__/components/TaskItem.spec.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import TaskItem from '@/components/TaskItem.vue';

describe('TaskItem.vue', () => {
  const mockTask = {
    id: 1,
    title: 'Ma tâche',
    description: 'Description de la tâche',
    priority: 'high',
    done: false
  };
  
  it('affiche le titre et la description', () => {
    const wrapper = mount(TaskItem, {
      props: {
        task: mockTask
      }
    });
    
    expect(wrapper.text()).toContain('Ma tâche');
    expect(wrapper.text()).toContain('Description de la tâche');
  });
  
  it('affiche le badge de priorité', () => {
    const wrapper = mount(TaskItem, {
      props: {
        task: mockTask
      }
    });
    
    const priorityBadge = wrapper.find('.task-priority');
    expect(priorityBadge.exists()).toBe(true);
    expect(priorityBadge.text()).toContain('Haute');
  });
  
  // Suite dans slide suivante...
});
```

---

# Exercice 3 - Solution TaskItem.spec.js (2/2)

```js
// __tests__/components/TaskItem.spec.js (suite)
describe('TaskItem.vue - Events', () => {
  const mockTask = {
    id: 1,
    title: 'Ma tâche',
    priority: 'medium',
    done: false
  };
  
  it('émet toggle au clic sur checkbox', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask }
    });
    
    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.trigger('change');
    
    expect(wrapper.emitted('toggle')).toBeTruthy();
    expect(wrapper.emitted('toggle')[0]).toEqual([1]);
  });
  
  it('émet delete au clic sur bouton supprimer', async () => {
    const wrapper = mount(TaskItem, {
      props: { task: mockTask }
    });
    
    const deleteBtn = wrapper.find('.task-delete');
    await deleteBtn.trigger('click');
    
    expect(wrapper.emitted('delete')).toBeTruthy();
    expect(wrapper.emitted('delete')[0]).toEqual([1]);
  });
  
  it('applique la classe done si tâche terminée', () => {
    const wrapper = mount(TaskItem, {
      props: {
        task: { ...mockTask, done: true }
      }
    });
    
    expect(wrapper.classes()).toContain('done');
  });
});
```

---

# Exercice 4 : Tester Navigation Guards

### Objectif
Tester les guards de navigation

### Fichier : `__tests__/router/guards.spec.js`

### Tests à écrire

- ✅ Redirige vers /login si non authentifié
- ✅ Redirige vers /tasks si déjà connecté sur /login
- ✅ Bloque /dashboard si non admin
- ✅ Autorise /dashboard si admin
- ✅ Met à jour le titre de la page

---

# Exercice 4 - Solution guards.spec.js (1/2)

```js
// __tests__/router/guards.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';

describe('Navigation Guards', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });
  
  it('redirige vers /login si non authentifié', () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = false;
    
    const to = { 
      name: 'TaskList', 
      meta: { requiresAuth: true },
      fullPath: '/tasks'
    };
    const next = vi.fn();
    
    // Simuler le guard
    const shouldRedirect = to.meta.requiresAuth && !authStore.isAuthenticated;
    
    if (shouldRedirect) {
      next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
    
    expect(next).toHaveBeenCalledWith({
      name: 'Login',
      query: { redirect: '/tasks' }
    });
  });
  
  // Suite dans slide suivante...
});
```

---

# Exercice 4 - Solution guards.spec.js (2/2)

```js
// __tests__/router/guards.spec.js (suite)
describe('Navigation Guards', () => {
  // ... tests précédents
  
  it('bloque /dashboard si non admin', () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    authStore.user = { role: 'user' };
    
    const to = { 
      name: 'Dashboard', 
      meta: { requiresAuth: true, requiresAdmin: true }
    };
    const next = vi.fn();
    
    const isAdmin = authStore.user?.role === 'admin';
    
    if (to.meta.requiresAdmin && !isAdmin) {
      next({ name: 'Home' });
    } else {
      next();
    }
    
    expect(next).toHaveBeenCalledWith({ name: 'Home' });
  });
  
  it('autorise /dashboard si admin', () => {
    const authStore = useAuthStore();
    authStore.isAuthenticated = true;
    authStore.user = { role: 'admin' };
    
    const to = { 
      name: 'Dashboard', 
      meta: { requiresAuth: true, requiresAdmin: true }
    };
    const next = vi.fn();
    
    const isAdmin = authStore.user?.role === 'admin';
    
    if (to.meta.requiresAdmin && !isAdmin) {
      next({ name: 'Home' });
    } else {
      next();
    }
    
    expect(next).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalledWith({ name: 'Home' });
  });
});
```

---

# Exercice 5 : Tester avec Mocks

### Objectif
Tester les appels API avec des mocks

### Fichier : `__tests__/stores/tasks-api.spec.js`

### Tests à écrire

- ✅ `fetchTasks()` charge les tâches depuis l'API
- ✅ `fetchTasks()` gère les erreurs
- ✅ `loading` est true pendant le fetch
- ✅ `error` contient le message d'erreur

---

# Exercice 5 - Solution tasks-api.spec.js (1/2)

**Setup et test de succès :**

```js
// __tests__/stores/tasks-api.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTasksStore } from '@/stores/tasks';

// ✅ Mock de fetch
global.fetch = vi.fn();

describe('Tasks Store - API', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });
  
  it('charge les tâches depuis l\'API', async () => {
    const mockTasks = [
      { id: 1, title: 'Task 1', done: false },
      { id: 2, title: 'Task 2', done: true }
    ];
    
    // ✅ Configurer le mock
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockTasks
    });
    
    const store = useTasksStore();
    await store.fetchTasks();
    
    expect(store.tasks).toEqual(mockTasks);
    expect(store.loading).toBe(false);
    expect(store.error).toBe(null);
  });
});
```

---

# Exercice 5 - Solution tasks-api.spec.js (2/2)

**Tests d'erreur et loading :**

```js
describe('Tasks Store - API', () => {
  // ... beforeEach précédent
  
  it('gère les erreurs API', async () => {
    // ✅ Mock d'une erreur
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    
    const store = useTasksStore();
    await store.fetchTasks();
    
    expect(store.tasks).toEqual([]);
    expect(store.error).toBe('Network error');
    expect(store.loading).toBe(false);
  });
  
  it('met loading à true pendant le fetch', async () => {
    global.fetch.mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({ 
        ok: true, 
        json: async () => [] 
      }), 100))
    );
    
    const store = useTasksStore();
    const promise = store.fetchTasks();
    
    expect(store.loading).toBe(true);
    
    await promise;
    
    expect(store.loading).toBe(false);
  });
});
```

---

# Exercice 6 : Coverage

### Objectif
Générer et analyser le coverage

### Commande

```bash
npm run test:coverage
```

### Résultat attendu

```
---------|---------|----------|---------|---------|
File     | % Stmts | % Branch | % Funcs | % Lines |
---------|---------|----------|---------|---------|
stores/  |   95.12 |    88.23 |   100   |   94.87 |
  tasks  |   96.55 |    90.00 |   100   |   96.42 |
  auth   |   93.75 |    85.71 |   100   |   93.33 |
comps/   |   88.46 |    82.14 |   90.90 |   87.50 |
---------|---------|----------|---------|---------|
All      |   91.23 |    85.19 |   95.45 |   90.89 |
---------|---------|----------|---------|---------|
```

### Actions si coverage < 80%

- Identifier les lignes non testées (rapport HTML)
- Ajouter des tests pour les cas manquants
- Tester les edge cases

---

# 🎯 Récap Module 6 - TaskFlow

### Ce que vous avez construit

✅ **Tests Store** : tasks, categories, auth  
✅ **Tests Composants** : TaskItem, TaskList, TaskForm  
✅ **Tests Guards** : Navigation, permissions  
✅ **Mocks API** : fetch, localStorage  
✅ **Coverage** : > 90% sur toute la base  

### Concepts du Module 6 utilisés

- ✅ **6.1 Configuration** : vite.config.js, happy-dom
- ✅ **6.2 Tests unitaires** : describe, it, expect, beforeEach
- ✅ **6.3 Tests composants** : mount, wrapper, emitted
- ✅ **6.4 Mocks** : vi.fn, vi.mock, global.fetch
- ✅ **6.5 Coverage** : v8 provider, rapports HTML

---

# Ressources complémentaires

### Documentation officielle

- 📚 [Vitest Documentation](https://vitest.dev/)
- 🎯 [Vue Test Utils](https://test-utils.vuejs.org/)
- 🔧 [Testing Pinia](https://pinia.vuejs.org/cookbook/testing.html)

### Concepts avancés

- 🚀 Snapshot testing
- ⚡ E2E tests avec Playwright
- 🎭 Visual regression testing
- 🔌 CI/CD integration

### Exemples

- 💡 [Vitest Examples](https://github.com/vitest-dev/vitest/tree/main/examples)
- 🎨 [Testing Best Practices](https://vitest.dev/guide/best-practices.html)

---

### 🎉 FIN DU FIL ROUGE TASKFLOW !

**Vous avez construit une application complète** :
- ✅ 20+ composants Vue
- ✅ 3 stores Pinia (tasks, categories, auth)
- ✅ 7 routes avec Vue Router
- ✅ 3 directives personnalisées
- ✅ 50+ tests avec Vitest
- ✅ > 90% code coverage
