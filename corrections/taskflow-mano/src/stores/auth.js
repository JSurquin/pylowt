
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),
  
  getters: {
    userDisplayName(state) {
      if (!state.user) return 'Invité';
      return `${state.user.firstName} ${state.user.lastName}`;
    },
    
    canDeleteTasks(state) {
      return state.user?.role === 'admin' || state.user?.role === 'editor';
    },
    
    canCreateCategories(state) {
      return state.user?.role === 'admin';
    }
  },
  
  actions: {
    async login(email, password) {
      try {
        // Simulation d'appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Mock pour l'exemple
        const mockUser = {
          id: 1,
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: email === 'admin@taskflow.com' ? 'admin' : 'user'
        };
        
        this.user = mockUser;
        this.token = 'fake-jwt-token-' + Date.now();
        this.isAuthenticated = true;
        
        // Sauvegarder dans localStorage
        localStorage.setItem('taskflow-token', this.token);
        localStorage.setItem('taskflow-user', JSON.stringify(this.user));
        
      } catch (err) {
        this.error = err.message;
        throw err;
      }
    },
    
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      localStorage.removeItem('taskflow-token');
      localStorage.removeItem('taskflow-user');
    },
    
    checkAuth() {
      const token = localStorage.getItem('taskflow-token');
      const user = localStorage.getItem('taskflow-user');
      
      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
        this.isAuthenticated = true;
      }
    }
  }
});
