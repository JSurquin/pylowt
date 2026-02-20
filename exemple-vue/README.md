# Exemple Vue.js - Options API

Cet exemple démontre l'utilisation de Vue.js avec l'Options API, incluant plusieurs concepts clés.

## 📁 Structure des fichiers

```
exemple-vue/
├── App.vue           # Composant principal avec gestion des événements
├── Card.vue          # Composant carte avec slots multiples
├── CustomButton.vue  # Composant bouton réutilisable
├── Counter.vue       # Composant compteur avec $emit
└── README.md         # Cette documentation
```

## 🎯 Concepts démontrés

### 1. **Plusieurs composants**
- `Card.vue` : Composant réutilisable avec slots multiples
- `CustomButton.vue` : Composant bouton simple avec événements
- `Counter.vue` : Composant compteur avec plusieurs événements émis
- `App.vue` : Composant principal qui orchestre tout

### 2. **Options API**
Tous les composants utilisent la syntaxe Options API :
- `data()` : État réactif local
- `props` : Propriétés entrantes du parent
- `computed` : Propriétés calculées dérivées
- `methods` : Méthodes pour la logique
- `watch` : Observateurs de changements
- Hooks de cycle de vie (`mounted`, `beforeUnmount`)

### 3. **Watchers classiques**
Dans `App.vue`, plusieurs types de watchers :
- **Watch simple** sur `counter` : surveille les changements basiques
- **Watch avec options** sur `message` : avec configuration `immediate: false`
- **Watch sur computed** sur `messageLength` : surveille une propriété calculée
- **Watch multiples** sur `counterA` et `counterB` : pour tracer les mises à jour

### 4. **Slots**
Le composant `Card.vue` utilise trois types de slots :
- **Slot nommé `header`** : Pour le contenu personnalisé en haut
- **Slot par défaut** : Pour le contenu principal du corps
- **Slot nommé `footer`** : Pour le contenu en bas (conditionnel avec `v-if`)

### 5. **Événements personnalisés ($emit)**
Le composant `Counter.vue` émet plusieurs événements :
- **`@update`** : Émis à chaque changement de valeur (avec la nouvelle valeur)
- **`@increment`** : Émis spécifiquement lors d'une incrémentation
- **`@decrement`** : Émis spécifiquement lors d'une décrémentation
- **`@reset`** : Émis lors d'un reset (avec un objet `{ oldValue, newValue }`)
- **`@doubled`** : Émis quand la valeur est doublée

Le composant parent `App.vue` écoute ces événements avec des handlers dédiés

## 🚀 Utilisation

Pour utiliser cet exemple dans votre application Vue.js :

```vue
<template>
  <App />
</template>

<script>
import App from './exemple-vue/App.vue'

export default {
  components: {
    App
  }
}
</script>
```

## 💡 Exemples de code

### Émettre un événement (dans un composant enfant)
```js
methods: {
  increment() {
    this.localValue++
    // Émettre un événement simple avec une valeur
    this.$emit('update', this.localValue)
    
    // Émettre un événement avec un objet
    this.$emit('changed', { 
      oldValue: this.oldValue, 
      newValue: this.localValue 
    })
  }
}
```

### Écouter un événement (dans le parent)
```vue
<template>
  <!-- Écouter un événement avec @ -->
  <Counter 
    @update="handleUpdate"
    @reset="handleReset"
  />
</template>

<script>
export default {
  methods: {
    handleUpdate(newValue) {
      console.log('Valeur mise à jour:', newValue)
      this.myData = newValue
    },
    
    handleReset(data) {
      console.log('Reset:', data.oldValue, '→', data.newValue)
    }
  }
}
</script>
```

### Utiliser des slots
```vue
<template>
  <Card title="Mon titre">
    <!-- Slot nommé avec template -->
    <template #header>
      <span class="badge">Premium</span>
    </template>
    
    <!-- Slot par défaut (pas besoin de template) -->
    <p>Contenu principal ici</p>
    
    <!-- Slot nommé footer -->
    <template #footer>
      <small>Pied de page</small>
    </template>
  </Card>
</template>
```

## 📝 Points d'apprentissage

1. **Séparation des responsabilités** : Chaque composant a une responsabilité unique et claire
2. **Réutilisabilité** : Les composants sont conçus pour être réutilisés (Card, Counter, Button)
3. **Communication parent-enfant** :
   - **Props** : Du parent vers l'enfant (données descendantes)
   - **Emit** : De l'enfant vers le parent (événements remontants)
4. **Réactivité** : Les watchers permettent de réagir aux changements de données
5. **Flexibilité** : Les slots permettent d'injecter du contenu personnalisé
6. **Options API** : Tout est organisé par type d'option (data, methods, computed, watch)

## 🔍 Console & Débogage

Ouvrez la console du navigateur pour voir :
- ✅ Les logs des watchers en action
- 📡 Les événements émis par les composants
- 🔢 Les changements de valeurs en temps réel

## 🎓 Pour aller plus loin

- Essayez de créer votre propre composant avec `$emit`
- Ajoutez de nouveaux slots dans le composant Card
- Créez un watcher avec l'option `deep: true` pour surveiller des objets
- Expérimentez avec les modificateurs d'événements (`.once`, `.stop`, etc.)
