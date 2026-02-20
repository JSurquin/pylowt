<script>
export default {
  name: 'Card',
  props: {
    title: String,
    body: String,
    footer: String,
    count: Number
  },
  emits: ['increment'],
  methods: {
    handleIncrement() {
      this.$emit('increment', this.count + 1);
    }
  }
}
</script>

<template>
  <div class="card">
    <p>Count: {{ count }}</p>
    <button @click="handleIncrement">Increment depuis Card</button>
    <div class="card-header">
      <slot name="header">
        <h1>{{ title }}</h1>
      </slot>
    </div>
    <div class="card-body">
      <slot name="body">
        <p>{{ body }}</p>
      </slot>
    </div>
    <div class="card-footer">
      <slot name="footer">
        <p>{{ footer }}</p>
      </slot>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  display: block;
  margin: 10px;
}
</style>