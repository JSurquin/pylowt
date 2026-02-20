<template>
  <div class="app-container">
    <h1>Exemple Vue.js - Options API avec Slots, Watch et Emit</h1>
    
    <!-- ========================================= -->
    <!-- UTILISATION 1 : Card avec tous les slots -->
    <!-- ========================================= -->
    <Card title="Compteur simple">
      <!-- Slot nommé : header -->
      <template #header>
        <span class="badge">Composant 1 - Slots</span>
      </template>
      
      <!-- Slot par défaut : contenu principal -->
      <p>Valeur actuelle : {{ counter }}</p>
      <CustomButton @click="incrementCounter">
        Incrémenter
      </CustomButton>
      
      <!-- Slot nommé : footer -->
      <template #footer>
        <small>Dernière modification : {{ lastModified }}</small>
      </template>
    </Card>

    <!-- ========================================= -->
    <!-- UTILISATION 2 : Composant avec $emit -->
    <!-- ========================================= -->
    <Card title="Compteurs avec événements">
      <template #header>
        <span class="badge">Composant 2 - Emit d'événements</span>
      </template>
      
      <div class="counters-grid">
        <!-- Premier compteur -->
        <Counter 
          title="Compteur A"
          :initial-value="10"
          @update="handleCounterAUpdate"
          @increment="handleIncrement"
          @decrement="handleDecrement"
          @reset="handleReset"
          @doubled="handleDoubled"
        />
        
        <!-- Deuxième compteur -->
        <Counter 
          title="Compteur B"
          :initial-value="0"
          @update="handleCounterBUpdate"
        />
      </div>
      
      <div class="events-log">
        <h4>📡 Derniers événements reçus :</h4>
        <ul v-if="events.length > 0">
          <li v-for="(event, index) in events.slice(-5)" :key="index">
            {{ event }}
          </li>
        </ul>
        <p v-else class="no-events">Aucun événement pour le moment</p>
      </div>
      
      <template #footer>
        <small>Compteur A: {{ counterA }} | Compteur B: {{ counterB }}</small>
      </template>
    </Card>

    <!-- ========================================= -->
    <!-- UTILISATION 3 : Card avec input et slots -->
    <!-- ========================================= -->
    <Card title="Message dynamique">
      <template #header>
        <span class="badge">Composant 3 - Watch</span>
      </template>
      
      <input 
        v-model="message" 
        type="text" 
        placeholder="Tapez un message..."
        class="input-field"
      >
      <p v-if="message">Vous avez tapé : <strong>{{ message }}</strong></p>
      
      <template #footer>
        <small>Nombre de caractères : {{ messageLength }}</small>
      </template>
    </Card>

    <!-- ========================================= -->
    <!-- UTILISATION 4 : Card avec slot par défaut uniquement -->
    <!-- ========================================= -->
    <Card>
      <div class="info-box">
        <h3>📊 Statistiques des Watchers</h3>
        <ul>
          <li>Le compteur simple a été modifié {{ counterChanges }} fois</li>
          <li>Le message a été modifié {{ messageChanges }} fois</li>
          <li>Total d'événements reçus : {{ events.length }}</li>
        </ul>
      </div>
    </Card>
  </div>
</template>

<script>
// Import des composants
import Card from './Card.vue'
import CustomButton from './CustomButton.vue'
import Counter from './Counter.vue'

export default {
  name: 'App',
  
  // Enregistrement des composants
  components: {
    Card,
    CustomButton,
    Counter
  },
  
  // État réactif avec Options API
  data() {
    return {
      counter: 0,
      message: '',
      lastModified: new Date().toLocaleTimeString('fr-FR'),
      counterChanges: 0,
      messageChanges: 0,
      // Nouvelles données pour les compteurs avec emit
      counterA: 10,
      counterB: 0,
      events: []
    }
  },
  
  // Propriétés calculées
  computed: {
    messageLength() {
      return this.message.length
    }
  },
  
  // ========================================
  // WATCHERS CLASSIQUES (Options API)
  // ========================================
  watch: {
    // Watch simple : surveille les changements du counter
    counter(newValue, oldValue) {
      console.log(`🔢 Counter changé : ${oldValue} → ${newValue}`)
      this.lastModified = new Date().toLocaleTimeString('fr-FR')
      this.counterChanges++
    },
    
    // Watch avec options : surveille le message
    message: {
      handler(newValue, oldValue) {
        console.log(`✍️ Message changé : "${oldValue}" → "${newValue}"`)
        this.messageChanges++
      },
      immediate: false // Ne s'exécute pas au montage
    },
    
    // Watch sur une computed property : surveille la longueur
    messageLength(newValue) {
      if (newValue > 50) {
        console.warn('⚠️ Le message est très long!')
      }
      if (newValue === 0) {
        console.log('📝 Message vide')
      }
    },
    
    // Watch sur counterA et counterB
    counterA(newValue) {
      console.log(`📊 CounterA mis à jour : ${newValue}`)
    },
    
    counterB(newValue) {
      console.log(`📊 CounterB mis à jour : ${newValue}`)
    }
  },
  
  // ========================================
  // MÉTHODES pour gérer les événements émis
  // ========================================
  methods: {
    incrementCounter() {
      this.counter++
    },
    
    resetCounter() {
      this.counter = 0
    },
    
    // ======= Handlers pour les événements du Compteur A =======
    
    handleCounterAUpdate(value) {
      this.counterA = value
      this.addEvent(`🔄 Compteur A mis à jour : ${value}`)
    },
    
    handleCounterBUpdate(value) {
      this.counterB = value
      this.addEvent(`🔄 Compteur B mis à jour : ${value}`)
    },
    
    handleIncrement(value) {
      this.addEvent(`➕ Incrémentation détectée → ${value}`)
      console.log('Compteur incrémenté !')
    },
    
    handleDecrement(value) {
      this.addEvent(`➖ Décrémentation détectée → ${value}`)
      console.log('Compteur décrémenté !')
    },
    
    handleReset(data) {
      this.addEvent(`🔄 Reset : ${data.oldValue} → ${data.newValue}`)
      console.log('Compteur réinitialisé !', data)
    },
    
    handleDoubled(value) {
      this.addEvent(`✖️ Valeur doublée → ${value}`)
      console.log('Compteur doublé !', value)
    },
    
    // Méthode utilitaire pour ajouter un événement au log
    addEvent(eventMessage) {
      const timestamp = new Date().toLocaleTimeString('fr-FR')
      this.events.push(`[${timestamp}] ${eventMessage}`)
    }
  },
  
  // Hooks de cycle de vie
  mounted() {
    console.log('✅ Application montée avec Options API')
  },
  
  beforeUnmount() {
    console.log('👋 Application sur le point d\'être démontée')
  }
}
</script>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #42b983;
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
}

/* Styles pour les compteurs */
.counters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

/* Styles pour le log des événements */
.events-log {
  background: #ffffff;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1.5rem;
}

.events-log h4 {
  margin: 0 0 0.75rem 0;
  color: #495057;
  font-size: 1rem;
}

.events-log ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
}

.events-log li {
  padding: 0.5rem;
  margin: 0.25rem 0;
  background: #f8f9fa;
  border-left: 3px solid #42b983;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #212529;
  font-family: 'Courier New', monospace;
}

.no-events {
  color: #6c757d;
  font-style: italic;
  margin: 0;
  text-align: center;
  padding: 1rem;
}

/* Styles pour l'info box */
.info-box {
  background: #f0f9ff;
  padding: 1rem;
  border-radius: 4px;
  border-left: 4px solid #667eea;
}

.info-box h3 {
  margin-top: 0;
  color: #667eea;
}

.info-box ul {
  margin: 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin: 0.5rem 0;
}
</style>
