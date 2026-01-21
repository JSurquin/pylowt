---
layout: new-section
---

# QCM Module 2
## Slots et composants génériques

---

# Question 1 - Slots

Qu'est-ce qu'un slot dans Vue.js ?

A. Une variable réactive

B. Un emplacement pour passer du contenu au composant

C. Une méthode du composant

D. Un événement personnalisé

---

# Question 2 - Slot par défaut

Quelle est la syntaxe pour définir un slot par défaut ?

A. `<default-slot></default-slot>`

B. `<slot></slot>`

C. `<template></template>`

D. `<content></content>`

---

# Question 3 - Contenu fallback

Que se passe-t-il si on écrit `<slot>Contenu par défaut</slot>` ?

A. Erreur de compilation

B. "Contenu par défaut" s'affiche toujours

C. "Contenu par défaut" s'affiche si rien n'est fourni

D. Le slot est désactivé

---

# Question 4 - Slots nommés

Comment définit-on un slot nommé "header" ?

A. `<slot header></slot>`

B. `<slot name="header"></slot>`

C. `<slot id="header"></slot>`

D. `<slot:header></slot>`

---

# Question 5 - Utilisation slot nommé

Quelle syntaxe utilise-t-on pour remplir un slot nommé "footer" ?

A. `<footer></footer>`

B. `<slot name="footer"></slot>`

C. `<template #footer></template>`

D. `<div slot="footer"></div>`

---

# Question 6 - Syntaxe v-slot

Quelle est la syntaxe abrégée de `v-slot:header` ?

A. `@header`

B. `:header`

C. `#header`

D. `*header`

---

# Question 7 - Scoped slots

À quoi servent les scoped slots ?

A. Limiter la portée CSS

B. Passer des données de l'enfant au parent

C. Créer des slots privés

D. Améliorer les performances

---

# Question 8 - Scoped slots syntaxe

Comment accède-t-on aux données d'un scoped slot ?

A. `<template #default="data">`

B. `<template #default(data)>`

C. `<template :data="default">`

D. `<slot :data="default">`

---

# Question 9 - Slots multiples

Peut-on avoir plusieurs slots dans un même composant ?

A. Non, un seul slot autorisé

B. Oui, avec des slots nommés

C. Seulement deux slots maximum

D. Seulement avec des scoped slots

---

# Question 10 - Composants génériques

Qu'est-ce qu'un composant générique ?

A. Un composant sans style

B. Un composant réutilisable adaptable à différents contextes

C. Un composant JavaScript pur

D. Un composant sans props

---

# Question 11 - Avantage des slots

Quel est le principal avantage des slots ?

A. Meilleure performance

B. Flexibilité et réutilisabilité

C. Code plus court

D. Pas besoin de props

---

# Question 12 - Slot vs Props

Quand utiliser un slot plutôt qu'une prop ?

A. Pour passer du HTML/composants complexes

B. Pour passer des nombres

C. Pour passer des booléens

D. Jamais, les props sont toujours mieux

---

# Question 13 - Détection de slot

Comment vérifier si un slot est fourni dans script setup ?

A. `if (slot.header)`

B. `if ($slots.header)`

C. `if (useSlots().header)`

D. `if (hasSlot('header'))`

---

# Question 14 - Slots dynamiques

Quelle syntaxe pour un slot dynamique ?

A. `<template #[nomSlot]>`

B. `<template :slot="nomSlot">`

C. `<template v-slot="nomSlot">`

D. `<template dynamic="nomSlot">`

---

# Question 15 - Props et Slots

Peut-on combiner props et slots dans un composant ?

A. Non, c'est l'un ou l'autre

B. Oui, ils sont complémentaires

C. Seulement avec TypeScript

D. Seulement dans Options API

---

# Question 16 - Renderless component

Qu'est-ce qu'un renderless component ?

A. Un composant invisible

B. Un composant qui fournit de la logique sans UI

C. Un composant sans template

D. Un composant désactivé

---

# Question 17 - Slot par défaut

Si on a un slot nommé ET un slot par défaut, où va le contenu sans template ?

A. Dans le premier slot

B. Dans le slot par défaut

C. Erreur

D. Il est ignoré

---

# Question 18 - Scoped slot - données multiples

Comment passer plusieurs données dans un scoped slot ?

A. `<slot :data1="val1" :data2="val2">`

B. `<slot data="val1, val2">`

C. Impossible

D. `<slot :values="[val1, val2]">`

---

# Question 19 - Use case Modal

Pour un composant Modal, que devrait-on utiliser ?

A. Seulement des props

B. Seulement des slots

C. Props pour config + slots pour contenu

D. Ni props ni slots

---

# Question 20 - Bonnes pratiques

Combien de slots nommés maximum recommande-t-on ?

A. 2

B. 5

C. 10

D. Pas de limite

---

# Réponses - QCM Module 2

<div class="grid grid-cols-2 gap-4">

<div>

**Question 1:** B - Un emplacement pour passer du contenu au composant

**Question 2:** B - `<slot></slot>`

**Question 3:** C - "Contenu par défaut" s'affiche si rien n'est fourni

**Question 4:** B - `<slot name="header"></slot>`

**Question 5:** C - `<template #footer></template>`

**Question 6:** C - `#header`

**Question 7:** B - Passer des données de l'enfant au parent

**Question 8:** A - `<template #default="data">`

**Question 9:** B - Oui, avec des slots nommés

**Question 10:** B - Un composant réutilisable adaptable à différents contextes

</div>

<div>

**Question 11:** B - Flexibilité et réutilisabilité

**Question 12:** A - Pour passer du HTML/composants complexes

**Question 13:** C - `if (useSlots().header)`

**Question 14:** A - `<template #[nomSlot]>`

**Question 15:** B - Oui, ils sont complémentaires

**Question 16:** B - Un composant qui fournit de la logique sans UI

**Question 17:** B - Dans le slot par défaut

**Question 18:** A - `<slot :data1="val1" :data2="val2">`

**Question 19:** C - Props pour config + slots pour contenu

**Question 20:** B - 5

</div>

</div>
