---

# QCM - Module 6 : Formulaires et v-model ✅

Testons tes connaissances sur les formulaires !

10 questions - Note tes réponses, les corrections sont à la fin.

---

# Question 1 / 10

### Que fait v-model ?

- A) Lie une classe CSS
- B) Cree une liaison bidirectionnelle
- C) Valide les formulaires
- D) Envoie les donnees au serveur

---

# Question 2 / 10

### Que fait le modificateur `.lazy` ?

- A) Ralentit la mise à jour
- B) Synchronise sur `change` au lieu de `input`
- C) Desactive v-model
- D) Active le debounce

---

# Question 3 / 10

### Que fait le modificateur `.number` ?

- A) Formate le nombre
- B) Convertit la valeur en nombre
- C) Valide que c'est un nombre
- D) Limite les decimales

---

# Question 4 / 10

### Comment lier plusieurs checkboxes à un tableau ?

- A) `v-model:array`
- B) `v-model` avec une ref tableau
- C) `v-model.multiple`
- D) Ce n'est pas possible

---

# Question 5 / 10

### Comment creer v-model sur un composant personnalise en Vue 3.4+ ?

- A) `defineProps({ value })`
- B) `defineModel()`
- C) `useVModel()`
- D) `defineEmit('model')`

---

# Question 6 / 10

### Comment avoir plusieurs v-model sur un composant ?

- A) Ce n'est pas possible
- B) `v-model:propName`
- C) `v-models`
- D) `v-model="[a, b]"`

---

# Question 7 / 10

### Avant Vue 3.4, quelle prop recevait la valeur de v-model ?

- A) `value`
- B) `model`
- C) `modelValue`
- D) `vModel`

---

# Question 8 / 10

### Que fait le modificateur `.trim` ?

- A) Limite le nombre de caracteres
- B) Supprime les espaces au debut et à la fin
- C) Met en minuscules
- D) Supprime tous les espaces

---

# Question 9 / 10

### Quelle bibliotheque est populaire pour la validation de formulaires Vue ?

- A) Formik
- B) React Hook Form
- C) VeeValidate
- D) Yup

---

# Question 10 / 10

### Comment empecher le rechargement de page à la soumission d'un formulaire ?

- A) `@submit.stop`
- B) `@submit.prevent`
- C) `@submit.cancel`
- D) `@submit.noReload`

---

# 📝 Corrections - QCM Module 6

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **B** | v-model = liaison bidirectionnelle (two-way binding) |
| 2 | **B** | .lazy synchronise sur change (quand on quitte le champ) |
| 3 | **B** | .number parse automatiquement en Number |
| 4 | **B** | Une ref tableau, les valeurs cochees s'ajoutent |
| 5 | **B** | defineModel() nouvelle syntaxe Vue 3.4+ |
| 6 | **B** | `v-model:firstName` `v-model:lastName` |
| 7 | **C** | modelValue + emit('update:modelValue') |
| 8 | **B** | .trim supprime espaces debut/fin |
| 9 | **C** | VeeValidate la plus populaire pour Vue |
| 10 | **B** | .prevent = event.preventDefault() |

---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 6 !

Passons aux exercices pratiques ! 🚀
