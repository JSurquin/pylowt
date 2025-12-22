---
layout: new-section
---

# QCM - Module 2 : Templates et Directives ✅

Testons tes connaissances sur les templates et directives !

10 questions - Note tes réponses, les corrections sont à la fin.

---
layout: exercices
---

# Question 1 / 10

### Quel est le raccourci pour `v-bind:src` ?

- A) `@src`
- B) `:src`
- C) `#src`
- D) `$src`

---
layout: exercices
---

# Question 2 / 10

### Quel est le raccourci pour `v-on:click` ?

- A) `:click`
- B) `#click`
- C) `@click`
- D) `$click`

---
layout: exercices
---

# Question 3 / 10

### Quelle directive utilise CSS `display: none` ?

- A) v-if
- B) v-else
- C) v-show
- D) v-hide

---
layout: exercices
---

# Question 4 / 10

### Pourquoi `:key` est-il important dans `v-for` ?

- A) Pour le style CSS
- B) Pour que Vue identifie chaque element
- C) Pour activer les animations
- D) C'est optionnel

---
layout: exercices
---

# Question 5 / 10

### Que fait le modificateur `.prevent` ?

- A) Empeche le clic
- B) Appelle `event.preventDefault()`
- C) Stoppe la propagation
- D) Desactive l'element

---
layout: exercices
---

# Question 6 / 10

### Quelle syntaxe permet d'afficher une variable ?

- A) `{variable}`
- B) `${variable}`
- C) Moustaches (double accolades)
- D) `[variable]`

---
layout: exercices
---

# Question 7 / 10

### Peut-on utiliser `v-if` et `v-for` sur le meme element ?

- A) Oui, sans probleme
- B) Non, c'est interdit
- C) Non, il faut utiliser `<template>`
- D) Seulement avec v-show

---
layout: exercices
---

# Question 8 / 10

### Que fait `v-once` ?

- A) Execute une fois par seconde
- B) Rend le contenu une seule fois
- C) Cache l'element
- D) Declenche un evenement unique

---
layout: exercices
---

# Question 9 / 10

### Comment acceder à l'index dans un `v-for` ?

- A) `v-for="item of items :index"`
- B) `v-for="(item, index) in items"`
- C) `v-for="item in items" :index="i"`
- D) `v-for="item, index in items"`

---
layout: exercices
---

# Question 10 / 10

### Quel est le danger de `v-html` ?

- A) Performance lente
- B) Faille XSS
- C) Ne fonctionne pas en production
- D) Conflits CSS

---
layout: exercices
---

# 📝 Corrections - QCM Module 2

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **B** | `:src` est le raccourci pour `v-bind:src` |
| 2 | **C** | `@click` est le raccourci pour `v-on:click` |
| 3 | **C** | `v-show` bascule `display: none`, `v-if` ajoute/retire du DOM |
| 4 | **B** | `:key` permet à Vue d'identifier chaque element |
| 5 | **B** | `.prevent` = `event.preventDefault()` |
| 6 | **C** | Les moustaches (double accolades) pour l'interpolation |
| 7 | **C** | Il faut utiliser `<template>` ou une computed |
| 8 | **B** | `v-once` rend une seule fois, pas de mise à jour |
| 9 | **B** | `(item, index)` avec parentheses |
| 10 | **B** | Risque XSS avec du contenu utilisateur |

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 2 !

Passons aux exercices pratiques ! 🚀
