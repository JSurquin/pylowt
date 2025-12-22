---
layout: new-section
---

# QCM - Module 6 : Formulaires et v-model ✅

Testons tes connaissances sur les formulaires !

---
layout: exercices
---

# Question 1 🤔

### Que fait v-model ?

<v-clicks>

- A) Lie une classe CSS
- B) Crée une liaison bidirectionnelle ✅
- C) Valide les formulaires
- D) Envoie les données au serveur

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) Crée une liaison bidirectionnelle**

`v-model` synchronise automatiquement une donnée avec un input : modifier l'un modifie l'autre.

---
layout: exercices
---

# Question 2 🤔

### Que fait le modificateur `.lazy` ?

<v-clicks>

- A) Ralentit la mise à jour
- B) Synchronise sur `change` au lieu de `input` ✅
- C) Désactive v-model
- D) Active le debounce

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**B) Synchronise sur `change` au lieu de `input`**

Avec `.lazy`, la mise à jour se fait quand l'utilisateur quitte le champ, pas à chaque frappe.

---
layout: exercices
---

# Question 3 🤔

### Que fait le modificateur `.number` ?

<v-clicks>

- A) Formate le nombre
- B) Convertit la valeur en nombre ✅
- C) Valide que c'est un nombre
- D) Limite les décimales

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**B) Convertit la valeur en nombre**

Sans `.number`, même un `<input type="number">` retourne une string. `.number` parse automatiquement en Number.

---
layout: exercices
---

# Question 4 🤔

### Comment lier plusieurs checkboxes à un tableau ?

<v-clicks>

- A) `v-model:array`
- B) `v-model` avec une ref tableau ✅
- C) `v-model.multiple`
- D) Ce n'est pas possible

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) `v-model` avec une ref tableau**

```js
const selected = ref([])
```
Les valeurs cochées s'ajoutent automatiquement au tableau.

---
layout: exercices
---

# Question 5 🤔

### Comment créer v-model sur un composant personnalisé en Vue 3.4+ ?

<v-clicks>

- A) `defineProps({ value })`
- B) `defineModel()` ✅
- C) `useVModel()`
- D) `defineEmit('model')`

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**B) `defineModel()`**

```vue
<script setup>
const model = defineModel<string>()
</script>
```
C'est la nouvelle syntaxe simplifiée de Vue 3.4.

---
layout: exercices
---

# Question 6 🤔

### Comment avoir plusieurs v-model sur un composant ?

<v-clicks>

- A) Ce n'est pas possible
- B) `v-model:propName` ✅
- C) `v-models`
- D) `v-model="[a, b]"`

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**B) `v-model:propName`**

```vue
<UserForm 
  v-model:firstName="first"
  v-model:lastName="last"
/>
```

---
layout: exercices
---

# Question 7 🤔

### Avant Vue 3.4, quelle prop recevait la valeur de v-model ?

<v-clicks>

- A) `value`
- B) `model`
- C) `modelValue` ✅
- D) `vModel`

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**C) `modelValue`**

Et l'événement correspondant était `update:modelValue`. C'est toujours le cas en interne.

---
layout: exercices
---

# Question 8 🤔

### Que fait le modificateur `.trim` ?

<v-clicks>

- A) Limite le nombre de caractères
- B) Supprime les espaces au début et à la fin ✅
- C) Met en minuscules
- D) Supprime tous les espaces

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**B) Supprime les espaces au début et à la fin**

Pratique pour les champs comme username ou email où les espaces sont indésirables.

---
layout: exercices
---

# Question 9 🤔

### Quelle bibliothèque est populaire pour la validation de formulaires Vue ?

<v-clicks>

- A) Formik
- B) React Hook Form
- C) VeeValidate ✅
- D) Yup

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**C) VeeValidate**

VeeValidate est la bibliothèque de validation la plus populaire pour Vue.js. Yup est souvent utilisé avec, mais c'est un schéma de validation, pas une lib Vue.

---
layout: exercices
---

# Question 10 🤔

### Comment empêcher le rechargement de page à la soumission d'un formulaire ?

<v-clicks>

- A) `@submit.stop`
- B) `@submit.prevent` ✅
- C) `@submit.cancel`
- D) `@submit.noReload`

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**B) `@submit.prevent`**

C'est un raccourci pour `event.preventDefault()`, qui empêche le comportement par défaut du formulaire.

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 6 !

Passons aux exercices pratiques ! 🚀

