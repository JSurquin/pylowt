
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue'),
    meta: {
      title: 'TaskFlow - Accueil',
      requiresAuth: false
    }
  },
  {
    path: '/tasks',
    name: 'TaskList',
    component: () => import('../views/TaskListView.vue'),
    meta: {
      title: 'Mes Tâches',
      requiresAuth: true
    }
  },
  {
    path: '/task/:id',
    name: 'TaskDetail',
    component: () => import('../views/TaskDetailView.vue'),
    meta: {
      title: 'Détail de la tâche',
      requiresAuth: true
    },
    props: true
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/CategoriesView.vue'),
    meta: {
      title: 'Catégories',
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Connexion',
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: {
      title: 'Dashboard Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: {
      title: 'Page non trouvée'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  document.title = to.meta.title || 'TaskFlow';
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'Login',
      query: { redirect: to.fullPath }
    });
    return;
  }
  
  if (to.meta.requiresAdmin && !authStore.canCreateCategories) {
    alert('Accès réservé aux administrateurs');
    next({ name: 'Home' });
    return;
  }
  
  if (to.name === 'Login' && authStore.isAuthenticated) {
    next({ name: 'TaskList' });
    return;
  }
  
  next();
});

export default router;
