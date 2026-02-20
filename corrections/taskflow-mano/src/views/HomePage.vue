
<script>
export default {
  name: 'HomePage'
}
</script>

<template>
  <div class="home-page">
    <div class="hero">
      <h1>📋 Bienvenue sur TaskFlow</h1>
      <p class="hero-subtitle">
        Gérez vos tâches efficacement avec Vue.js 3
      </p>
      
      <div class="hero-actions">
        <RouterLink to="/tasks" class="btn-primary">
          Voir mes tâches
        </RouterLink>
        <RouterLink to="/login" class="btn-secondary">
          Se connecter
        </RouterLink>
      </div>
    </div>
    
    <div class="features">
      <div class="feature-card">
        <div class="feature-icon">✅</div>
        <h3>Gestion simple</h3>
        <p>Créez, modifiez et supprimez vos tâches facilement</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h3>Priorisez</h3>
        <p>Définissez des priorités pour rester organisé</p>
      </div>
      
      <div class="feature-card">
        <div class="feature-icon">🏷️</div>
        <h3>Catégorisez</h3>
        <p>Organisez vos tâches par catégories</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.hero {
  text-align: center;
  margin-bottom: 4rem;
}

.hero h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #64748b;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover {
  background: #35a372;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}

.btn-secondary {
  background: white;
  color: #42b883;
  border: 2px solid #42b883;
}

.btn-secondary:hover {
  background: #42b883;
  color: white;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.feature-card p {
  color: #64748b;
  line-height: 1.6;
}
</style>
