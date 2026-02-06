---
layout: new-section
routeAlias: 'bonus-mixins'
---

<a name="bonus-mixins" id="bonus-mixins"></a>

# MODULE BONUS
## Mixins - Réutiliser la logique (Options API)

---

# Qu'est-ce qu'un Mixin ?

Un **mixin** est un objet qui contient des options de composant réutilisables

### 🎯 Objectif

Partager de la logique commune entre plusieurs composants sans dupliquer le code

### 📦 Ce qu'un mixin peut contenir

- `data()`
- `methods`
- `computed`
- `watch`
- Lifecycle hooks (`mounted`, `created`...)

### ⚠️ Note importante

Les mixins sont spécifiques à l'**Options API**. Avec la Composition API, on utilise les **composables** à la place.

---

# Créer un mixin simple

Fichier `mixins/counterMixin.js`

```javascript
export const counterMixin = {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
    reset() {
      this.count = 0;
    }
  }
};
```

---

# Utiliser un mixin dans un composant

```vue
<script>
import { counterMixin } from './mixins/counterMixin';

export default {
  mixins: [counterMixin],
  mounted() {
    console.log('Compteur initial:', this.count);
  }
}
</script>

<template>
  <div>
    <p>Compteur: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Reset</button>
  </div>
</template>
```

---

### 🎉 Résultat

Le composant a maintenant accès à :
- La propriété `count` du mixin
- Les méthodes `increment`, `decrement`, `reset`

Tout fonctionne comme si ces propriétés étaient définies directement dans le composant !

---

# Exemple pratique : Mixin pour fetch

Fichier `mixins/fetchMixin.js`

```javascript
export const fetchMixin = {
  data() {
    return {
      data: null,
      error: null,
      loading: false
    }
  },
  methods: {
    async fetchData(url) {
      this.loading = true;
      this.data = null;
      this.error = null;
```

---

```javascript      
      try {
        const res = await fetch(url);
        this.data = await res.json();
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    }
  }
};
```

---

# Utilisation du Mixin fetch - Script

```vue
<script>
import { fetchMixin } from './mixins/fetchMixin';

export default {
  mixins: [fetchMixin],
  data() {
    return {
      userId: 1
    }
  },
  computed: {
    userUrl() {
      return `/api/users/${this.userId}`;
    }
  },
```

---

```vue
  methods: {
    nextUser() {
      this.userId++;
      this.fetchData(this.userUrl);
    }
  },
  mounted() {
    this.fetchData(this.userUrl);
  }
}
</script>
```

---

# Utilisation du Mixin fetch - Template

```vue
<template>
  <div>
    <div v-if="loading">Chargement...</div>
    <div v-else-if="error">Erreur: {{ error.message }}</div>
    <div v-else-if="data">
      <h2>{{ data.nom }}</h2>
      <p>{{ data.email }}</p>
    </div>
    
    <button @click="nextUser">Utilisateur suivant</button>
  </div>
</template>
```

---

### 💚 Avantages

- Code réutilisable
- Logique centralisée
- Facilite la maintenance

---

# Ordre de fusion des mixins

Quand un composant utilise un mixin, Vue fusionne les options

### 📋 Règles de fusion

| Type d'option | Comportement |
|---------------|--------------|
| **data()** | Fusion, composant prioritaire en cas de conflit |
| **methods** | Fusion, composant prioritaire en cas de conflit |
| **computed** | Fusion, composant prioritaire en cas de conflit |
| **Lifecycle hooks** | Les deux s'exécutent (mixin en premier) |

---

# Exemple : Fusion des lifecycle hooks

```vue
<script>
// Mixin
export const logMixin = {
  mounted() {
    console.log('Mixin mounted');
  }
};

// Composant
export default {
  mixins: [logMixin],
  mounted() {
    console.log('Composant mounted');
  }
}
</script>
```

---

### 📊 Résultat dans la console

```
Mixin mounted
Composant mounted
```

Les deux hooks s'exécutent, le mixin en premier !

---

# Conflit de noms

Si le mixin et le composant définissent la même propriété data ou méthode, **le composant gagne**

```javascript
// Mixin
export const messageMixin = {
  data() {
    return {
      message: 'Message du mixin'
    }
  }
};

// Composant
export default {
  mixins: [messageMixin],
  data() {
    return {
      message: 'Message du composant'  // Cette valeur sera utilisée
    }
  }
}
```

---

### 🏆 Résultat

`this.message` vaudra `"Message du composant"`

---

# Mixin global

Vous pouvez enregistrer un mixin globalement (disponible pour tous les composants)

```javascript
// main.js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Mixin global
app.mixin({
  mounted() {
    console.log('Composant monté:', this.$options.name);
  }
});

app.mount('#app');
```

---

### ⚠️ Attention

Les mixins globaux affectent **TOUS** les composants de votre application.

À utiliser avec précaution !

---

# Limitations des mixins

### ❌ Problèmes potentiels

**1. Conflits de noms**
- Risque de collision entre mixin et composant
- Difficile à déboguer

**2. Origine floue**
- D'où vient cette propriété ? Du mixin ? Du composant ?
- Lecture du code plus difficile

**3. Pas de paramètres**
- Les mixins ne peuvent pas recevoir de paramètres
- Moins flexible que nécessaire

**4. Dépendances implicites**
- Un mixin peut dépendre de propriétés du composant
- Relation cachée, source de bugs

---

# Mixins vs Composables

| Aspect | Mixins (Options API) | Composables (Composition API) |
|--------|----------------------|-------------------------------|
| **Conflits** | Possibles | Impossibles |
| **Origine** | Floue | Claire et explicite |
| **Paramètres** | Non supportés | Supportés |
| **TypeScript** | Moyen | Excellent |
| **Réutilisabilité** | Bonne | Excellente |

---

### 💡 Recommandation

Si vous utilisez la **Composition API**, préférez les **composables** aux mixins.

Si vous utilisez l'**Options API**, les mixins restent une bonne solution !

---

# Exemple : Mixin avec computed et watch

```javascript
// mixins/formMixin.js
export const formMixin = {
  data() {
    return {
      isDirty: false,
      isSaved: false
    }
  },
  computed: {
    canSave() {
      return this.isDirty && !this.isSaved;
    }
  },
```

---

```javascript
  watch: {
    formData: {
      handler() {
        this.isDirty = true;
        this.isSaved = false;
      },
      deep: true
    }
  },
  methods: {
    markAsSaved() {
      this.isSaved = true;
      this.isDirty = false;
    }
  }
};
```

---

# Utilisation du formMixin

```vue
<script>
import { formMixin } from './mixins/formMixin';

export default {
  mixins: [formMixin],
  data() {
    return {
      formData: {
        nom: '',
        email: ''
      }
    }
  },
```

---

```vue
  methods: {
    async saveForm() {
      // Sauvegarder...
      await fetch('/api/save', {
        method: 'POST',
        body: JSON.stringify(this.formData)
      });
      
      this.markAsSaved(); // Méthode du mixin
    }
  }
}
</script>
```

---

# Bonnes pratiques avec les mixins

### ✅ À faire

**1. Nommage explicite**
```javascript
// ✅ Bon
export const fetchMixin = { ... };
export const formValidationMixin = { ... };

// ❌ Mauvais
export const mixin1 = { ... };
export const utils = { ... };
```

**2. Documentation**
```javascript
/**
 * Mixin pour gérer les états de chargement
 * Ajoute: loading, error, data
 * Méthodes: fetchData(url)
 */
export const fetchMixin = { ... };
```

---

### ✅ À faire (suite)

**3. Un seul rôle par mixin**
```javascript
// ✅ Bon : Un mixin = Une fonctionnalité
export const loadingMixin = { ... };
export const errorHandlingMixin = { ... };

// ❌ Mauvais : Mixin fourre-tout
export const everythingMixin = {
  // loading, error, auth, validation, fetch...
};
```

**4. Éviter les mixins globaux**
```javascript
// ✅ Bon : Import explicite
import { myMixin } from './mixins/myMixin';

// ❌ Mauvais : Mixin global (sauf cas particulier)
app.mixin({ ... });
```

---

# Cas d'usage réels des mixins

### 🔐 1. Gestion d'authentification

```javascript
export const authMixin = {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    currentUser() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
```

---

### 📊 2. Gestion de pagination

```javascript
export const paginationMixin = {
  data() {
    return {
      page: 1,
      perPage: 10,
      total: 0
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    hasNextPage() {
      return this.page < this.totalPages;
    },
    hasPrevPage() {
      return this.page > 1;
    }
  },
```

---

```javascript
  methods: {
    nextPage() {
      if (this.hasNextPage) this.page++;
    },
    prevPage() {
      if (this.hasPrevPage) this.page--;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.page = page;
      }
    }
  }
};
```

---

### 🔔 3. Gestion de notifications

```javascript
export const notificationMixin = {
  methods: {
    showSuccess(message) {
      this.$notify({
        type: 'success',
        message
      });
    },
    showError(message) {
      this.$notify({
        type: 'error',
        message
      });
    },
```

---

```javascript
    showInfo(message) {
      this.$notify({
        type: 'info',
        message
      });
    }
  }
};
```

---

# Exercice : Créer un mixin de validation

### 🎯 Objectif

Créer un mixin `validationMixin.js` qui valide un formulaire

### 📋 Fonctionnalités attendues

- Une propriété `errors` (objet)
- Une méthode `validate(fieldName, value, rules)`
- Une méthode `clearErrors()`
- Une computed `isValid` (true si aucune erreur)

### Règles de validation

- `required` : Champ obligatoire
- `email` : Format email valide
- `minLength(n)` : Longueur minimale

---

# Solution : validationMixin

```javascript
// mixins/validationMixin.js
export const validationMixin = {
  data() {
    return {
      errors: {}
    }
  },
  computed: {
    isValid() {
      return Object.keys(this.errors).length === 0;
    }
  },
```

---

```javascript
  methods: {
    validate(fieldName, value, rules) {
      delete this.errors[fieldName];
      
      for (const rule of rules) {
        if (rule === 'required' && !value) {
          this.errors[fieldName] = 'Ce champ est obligatoire';
          break;
        }
        
        if (rule === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            this.errors[fieldName] = 'Email invalide';
            break;
          }
        }
```

---

```javascript        
        if (typeof rule === 'object' && rule.minLength) {
          if (value.length < rule.minLength) {
            this.errors[fieldName] = 
              `Minimum ${rule.minLength} caractères`;
            break;
          }
        }
      }
      
      this.$forceUpdate(); // Pour forcer la réactivité
    },
    clearErrors() {
      this.errors = {};
    }
  }
};
```

---

# Utilisation du validationMixin

```vue
<script>
import { validationMixin } from './mixins/validationMixin';

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        nom: '',
        email: '',
        password: ''
      }
    }
  },
```

---

```vue
  methods: {
    validateNom() {
      this.validate('nom', this.form.nom, ['required']);
    },
    validateEmail() {
      this.validate('email', this.form.email, ['required', 'email']);
    },
    validatePassword() {
      this.validate('password', this.form.password, [
        'required',
        { minLength: 8 }
      ]);
    },
```

---

```vue
    submitForm() {
      this.clearErrors();
      this.validateNom();
      this.validateEmail();
      this.validatePassword();
      
      if (this.isValid) {
        console.log('Formulaire valide !', this.form);
      }
    }
  }
}
</script>
```

---

# Template de validation

```vue
<template>
  <form @submit.prevent="submitForm">
    <div>
      <label>Nom</label>
      <input 
        v-model="form.nom" 
        @blur="validateNom"
      />
      <span v-if="errors.nom" class="error">
        {{ errors.nom }}
      </span>
    </div>
```

---

```vue
    <div>
      <label>Email</label>
      <input 
        v-model="form.email" 
        @blur="validateEmail"
      />
      <span v-if="errors.email" class="error">
        {{ errors.email }}
      </span>
    </div>
```

---

```vue
    <div>
      <label>Password</label>
      <input 
        type="password"
        v-model="form.password" 
        @blur="validatePassword"
      />
      <span v-if="errors.password" class="error">
        {{ errors.password }}
      </span>
    </div>
    
    <button type="submit" :disabled="!isValid">
      Envoyer
    </button>
  </form>
</template>
```

---

# Récapitulatif

### Ce que vous avez appris

- ✅ Créer et utiliser des mixins
- ✅ Ordre de fusion des options
- ✅ Conflits de noms et priorités
- ✅ Mixins globaux
- ✅ Limitations des mixins
- ✅ Comparaison avec les composables
- ✅ Cas d'usage pratiques

### 💭 Réflexion finale

Les mixins sont un outil puissant pour l'Options API, mais avec la Composition API, les **composables** offrent une meilleure solution.

Si vous démarrez un nouveau projet, considérez l'utilisation de la Composition API et des composables !

---

# 🎉 Félicitations !

Vous maîtrisez maintenant les **mixins** avec Vue.js !

### 🚀 Pour aller plus loin

- Explorez les composables avec la Composition API (module bonus)
- Créez vos propres mixins réutilisables
- Documentez bien vos mixins pour faciliter leur utilisation

**Bon code avec Vue.js ! 💚**
