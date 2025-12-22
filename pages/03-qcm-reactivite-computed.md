---
layout: new-section
---

# QCM - Module 5 : Réactivité et Computed ✅

Testons tes connaissances sur le systeme de reactivite !

10 questions - Note tes réponses, les corrections sont à la fin.

---
layout: exercices
---

# Question 1 / 10

### Comment acceder à la valeur d'une ref en JavaScript ?

- A) `maRef`
- B) `maRef.value`
- C) `maRef.get()`
- D) `maRef()`

---
layout: exercices
---

# Question 2 / 10

### Quelle est la difference principale entre ref() et reactive() ?

- A) ref() est plus rapide
- B) reactive() accepte tous les types
- C) ref() accepte tous les types, reactive() seulement les objets
- D) Il n'y a pas de difference

---
layout: exercices
---

# Question 3 / 10

### Quel est l'avantage principal des computed par rapport aux methodes ?

- A) Plus facile à ecrire
- B) Mise en cache du resultat
- C) Supporte les parametres
- D) Fonctionne dans le template

---
layout: exercices
---

# Question 4 / 10

### Que fait watchEffect() par rapport à watch() ?

- A) Il est plus performant
- B) Il detecte automatiquement ses dependances
- C) Il ne s'execute qu'une fois
- D) Il retourne une valeur

---
layout: exercices
---

# Question 5 / 10

### Que se passe-t-il si on reassigne un objet reactive ?

- A) Ca fonctionne normalement
- B) On perd la reactivite
- C) Une erreur est levee
- D) Vue recree un proxy

---
layout: exercices
---

# Question 6 / 10

### Comment observer plusieurs valeurs avec watch() ?

- A) `watch(a, b, callback)`
- B) `watch([a, b], callback)`
- C) `watch(a + b, callback)`
- D) Utiliser deux watch separes

---
layout: exercices
---

# Question 7 / 10

### Quelle option de watch() permet d'observer les changements profonds ?

- A) `immediate: true`
- B) `deep: true`
- C) `nested: true`
- D) `recursive: true`

---
layout: exercices
---

# Question 8 / 10

### Comment arreter un watchEffect ?

- A) `watchEffect.stop()`
- B) Appeler la fonction retournee par watchEffect
- C) `unwatch()`
- D) On ne peut pas l'arreter

---
layout: exercices
---

# Question 9 / 10

### À quoi sert toRefs() ?

- A) Convertir une ref en reactive
- B) Creer des refs à partir des proprietes d'un reactive
- C) Fusionner plusieurs refs
- D) Valider les types des refs

---
layout: exercices
---

# Question 10 / 10

### Quand utiliser shallowRef au lieu de ref ?

- A) Pour des valeurs primitives
- B) Pour de gros objets où on ne veut pas de reactivite profonde
- C) Pour des valeurs qui ne changent jamais
- D) Pour des computed

---
layout: exercices
---

# 📝 Corrections - QCM Module 5

| Q | Réponse | Explication |
|---|---------|-------------|
| 1 | **B** | `.value` pour acceder/modifier en JS |
| 2 | **C** | ref() = tous types, reactive() = objets uniquement |
| 3 | **B** | Computed met en cache, recalcule seulement si dependances changent |
| 4 | **B** | watchEffect detecte automatiquement ce qu'il observe |
| 5 | **B** | Reassigner reactive casse la reactivite |
| 6 | **B** | Tableau de sources: `watch([a, b], callback)` |
| 7 | **B** | `deep: true` pour observer les changements profonds |
| 8 | **B** | `const stop = watchEffect(...); stop()` |
| 9 | **B** | toRefs cree des refs depuis les props d'un reactive |
| 10 | **B** | shallowRef pour gros objets sans reactivite profonde |

---
layout: intro
---

# Résultat du QCM 🏆

Tu as terminé le QCM du Module 5 !

Passons aux exercices pratiques ! 🚀
