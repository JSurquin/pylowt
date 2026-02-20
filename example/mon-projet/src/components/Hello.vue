<script>
export default {
  name: 'Affichage',
  data() {
    return {
        name: "johndoe"
    }
  },
  methods: {
    changeName() {
      this.name = 'jane';
    }
  },
  watch: {
    name: {
      handler(newValue, oldValue) {
      console.log("je suis apellé et je change de valeur, je suis maintenant" + newValue + "et j'étais avant" + oldValue)
    },
    },
  }
}
</script>
<template>
  <div style="border: 2px solid red;">
    <button @click="changeName">Change name</button>
    <h1>Hello {{ name }}</h1>
  </div>
</template>