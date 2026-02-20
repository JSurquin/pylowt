
<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null,
      loading: false
    };
  },
  computed: {
    authStore() {
      return useAuthStore();
    }
  },
  methods: {
    async handleLogin() {
      this.error = null;
      this.loading = true;
      
      try {
        await this.authStore.login(this.form.email, this.form.password);
        
        const redirect = this.$route.query.redirect || '/tasks';
        this.$router.push(redirect);
        
      } catch (err) {
        this.error = 'Email ou mot de passe incorrect';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-card">
      <h1>📋 TaskFlow</h1>
      <h2>Connexion</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input 
            v-model="form.email"
            type="email"
            required
            placeholder="admin@taskflow.com"
          />
        </div>
        
        <div class="form-group">
          <label>Mot de passe</label>
          <input 
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="error" class="error">
          {{ error }}
        </div>
        
        <button 
          type="submit"
          :disabled="loading"
          class="btn-primary"
        >
          {{ loading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>
      
      <p class="demo-info">
        💡 Utilisez <code>admin@taskflow.com</code> pour tester les permissions admin
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 4rem);
  padding: 2rem;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 450px;
}

.login-card h1 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #42b883;
}

.login-card h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #42b883;
}

.error {
  background: #fee2e2;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
}

.btn-primary {
  width: 100%;
  padding: 0.875rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background: #35a372;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}

.btn-primary:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.demo-info {
  margin-top: 1.5rem;
  text-align: center;
  color: #6b7280;
  font-size: 0.875rem;
}

code {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
  color: #42b883;
}
</style>
