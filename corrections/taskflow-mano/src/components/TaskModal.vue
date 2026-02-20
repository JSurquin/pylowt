<script>
export default {
  name: 'TaskModal',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  emits: ['update:modelValue', 'close', 'confirm'],
  methods: {
    close() {
      this.$emit('update:modelValue', false);
      this.$emit('close');
    },
    confirm() {
      this.$emit('confirm');
      this.close();
    },
    handleBackdropClick(e) {
      if (this.closable && e.target === e.currentTarget) {
        this.close();
      }
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="modelValue"
        class="modal-backdrop"
        @click="handleBackdropClick"
      >
        <div 
          :class="['modal-content', `modal-content--${size}`]"
          @click.stop
        >
          <div class="modal-header">
            <slot name="title">
              <h2>Titre</h2>
            </slot>
            <button 
              v-if="closable"
              class="modal-close"
              @click="close"
            >
              ✕
            </button>
          </div>
          
          <div class="modal-body">
            <slot></slot>
          </div>
          
          <div class="modal-footer" v-if="$slots.footer">
            <slot name="footer">
              <button @click="close" class="btn-secondary">Annuler</button>
              <button @click="confirm" class="btn-primary">Confirmer</button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow: auto;
}

.modal-content--small {
  width: 400px;
}

.modal-content--medium {
  width: 600px;
}

.modal-content--large {
  width: 900px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  margin: 0;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #ef4444;
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover {
  background: #35a372;
}

.btn-secondary {
  background: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
