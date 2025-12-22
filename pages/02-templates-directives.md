---
layout: new-section
routeAlias: 'templates-directives'
---

# Module 2 : Templates et Directives 📝

Maîtrise la syntaxe qui fait la magie de Vue.js !

---

# Qu'est-ce qu'un Template ? 🤔

Le **template** est la partie visuelle de ton composant Vue.

<v-clicks>

- 📝 Du HTML enrichi avec la syntaxe Vue
- 🔗 Connecté automatiquement à tes données
- ⚡ Se met à jour quand les données changent
- 🎯 Compile en JavaScript optimisé

</v-clicks>

---

# L'analogie du Restaurant 🍽️

Imagine un menu de restaurant :

<v-clicks>

- **Le template** = Le menu imprimé
- **Les données** = Les plats disponibles aujourd'hui
- **Les directives** = Les instructions spéciales (végétarien, épicé...)
- **L'interpolation** = Les prix qui changent selon le marché

</v-clicks>

---

# L'analogie du Restaurant - Suite 🍽️

Le menu (template) reste le même, mais les informations (données) peuvent changer chaque jour !

---

# Interpolation : Les Moustaches 🥸

La syntaxe **moustache** permet d'afficher des données :

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Bonjour Vue.js !')
const nombre = ref(42)
</script>
```

---

# Interpolation - Template 🥸

```vue
<template>
  <p>{{ message }}</p>
  <p>Le nombre est : {{ nombre }}</p>
  <p>Calcul : {{ nombre * 2 }}</p>
  <p>Méthode : {{ message.toUpperCase() }}</p>
</template>
```

---

# Interpolation - Résultat 🥸

**Résultat affiché :**
- Bonjour Vue.js !
- Le nombre est : 42
- Calcul : 84
- Méthode : BONJOUR VUE.JS !

---

# Expressions JavaScript 📐

Tu peux utiliser des expressions JavaScript dans les moustaches :

```vue
<template>
  <!-- ✅ Expressions valides -->
  <p>{{ ok ? 'Oui' : 'Non' }}</p>
  <p>{{ items.length }}</p>
  <p>{{ message.split('').reverse().join('') }}</p>
</template>
```

---

# Expressions JavaScript - Limites 📐

```vue
<template>
  <!-- ❌ Ce qui ne marche PAS -->
  <!-- Les déclarations -->
  <p>{{ let x = 1 }}</p>
  
  <!-- Les conditions if/else -->
  <p>{{ if (ok) { return 'yes' } }}</p>
</template>
```

---

# Les Directives Vue 🎯

Les **directives** sont des attributs spéciaux préfixés par `v-`.

<v-clicks>

- `v-bind` → Lier des attributs
- `v-on` → Écouter des événements
- `v-if` / `v-else` → Rendu conditionnel
- `v-for` → Boucles
- `v-model` → Two-way binding
- `v-show` → Afficher/cacher

</v-clicks>

---

# v-bind : Lier des attributs 🔗

`v-bind` lie une valeur JavaScript à un attribut HTML :

```vue
<script setup>
import { ref } from 'vue'

const imageUrl = ref('https://vuejs.org/images/logo.png')
const isDisabled = ref(true)
</script>
```

---

# v-bind - Template 🔗

```vue
<template>
  <!-- Syntaxe complète -->
  <img v-bind:src="imageUrl" />
  
  <!-- Raccourci avec : -->
  <img :src="imageUrl" />
  
  <!-- Autres exemples -->
  <a :href="lien">Cliquez ici</a>
  <button :disabled="isDisabled">Bouton</button>
  <div :class="maClasse">Contenu</div>
</template>
```

---

# v-bind avec des classes dynamiques 🎨

```vue
<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
</script>
```

---

# v-bind classes - Template 🎨

```vue
<template>
  <!-- Objet de classes -->
  <div :class="{ active: isActive, error: hasError }">
    Contenu
  </div>
  
  <!-- Tableau de classes -->
  <div :class="[isActive ? 'active' : '', 'base-class']">
    Contenu
  </div>
</template>
```

---

# v-bind avec des styles dynamiques 💅

```vue
<script setup>
import { ref } from 'vue'

const couleur = ref('red')
const taille = ref(20)
</script>

<template>
  <p :style="{ color: couleur, fontSize: taille + 'px' }">
    Texte stylé dynamiquement !
  </p>
</template>
```

---

# v-on : Écouter des événements 👂

`v-on` permet d'écouter les événements DOM :

```vue
<script setup>
import { ref } from 'vue'

const compteur = ref(0)

function incrementer() {
  compteur.value++
}
</script>
```

---

# v-on - Template 👂

```vue
<template>
  <!-- Syntaxe complète -->
  <button v-on:click="incrementer">+1</button>
  
  <!-- Raccourci avec @ -->
  <button @click="incrementer">+1</button>
  
  <!-- Expression inline -->
  <button @click="compteur++">+1</button>
  
  <p>Compteur : {{ compteur }}</p>
</template>
```

---

# Événements courants 📋

```vue
<template>
  <!-- Click -->
  <button @click="handleClick">Cliquer</button>
  
  <!-- Clavier -->
  <input @keyup="handleKey" />
  <input @keyup.enter="submit" />
  
  <!-- Souris -->
  <div @mouseover="handleHover">Survolez-moi</div>
  
  <!-- Formulaire -->
  <form @submit.prevent="handleSubmit">...</form>
</template>
```

---

# Modificateurs d'événements 🔧

Vue propose des modificateurs pratiques :

```vue
<template>
  <!-- .prevent = event.preventDefault() -->
  <form @submit.prevent="onSubmit">...</form>
  
  <!-- .stop = event.stopPropagation() -->
  <button @click.stop="onClick">...</button>
  
  <!-- .once = déclenché une seule fois -->
  <button @click.once="doOnce">...</button>
</template>
```

---

# Modificateurs de touches ⌨️

```vue
<template>
  <!-- Touche Entrée -->
  <input @keyup.enter="submit" />
  
  <!-- Touche Échap -->
  <input @keyup.esc="cancel" />
  
  <!-- Combinaisons -->
  <input @keyup.ctrl.enter="submitWithCtrl" />
  
  <!-- Touches spéciales -->
  <input @keyup.tab="nextField" />
  <input @keyup.delete="clear" />
</template>
```

---

# v-if : Rendu conditionnel 🔀

`v-if` ajoute ou retire un élément du DOM :

```vue
<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const type = ref('admin')
</script>
```

---

# v-if - Template 🔀

```vue
<template>
  <button @click="isVisible = !isVisible">
    Toggle
  </button>
  
  <p v-if="isVisible">
    Je suis visible ! 👀
  </p>
  <p v-else>
    Je suis caché ! 🙈
  </p>
</template>
```

---

# v-else-if : Conditions multiples 🔀

```vue
<template>
  <div v-if="type === 'admin'">
    👑 Bienvenue Admin !
  </div>
  <div v-else-if="type === 'user'">
    👤 Bienvenue Utilisateur !
  </div>
  <div v-else>
    👋 Bienvenue Visiteur !
  </div>
</template>
```

---

# v-show : Afficher/Cacher 👁️

`v-show` utilise CSS `display: none` :

```vue
<template>
  <p v-show="isVisible">
    Je suis togglé avec display: none
  </p>
</template>
```

---

# v-if vs v-show 🥊

| Critère | v-if | v-show |
|---------|------|--------|
| Mécanisme | Ajoute/retire du DOM | CSS display: none |
| Coût initial | Moins cher si faux | Plus cher (toujours rendu) |
| Coût de toggle | Plus cher (re-render) | Moins cher (juste CSS) |
| Utilisation | Changements rares | Changements fréquents |

---

# v-if vs v-show - Conseils 🥊

**Utilise `v-if` pour :**
- Conditions rarement modifiées
- Contenu lourd à rendre

**Utilise `v-show` pour :**
- Toggles fréquents (onglets, menus)
- Éléments simples

---

# v-for : Les boucles 🔄

`v-for` permet d'itérer sur des tableaux :

```vue
<script setup>
import { ref } from 'vue'

const fruits = ref(['🍎 Pomme', '🍊 Orange', '🍋 Citron'])
</script>
```

---

# v-for - Template 🔄

```vue
<template>
  <ul>
    <li v-for="fruit in fruits" :key="fruit">
      {{ fruit }}
    </li>
  </ul>
</template>
```

---

# v-for avec index 📊

```vue
<template>
  <ul>
    <li v-for="(fruit, index) in fruits" :key="index">
      {{ index + 1 }}. {{ fruit }}
    </li>
  </ul>
</template>
```

---

# v-for avec index - Résultat 📊

**Résultat :**
1. 🍎 Pomme
2. 🍊 Orange
3. 🍋 Citron

---

# L'importance de :key 🔑

**Pourquoi `:key` est obligatoire ?**

<v-clicks>

- 🎯 Vue utilise `:key` pour identifier chaque élément
- ⚡ Permet des mises à jour optimisées
- 🐛 Évite des bugs de rendu bizarres
- ✅ Utilise un ID unique quand possible

</v-clicks>

---

# v-for sur des objets 📦

```vue
<script setup>
import { ref } from 'vue'

const user = ref({
  name: 'John',
  age: 30,
  city: 'Paris'
})
</script>
```

---

# v-for sur des objets - Template 📦

```vue
<template>
  <ul>
    <li v-for="(value, key) in user" :key="key">
      {{ key }}: {{ value }}
    </li>
  </ul>
</template>
```

---

# v-for sur des objets - Résultat 📦

**Résultat :**
- name: John
- age: 30
- city: Paris

---

# v-for avec une range 🔢

```vue
<template>
  <!-- Génère les nombres de 1 à 5 -->
  <span v-for="n in 5" :key="n">
    {{ n }}
  </span>
</template>
```

---

# v-for avec une range - Résultat 🔢

**Résultat :** 1 2 3 4 5

---

# Combiner v-for et v-if ⚠️

**ATTENTION** : Ne mets jamais `v-if` et `v-for` sur le même élément !

```vue
<!-- ❌ MAUVAIS -->
<li v-for="user in users" v-if="user.active" :key="user.id">
  {{ user.name }}
</li>
```

---

# Combiner v-for et v-if - Solution ⚠️

```vue
<!-- ✅ SOLUTION : Utiliser template -->
<template v-for="user in users" :key="user.id">
  <li v-if="user.active">
    {{ user.name }}
  </li>
</template>
```

---

# Combiner v-for et v-if - Alternative ⚠️

```vue
<!-- ✅ MIEUX : Computed property -->
<script setup>
import { ref, computed } from 'vue'

const users = ref([...])

const activeUsers = computed(() => 
  users.value.filter(u => u.active)
)
</script>

<template>
  <li v-for="user in activeUsers" :key="user.id">
    {{ user.name }}
  </li>
</template>
```

---

# Template refs 🎯

Accéder directement à un élément DOM :

```vue
<script setup>
import { ref, onMounted } from 'vue'

const inputRef = ref(null)

onMounted(() => {
  inputRef.value.focus()
})
</script>
```

---

# Template refs - Template 🎯

```vue
<template>
  <input ref="inputRef" type="text" />
</template>
```

---

# v-html : Rendu HTML brut 📄

Injecter du HTML (à utiliser avec précaution) :

```vue
<script setup>
import { ref } from 'vue'

const htmlContent = ref('<strong>Texte en gras</strong>')
</script>

<template>
  <div v-html="htmlContent"></div>
</template>
```

---

# v-html - Avertissement ⚠️

**DANGER** : N'utilise jamais `v-html` avec du contenu utilisateur !

Risque de faille **XSS** (Cross-Site Scripting).

Utilise-le uniquement pour du contenu que tu contrôles.

---

# v-text : Texte brut 📝

Alternative aux moustaches :

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Bonjour !')
</script>

<template>
  <!-- Ces deux lignes sont équivalentes -->
  <p>{{ message }}</p>
  <p v-text="message"></p>
</template>
```

---

# v-pre : Ignorer la compilation 🚫

Affiche les moustaches telles quelles :

```vue
<template>
  <p v-pre>{{ ceci ne sera pas compilé }}</p>
</template>
```

---

# v-pre - Résultat 🚫

**Résultat affiché :** `{{ ceci ne sera pas compile }}`

Utile pour la documentation !

---

# v-once : Rendu unique ⚡

Optimisation : rend une seule fois :

```vue
<template>
  <p v-once>
    Créé le : {{ new Date().toLocaleString() }}
  </p>
</template>
```

---

# v-once - Explication ⚡

Le contenu ne sera plus jamais mis à jour, même si les données changent.

Utile pour du contenu statique dans une app dynamique.

---

# v-cloak : Masquer avant compilation 🎭

Évite le "flash" des moustaches au chargement :

```vue
<template>
  <div v-cloak>
    {{ message }}
  </div>
</template>
```

---

# v-cloak - CSS 🎭

```css
[v-cloak] {
  display: none;
}
```

---

# v-cloak - Explication 🎭

L'attribut `v-cloak` est automatiquement retiré une fois Vue compilé.

Evite que l'utilisateur voie les moustaches pendant le chargement.

---

# Récapitulatif des directives 📋

| Directive | Raccourci | Fonction |
|-----------|-----------|----------|
| v-bind | `:` | Lier un attribut |
| v-on | `@` | Écouter un événement |
| v-if | - | Rendu conditionnel |
| v-show | - | Toggle CSS |
| v-for | - | Boucle |
| v-model | - | Two-way binding |

---

# Résumé du Module 2 📝

<v-clicks>

- ✅ L'**interpolation** (moustaches) affiche des donnees
- ✅ **v-bind** (`:`) lie des attributs dynamiquement
- ✅ **v-on** (`@`) écoute les événements
- ✅ **v-if/v-else** pour le rendu conditionnel
- ✅ **v-for** pour les boucles (n'oublie pas `:key` !)
- ✅ **v-show** pour les toggles fréquents

</v-clicks>

---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises les templates et directives !

