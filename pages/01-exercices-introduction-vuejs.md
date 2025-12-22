---
layout: new-section
---

# Exercices Pratiques - Module 1 🎯

Mettons en pratique ce que tu as appris sur Vue.js 3 !

---
layout: exercices
---

# Exercice 1 : Création de projet 🛠️

### Objectif : Créer ton premier projet Vue.js 3

**Instructions :**

1. Ouvre ton terminal
2. Crée un nouveau projet Vue.js 3 avec Vite
3. Active TypeScript, Vue Router et Pinia
4. Lance le serveur de développement

---
layout: exercices
---

# Solution Exercice 1 - Partie 1 ✅

```bash
# Créer le projet
npm create vue@latest mon-premier-projet

# Répondre aux questions :
# ✔ Add TypeScript? … Yes
# ✔ Add JSX Support? … No
# ✔ Add Vue Router? … Yes
# ✔ Add Pinia? … Yes
# ✔ Add Vitest? … Yes
# ✔ Add ESLint? … Yes
# ✔ Add Prettier? … Yes
```

---
layout: exercices
---

# Solution Exercice 1 - Partie 2 ✅

```bash
# Aller dans le dossier
cd mon-premier-projet

# Installer les dépendances
npm install

# Lancer le serveur
npm run dev
```

---
layout: exercices
---

# Exercice 2 : Exploration de la structure 📂

### Objectif : Comprendre la structure du projet

**Instructions :**

1. Ouvre le projet dans VS Code
2. Identifie les fichiers suivants :
   - Le point d'entrée de l'application
   - Le composant racine
   - Le fichier de configuration Vite

---
layout: exercices
---

# Solution Exercice 2 ✅

**Les fichiers importants :**

- 📄 `src/main.ts` → Point d'entrée
- 📄 `src/App.vue` → Composant racine
- 📄 `vite.config.ts` → Configuration Vite
- 📄 `index.html` → Page HTML principale
- 📂 `src/components/` → Composants réutilisables

---
layout: exercices
---

# Exercice 3 : Premier composant 💚

### Objectif : Créer un composant de bienvenue

**Instructions :**

Crée un fichier `src/components/Welcome.vue` qui affiche :
- Un titre de bienvenue avec ton prénom
- Un bouton qui affiche une alerte quand on clique dessus

---
layout: exercices
---

# Solution Exercice 3 - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

const prenom = ref('Votre Prénom')

function afficherMessage() {
  alert(`Bienvenue ${prenom.value} sur Vue.js 3 !`)
}
</script>
```

---
layout: exercices
---

# Solution Exercice 3 - Template ✅

```vue
<template>
  <div class="welcome">
    <h1>Bienvenue {{ prenom }} ! 👋</h1>
    <p>Tu es prêt(e) à apprendre Vue.js 3</p>
    <button @click="afficherMessage">
      Cliquez-moi !
    </button>
  </div>
</template>
```

---
layout: exercices
---

# Solution Exercice 3 - Style ✅

```vue
<style scoped>
.welcome {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 16px;
  color: white;
}

button {
  background: white;
  color: #42b883;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: bold;
}
</style>
```

---
layout: exercices
---

# Exercice 4 : Utiliser le composant 🔗

### Objectif : Importer et utiliser le composant Welcome

**Instructions :**

1. Ouvre `src/App.vue`
2. Importe le composant `Welcome`
3. Utilise-le dans le template

---
layout: exercices
---

# Solution Exercice 4 ✅

```vue
<script setup lang="ts">
import Welcome from './components/Welcome.vue'
</script>

<template>
  <main>
    <Welcome />
  </main>
</template>
```

---
layout: exercices
---

# Solution Exercice 4 - Explication ✅

Avec `<script setup>`, les composants importés sont **automatiquement disponibles** dans le template !

Pas besoin de les déclarer dans un objet `components` comme en Options API.

---
layout: exercices
---

# Exercice 5 : Installer Vue DevTools 🔧

### Objectif : Installer et utiliser Vue DevTools

**Instructions :**

1. Installe l'extension Vue DevTools sur ton navigateur
2. Ouvre ton application Vue.js
3. Ouvre les DevTools (F12)
4. Trouve l'onglet "Vue"
5. Explore l'arbre des composants

---
layout: exercices
---

# Solution Exercice 5 ✅

**Étapes détaillées :**

1. Va sur le Chrome Web Store ou Firefox Add-ons
2. Recherche "Vue.js devtools"
3. Installe l'extension officielle
4. Recharge ta page Vue.js
5. L'onglet "Vue" apparaît dans les DevTools

---
layout: exercices
---

# Exercice Bonus : Carte de profil 🎴

### Objectif : Créer une carte de profil

**Instructions :**

Crée un composant `ProfileCard.vue` avec :
- Une image de profil (utilise une URL)
- Ton nom
- Une courte bio
- Un lien vers ton GitHub

---
layout: exercices
---

# Solution Bonus - Script ✅

```vue
<script setup lang="ts">
import { ref } from 'vue'

const profile = ref({
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150',
  bio: 'Développeur Vue.js passionné',
  github: 'https://github.com/johndoe'
})
</script>
```

---
layout: exercices
---

# Solution Bonus - Template ✅

```vue
<template>
  <div class="profile-card">
    <img 
      :src="profile.avatar" 
      :alt="profile.name" 
      class="avatar"
    />
    <h2>{{ profile.name }}</h2>
    <p>{{ profile.bio }}</p>
    <a :href="profile.github" target="_blank">
      GitHub
    </a>
  </div>
</template>
```

---
layout: exercices
---

# Solution Bonus - Style ✅

```vue
<style scoped>
.profile-card {
  max-width: 300px;
  padding: 2rem;
  border-radius: 16px;
  background: white;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}
</style>
```

---
layout: intro
---

# Bravo ! 🎉

Tu as terminé les exercices du Module 1 !

Tu sais maintenant :
- ✅ Créer un projet Vue.js 3
- ✅ Comprendre la structure
- ✅ Créer des composants
- ✅ Utiliser Vue DevTools

**Prochaine étape : Les Templates et Directives ! 📝**

