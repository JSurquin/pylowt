
<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'App',
  computed: {
    authStore() {
      return useAuthStore();
    }
  },
  mounted() {
    this.authStore.checkAuth();
  }
}
</script>

<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-brand">
        <RouterLink to="/">
          📋 TaskFlow
        </RouterLink>
      </div>
      
      <div class="nav-links">
        <RouterLink to="/">Accueil</RouterLink>
        <RouterLink to="/tasks">Mes Tâches</RouterLink>
        <RouterLink to="/categories">Catégories</RouterLink>
        
        <RouterLink 
          v-if="authStore.canCreateCategories"
          to="/dashboard"
        >
          Dashboard
        </RouterLink>
      </div>
      
      <div class="nav-user">
        <span v-if="authStore.isAuthenticated">
          👤 {{ authStore.userDisplayName }}
        </span>
        <RouterLink v-else to="/login">
          Connexion
        </RouterLink>
      </div>
    </nav>
    
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  gap: 2rem;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-brand a {
  color: #42b883;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  flex: 1;
}

.nav-links a {
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #42b883;
}

.nav-user {
  color: #2c3e50;
}

.nav-user a {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>
