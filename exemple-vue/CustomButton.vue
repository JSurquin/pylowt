<template>
  <button class="custom-button" @click="handleClick">
    <!-- Slot par défaut pour le contenu du bouton -->
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'CustomButton',
  
  methods: {
    handleClick() {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
.custom-button {
  background: #42b983;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease;
}

.custom-button:hover {
  background: #35a372;
}

.custom-button:active {
  transform: scale(0.98);
}
</style>
