---
layout: new-section
---

# QCM - Module 2 : Templates et Directives ✅

Testons tes connaissances sur les templates et directives Vue.js !

---
layout: exercices
---

# Question 1 🤔

### Quel est le raccourci pour `v-bind:src` ?

<v-clicks>

- A) `@src`
- B) `:src` ✅
- C) `#src`
- D) `$src`

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) `:src`**

Le raccourci pour `v-bind` est les deux-points `:`. Donc `v-bind:src="url"` devient `:src="url"`.

---
layout: exercices
---

# Question 2 🤔

### Quel est le raccourci pour `v-on:click` ?

<v-clicks>

- A) `:click`
- B) `#click`
- C) `@click` ✅
- D) `$click`

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**C) `@click`**

Le raccourci pour `v-on` est l'arobase `@`. Donc `v-on:click="handler"` devient `@click="handler"`.

---
layout: exercices
---

# Question 3 🤔

### Quelle directive utilise CSS `display: none` ?

<v-clicks>

- A) v-if
- B) v-else
- C) v-show ✅
- D) v-hide

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**C) v-show**

`v-show` bascule la propriété CSS `display`, tandis que `v-if` ajoute/retire réellement l'élément du DOM.

---
layout: exercices
---

# Question 4 🤔

### Pourquoi `:key` est-il important dans `v-for` ?

<v-clicks>

- A) Pour le style CSS
- B) Pour que Vue identifie chaque élément ✅
- C) Pour activer les animations
- D) C'est optionnel

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) Pour que Vue identifie chaque élément**

`:key` permet à Vue de suivre l'identité de chaque élément lors des mises à jour, évitant des bugs de rendu et optimisant les performances.

---
layout: exercices
---

# Question 5 🤔

### Que fait le modificateur `.prevent` ?

<v-clicks>

- A) Empêche le clic
- B) Appelle `event.preventDefault()` ✅
- C) Stoppe la propagation
- D) Désactive l'élément

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**B) Appelle `event.preventDefault()`**

`.prevent` est un raccourci pour `event.preventDefault()`, souvent utilisé sur les formulaires pour empêcher le rechargement de la page.

---
layout: exercices
---

# Question 6 🤔

### Quelle syntaxe permet d'afficher une variable ?

<v-clicks>

- A) `{variable}`
- B) `${variable}`
- C) `{{ variable }}` ✅
- D) `[variable]`

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**C) `{{ variable }}`**

C'est la syntaxe "moustache" (double accolades) propre à Vue.js pour l'interpolation de texte.

---
layout: exercices
---

# Question 7 🤔

### Peut-on utiliser `v-if` et `v-for` sur le même élément ?

<v-clicks>

- A) Oui, sans problème
- B) Non, c'est interdit
- C) Non, il faut utiliser `<template>` ✅
- D) Seulement avec v-show

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**C) Non, il faut utiliser `<template>`**

Utiliser `v-if` et `v-for` sur le même élément cause des problèmes de priorité. La solution est d'utiliser un `<template>` wrapper ou une computed property.

---
layout: exercices
---

# Question 8 🤔

### Que fait `v-once` ?

<v-clicks>

- A) Exécute une fois par seconde
- B) Rend le contenu une seule fois ✅
- C) Cache l'élément
- D) Déclenche un événement unique

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**B) Rend le contenu une seule fois**

`v-once` optimise le rendu en ne mettant jamais à jour le contenu, même si les données changent. Utile pour du contenu statique.

---
layout: exercices
---

# Question 9 🤔

### Comment accéder à l'index dans un `v-for` ?

<v-clicks>

- A) `v-for="item of items :index"`
- B) `v-for="(item, index) in items"` ✅
- C) `v-for="item in items" :index="i"`
- D) `v-for="item, index in items"`

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**B) `v-for="(item, index) in items"`**

La syntaxe avec parenthèses permet d'accéder à l'index : `(item, index)` où `item` est la valeur et `index` sa position.

---
layout: exercices
---

# Question 10 🤔

### Quel est le danger de `v-html` ?

<v-clicks>

- A) Performance lente
- B) Faille XSS ✅
- C) Ne fonctionne pas en production
- D) Conflits CSS

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**B) Faille XSS**

`v-html` injecte du HTML brut. Si le contenu provient d'un utilisateur, il peut contenir du code malveillant (scripts). Ne l'utilise qu'avec du contenu de confiance !

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 2 !

Passons aux exercices pratiques ! 🚀

