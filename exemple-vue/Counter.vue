<template>
  <div class="counter-component">
    <h3>{{ title }}</h3>
    <div class="counter-display">
      <button @click="decrement" class="btn-decrement">-</button>
      <span class="value">{{ localValue }}</span>
      <button @click="increment" class="btn-increment">+</button>
    </div>
    <div class="actions">
      <button @click="reset" class="btn-reset">Reset</button>
      <button @click="double" class="btn-action">Doubler</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  
  props: {
    title: {
      type: String,
      default: 'Compteur'
    },
    initialValue: {
      type: Number,
      default: 0
    }
  },
  
  data() {
    return {
      localValue: this.initialValue
    }
  },
  
  methods: {
    increment() {
      this.localValue++
      // Émet un événement avec la nouvelle valeur
      this.$emit('update', this.localValue)
      this.$emit('increment', this.localValue)
    },
    
    decrement() {
      this.localValue--
      // Émet un événement avec la nouvelle valeur
      this.$emit('update', this.localValue)
      this.$emit('decrement', this.localValue)
    },
    
    reset() {
      const oldValue = this.localValue
      this.localValue = this.initialValue
      // Émet un événement avec l'ancienne et la nouvelle valeur
      this.$emit('reset', { oldValue, newValue: this.localValue })
      this.$emit('update', this.localValue)
    },
    
    double() {
      this.localValue = this.localValue * 2
      // Émet un événement personnalisé
      this.$emit('doubled', this.localValue)
      this.$emit('update', this.localValue)
    }
  },
  
  watch: {
    // Watch sur la prop pour mettre à jour la valeur locale
    initialValue(newValue) {
      this.localValue = newValue
    }
  }
}
</script>

<style scoped>
.counter-component {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid #e9ecef;
}

.counter-component h3 {
  margin: 0 0 1rem 0;
  color: #495057;
  font-size: 1rem;
}

.counter-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.value {
  font-size: 2rem;
  font-weight: bold;
  color: #212529;
  min-width: 60px;
  text-align: center;
}

.btn-decrement,
.btn-increment {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-decrement {
  background: #dc3545;
  color: white;
}

.btn-decrement:hover {
  background: #c82333;
}

.btn-increment {
  background: #28a745;
  color: white;
}

.btn-increment:hover {
  background: #218838;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.btn-reset,
.btn-action {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn-reset {
  background: #6c757d;
  color: white;
}

.btn-reset:hover {
  background: #5a6268;
}

.btn-action {
  background: #007bff;
  color: white;
}

.btn-action:hover {
  background: #0056b3;
}
</style>
