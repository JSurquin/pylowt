<template>
  <div class="card">
    <!-- Slot nommé pour le header -->
    <div class="card-header">
      <slot name="header"></slot>
      <h2>{{ title }}</h2>
    </div>
    
    <!-- Slot par défaut pour le contenu principal -->
    <div class="card-body">
      <slot></slot>
    </div>
    
    <!-- Slot nommé pour le footer (conditionnel) -->
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  
  props: {
    title: {
      type: String,
      default: 'Carte sans titre'
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.5rem;
  position: relative;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.card-body {
  padding: 1.5rem;
}

.card-footer {
  background: #f5f5f5;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #e0e0e0;
}
</style>
