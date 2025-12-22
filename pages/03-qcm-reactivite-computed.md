---
layout: new-section
---

# QCM - Module 5 : Réactivité et Computed ✅

Testons tes connaissances sur le système de réactivité Vue.js !

---
layout: exercices
---

# Question 1 🤔

### Comment accéder à la valeur d'une ref en JavaScript ?

<v-clicks>

- A) `maRef`
- B) `maRef.value` ✅
- C) `maRef.get()`
- D) `maRef()`

</v-clicks>

---
layout: exercices
---

# Réponse 1 💡

**B) `maRef.value`**

En JavaScript, il faut utiliser `.value` pour accéder ou modifier une ref. Dans le template, Vue déballe automatiquement les refs donc `.value` n'est pas nécessaire.

---
layout: exercices
---

# Question 2 🤔

### Quelle est la différence principale entre ref() et reactive() ?

<v-clicks>

- A) ref() est plus rapide
- B) reactive() accepte tous les types
- C) ref() accepte tous les types, reactive() seulement les objets ✅
- D) Il n'y a pas de différence

</v-clicks>

---
layout: exercices
---

# Réponse 2 💡

**C) ref() accepte tous les types, reactive() seulement les objets**

`ref()` fonctionne avec les primitives (string, number, boolean) ET les objets, tandis que `reactive()` ne fonctionne qu'avec les objets.

---
layout: exercices
---

# Question 3 🤔

### Quel est l'avantage principal des computed par rapport aux méthodes ?

<v-clicks>

- A) Plus facile à écrire
- B) Mise en cache du résultat ✅
- C) Supporte les paramètres
- D) Fonctionne dans le template

</v-clicks>

---
layout: exercices
---

# Réponse 3 💡

**B) Mise en cache du résultat**

Les computed ne recalculent leur valeur que si leurs dépendances changent. Les méthodes sont recalculées à chaque render.

---
layout: exercices
---

# Question 4 🤔

### Que fait watchEffect() par rapport à watch() ?

<v-clicks>

- A) Il est plus performant
- B) Il détecte automatiquement ses dépendances ✅
- C) Il ne s'exécute qu'une fois
- D) Il retourne une valeur

</v-clicks>

---
layout: exercices
---

# Réponse 4 💡

**B) Il détecte automatiquement ses dépendances**

`watchEffect()` analyse automatiquement quelles valeurs réactives sont utilisées dans la fonction et les observe. `watch()` demande de les spécifier explicitement.

---
layout: exercices
---

# Question 5 🤔

### Que se passe-t-il si on réassigne un objet reactive ?

<v-clicks>

- A) Ça fonctionne normalement
- B) On perd la réactivité ✅
- C) Une erreur est levée
- D) Vue recréé un proxy

</v-clicks>

---
layout: exercices
---

# Réponse 5 💡

**B) On perd la réactivité**

```js
let state = reactive({ count: 0 })
state = { count: 1 } // ❌ Perd la réactivité !

// ✅ Correct : modifier les propriétés
state.count = 1
```

---
layout: exercices
---

# Question 6 🤔

### Comment observer plusieurs valeurs avec watch() ?

<v-clicks>

- A) `watch(a, b, callback)`
- B) `watch([a, b], callback)` ✅
- C) `watch(a + b, callback)`
- D) Utiliser deux watch séparés

</v-clicks>

---
layout: exercices
---

# Réponse 6 💡

**B) `watch([a, b], callback)`**

On passe un tableau de sources à observer, et le callback reçoit aussi des tableaux pour les nouvelles et anciennes valeurs.

---
layout: exercices
---

# Question 7 🤔

### Quelle option de watch() permet d'observer les changements profonds ?

<v-clicks>

- A) `immediate: true`
- B) `deep: true` ✅
- C) `nested: true`
- D) `recursive: true`

</v-clicks>

---
layout: exercices
---

# Réponse 7 💡

**B) `deep: true`**

```js
watch(user, callback, { deep: true })
```

Cela permet d'observer les changements dans les propriétés imbriquées de l'objet.

---
layout: exercices
---

# Question 8 🤔

### Comment arrêter un watchEffect ?

<v-clicks>

- A) `watchEffect.stop()`
- B) Appeler la fonction retournée par watchEffect ✅
- C) `unwatch()`
- D) On ne peut pas l'arrêter

</v-clicks>

---
layout: exercices
---

# Réponse 8 💡

**B) Appeler la fonction retournée par watchEffect**

```js
const stop = watchEffect(() => {
  console.log(count.value)
})

// Plus tard...
stop() // Arrête l'observation
```

---
layout: exercices
---

# Question 9 🤔

### À quoi sert toRefs() ?

<v-clicks>

- A) Convertir une ref en reactive
- B) Créer des refs à partir des propriétés d'un reactive ✅
- C) Fusionner plusieurs refs
- D) Valider les types des refs

</v-clicks>

---
layout: exercices
---

# Réponse 9 💡

**B) Créer des refs à partir des propriétés d'un reactive**

```js
const state = reactive({ x: 1, y: 2 })
const { x, y } = toRefs(state)
// x et y sont maintenant des refs qui restent connectées à state
```

---
layout: exercices
---

# Question 10 🤔

### Quand utiliser shallowRef au lieu de ref ?

<v-clicks>

- A) Pour des valeurs primitives
- B) Pour de gros objets où on ne veut pas de réactivité profonde ✅
- C) Pour des valeurs qui ne changent jamais
- D) Pour des computed

</v-clicks>

---
layout: exercices
---

# Réponse 10 💡

**B) Pour de gros objets où on ne veut pas de réactivité profonde**

`shallowRef` n'observe que le changement de `.value` lui-même, pas les propriétés de l'objet. Utile pour les performances avec de grandes structures de données.

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 3 !

Passons aux exercices pratiques ! 🚀

