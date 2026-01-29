---
layout: new-section
routeAlias: 'formulaires-vmodel'
---

<a name="formulaires-vmodel" id="formulaires-vmodel"></a>

# Module 6 : Formulaires et v-model 📋

Maîtrise la liaison bidirectionnelle et les formulaires !

---

# Qu'est-ce que v-model ? 🔄

`v-model` crée une **liaison bidirectionnelle** entre un input et une donnée :


- 📥 La donnée → l'input (affichage)
- 📤 L'input → la donnée (modification)
- ⚡ Tout ça automatiquement !


---

# L'analogie du Miroir 🪞

Imagine un miroir magique :


- Quand TU bouges, le reflet bouge
- Quand le REFLET bouge, toi aussi tu bouges !
- C'est la synchronisation bidirectionnelle


---

# v-model en action 📝

```js
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <input v-model="message" />
  <p>Tu as écrit : {{ message }}</p>
</template>
```

---

# v-model en action - Explication 📝

Tape dans l'input, le texte se met à jour en temps réel !

C'est comme si `v-model` était un raccourci magique.

---

# Comment v-model fonctionne ? 🔧

`v-model` est un raccourci pour :

```js
<!-- Ceci... -->
<input v-model="message" />

<!-- ...est équivalent à ceci -->
<input 
  :value="message" 
  @input="message = $event.target.value" 
/>
```

---

# Modificateurs de v-model 🎛️

Vue propose des modificateurs pratiques :


- `.lazy` - Synchronise sur `change` au lieu de `input`
- `.number` - Convertit automatiquement en nombre
- `.trim` - Supprime les espaces au début/fin


---

# Modificateur .lazy ⏸️

```js
<script setup>
import { ref } from 'vue'

const message = ref('')
</script>

<template>
  <!-- Met à jour seulement quand on quitte le champ -->
  <input v-model.lazy="message" />
</template>
```

---

# Modificateur .number 🔢

```js
<script setup>
import { ref } from 'vue'

const age = ref(18)
</script>

<template>
  <!-- Convertit en nombre automatiquement -->
  <input v-model.number="age" type="number" />
  <p>Type: {{ typeof age }}</p> <!-- "number" -->
</template>
```

---

# Modificateur .trim ✂️

```js
<script setup>
import { ref } from 'vue'

const username = ref('')
</script>

<template>
  <!-- Supprime les espaces au début et à la fin -->
  <input v-model.trim="username" />
</template>
```

---

# Combiner les modificateurs 🔗

```js
<template>
  <!-- Plusieurs modificateurs ensemble -->
  <input v-model.lazy.trim="username" />
  <input v-model.number.lazy="price" />
</template>
```

---

# Textarea 📄

```js
<script setup>
import { ref } from 'vue'

const bio = ref('')
</script>

<template>
  <textarea v-model="bio" rows="4"></textarea>
  <p>{{ bio.length }} caractères</p>
</template>
```

---

# Checkbox unique ☑️

```js
<script setup>
import { ref } from 'vue'

const accepted = ref(false)
</script>

<template>
  <label>
    <input type="checkbox" v-model="accepted" />
    J'accepte les conditions
  </label>
  <p>Accepté : {{ accepted }}</p>
</template>
```

---

# Checkbox multiples 🗂️

```js
<script setup>
import { ref } from 'vue'

const selectedFruits = ref<string[]>([])
</script>

<template>
  <label>
    <input type="checkbox" value="pomme" v-model="selectedFruits" />
    Pomme
  </label>
  <label>
    <input type="checkbox" value="orange" v-model="selectedFruits" />
    Orange
  </label>
  <label>
    <input type="checkbox" value="banane" v-model="selectedFruits" />
    Banane
  </label>
  <p>Sélection : {{ selectedFruits }}</p>
</template>
```

---

# Radio buttons 🔘

```js
<script setup>
import { ref } from 'vue'

const gender = ref('')
</script>

<template>
  <label>
    <input type="radio" value="male" v-model="gender" />
    Homme
  </label>
  <label>
    <input type="radio" value="female" v-model="gender" />
    Femme
  </label>
  <label>
    <input type="radio" value="other" v-model="gender" />
    Autre
  </label>
  <p>Genre : {{ gender }}</p>
</template>
```

---

# Select simple 📋

```js
<script setup>
import { ref } from 'vue'

const country = ref('')

const countries = [
  { value: 'fr', label: 'France' },
  { value: 'be', label: 'Belgique' },
  { value: 'ch', label: 'Suisse' }
]
</script>
```

---

# Select simple - Template 📋

```js
<template>
  <select v-model="country">
    <option value="" disabled>Choisissez un pays</option>
    <option 
      v-for="c in countries" 
      :key="c.value" 
      :value="c.value"
    >
      {{ c.label }}
    </option>
  </select>
  <p>Pays : {{ country }}</p>
</template>
```

---

# Select multiple 📋

```js
<script setup>
import { ref } from 'vue'

const selectedSkills = ref<string[]>([])

const skills = ['Vue.js', 'React', 'Angular', 'Svelte', 'TypeScript']
</script>

<template>
  <select v-model="selectedSkills" multiple>
    <option v-for="skill in skills" :key="skill" :value="skill">
      {{ skill }}
    </option>
  </select>
  <p>Skills : {{ selectedSkills.join(', ') }}</p>
</template>
```

---

# Validation de formulaire 🛡️

Exemple simple de validation :

```js
<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')

const isEmailValid = computed(() => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
)

const isPasswordValid = computed(() => 
  password.value.length >= 8
)

const isFormValid = computed(() => 
  isEmailValid.value && isPasswordValid.value
)
</script>
```

---

# Validation de formulaire - Template 🛡️

```js
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input 
        v-model="email" 
        type="email" 
        placeholder="Email"
      />
      <span v-if="email && !isEmailValid" class="error">
        Email invalide
      </span>
    </div>
    
    <div>
      <input 
        v-model="password" 
        type="password" 
        placeholder="Mot de passe"
      />
      <span v-if="password && !isPasswordValid" class="error">
        8 caractères minimum
      </span>
    </div>
    
    <button :disabled="!isFormValid">Envoyer</button>
  </form>
</template>
```

---

# v-model sur composants 🧩

Tu peux utiliser `v-model` sur tes propres composants !

```js
<!-- Parent -->
<script setup>
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'

const username = ref('')
</script>

<template>
  <CustomInput v-model="username" />
</template>
```

---

# Implémenter v-model (Vue 3.4+) 🆕

La nouvelle syntaxe avec `defineModel` :

```js
<!-- CustomInput.vue -->
<script setup>
const model = defineModel<string>()
</script>

<template>
  <input 
    :value="model" 
    @input="model = $event.target.value"
  />
</template>
```

---

# Implémenter v-model (Vue 3.4+) - Explication 🆕

C'est tout ! `defineModel` gère tout automatiquement.

Plus besoin de props + emit manuels !

---

# Ancienne méthode (avant 3.4) 📜

```js
<!-- CustomInput.vue -->
<script setup>
const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <input 
    :value="modelValue" 
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

---

# Plusieurs v-model 🔢

Un composant peut avoir plusieurs v-model :

```js
<!-- Parent -->
<template>
  <UserForm 
    v-model:firstName="first"
    v-model:lastName="last"
  />
</template>
```

---

# Plusieurs v-model - Enfant 🔢

```js
<!-- UserForm.vue -->
<script setup>
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
</script>

<template>
  <input v-model="firstName" placeholder="Prénom" />
  <input v-model="lastName" placeholder="Nom" />
</template>
```

---

# Modificateurs personnalisés 🎨

Crée tes propres modificateurs :

```js
<!-- Parent -->
<template>
  <CustomInput v-model.capitalize="text" />
</template>
```

---

# Modificateurs personnalisés - Enfant 🎨

```js
<!-- CustomInput.vue -->
<script setup>
const [model, modifiers] = defineModel<string, { capitalize: boolean }>()

function handleInput(e: Event) {
  let value = (e.target as HTMLInputElement).value
  
  if (modifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  
  model.value = value
}
</script>

<template>
  <input :value="model" @input="handleInput" />
</template>
```

---

# Bibliothèques de validation 📚

Pour des formulaires complexes, utilise une bibliothèque :


- **VeeValidate** - Validation déclarative populaire
- **Vuelidate** - Validation basée sur les composables
- **FormKit** - Framework complet de formulaires


---

# Exemple VeeValidate 🛡️

```js
<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
})

const { handleSubmit } = useForm({ validationSchema: schema })

const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passError } = useField('password')

const onSubmit = handleSubmit((values) => {
  console.log(values)
})
</script>
```

---

# Exemple VeeValidate - Template 🛡️

```js
<template>
  <form @submit="onSubmit">
    <div>
      <input v-model="email" type="email" />
      <span class="error">{{ emailError }}</span>
    </div>
    
    <div>
      <input v-model="password" type="password" />
      <span class="error">{{ passError }}</span>
    </div>
    
    <button type="submit">Envoyer</button>
  </form>
</template>
```

---

# Bonnes pratiques formulaires ✅


- 🏷️ Utilise des `<label>` pour l'accessibilité
- ✅ Valide côté client ET côté serveur
- 💾 Utilise `.lazy` pour les validations coûteuses
- 🔢 Utilise `.number` pour les champs numériques
- 🧩 Crée des composants d'input réutilisables


---

# Résumé du Module 6 📝


- ✅ `v-model` crée une **liaison bidirectionnelle**
- ✅ Modificateurs : `.lazy`, `.number`, `.trim`
- ✅ Fonctionne avec tous les types d'inputs
- ✅ `defineModel` simplifie les composants personnalisés
- ✅ Valide avec computed ou des bibliothèques


---
layout: intro
---

# Prêt pour le QCM ? 🎯

Vérifions que tu maîtrises les formulaires Vue.js !

