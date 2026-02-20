<script>
import HelloWorld from "./components/HelloWorld.vue";
import Card from "./components/Card.vue";
import { fetchUsers } from "./utils/userFetch";
import Hello from "./components/Hello.vue";

export default {
  components: {
    HelloWorld,
    Card,
    Hello
  },
  data() {
    return {
      compteur: 1,
      search: '',
      searchUsers: '',
      users: [],
      products: [{
        id: 1,
        title: "Test products",
      },
      {
        id: 2,
        title: "Test product 2"
      },
    ],
    }
  },
   watch: {
     searchUsers(newValue, oldValue) {
      if (searchUsers.length > 3) {
        fetchUsers().then(data => {
          this.users = data;
        });
      }
     },
     users: {
      handler(newValue, oldValue) {
        console.log("je suis apellé et je change de valeur, je suis maintenant" + newValue + "et j'étais avant" + oldValue)
      },
      immediate: true,
     }
    },
  //   users: {
  //     handler(newValue, oldValue) {
  //       if (this.users.length === 0) {
  //       fetchUsers().then(data => {
  //         this.users = data;
  //       });
  //       }
  //     },
  //     immediate: true
  //   }
  // },
   mounted() { 
      fetchUsers().then(data => {
        this.users = data;
      });
    },
  methods: {
    increment(){
      this.compteur++
    },
    onIncrementFromCard(newCount) {
      this.compteur = newCount;
    }
  },
  computed: {
    filteredProducts() {
  return this.products.filter(product =>
    product.title.toLowerCase().includes(this.search.toLowerCase())
  )
},
  filteredUsers() {
    console.log("je suis apellé")
    return this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchUsers.toLowerCase())
    )
  }
  }
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <button @click="increment">augmenter</button>
    {{  compteur  }}
  </div>
  <input placeholder="search products" v-model="search"/>
  <br/>
  <Hello></Hello>
  <input placeholder="search users" v-model="searchUsers"/>
  <div v-for="product in filteredProducts" :key="product.id">
  {{product.title}}
</div>
<div v-for="user in filteredUsers" :key="user.id">
  {{user.username}}
</div>

<div v-for="user in filteredUsers" :key="user.id">
  {{user.username}}
</div>


<div v-for="user in filteredUsers" :key="user.id">
  {{user.username}}
</div>

<div v-for="user in filteredUsers" :key="user.id">
  {{user.username}}
</div>

<div v-for="user in filteredUsers" :key="user.id">
  {{user.username}}
</div>

<div v-for="user in filteredUsers" :key="user.id">
  {{user.username}}
</div>


  <HelloWorld msg="Vite + Vue" />
  <Card title="Card Title" body="Card Body" footer="Card Footer" :count="compteur" @increment="onIncrementFromCard">
    <template #header>Hello</template>
    <template #body>Body</template>
    <template #footer>Footer</template>
  </Card>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
