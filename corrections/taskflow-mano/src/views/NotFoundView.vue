
<script>
export default {
  name: 'NotFoundView',
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page non trouvée</h2>
    <p>La page que vous recherchez n'existe pas.</p>
    
    <div class="url-info">
      URL demandée : <code>{{ $route.fullPath }}</code>
    </div>
    
    <button @click="goHome" class="btn-primary">
      Retour à l'accueil
    </button>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 8rem;
  font-weight: bold;
  color: #ef4444;
  margin: 0;
}

.not-found h2 {
  font-size: 2rem;
  color: #64748b;
  margin: 1rem 0;
}

.url-info {
  margin: 2rem 0;
  color: #64748b;
  font-size: 0.875rem;
}

code {
  background: #f1f5f9;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-family: monospace;
}

.btn-primary {
  padding: 1rem 2rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #35a372;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}
</style>
