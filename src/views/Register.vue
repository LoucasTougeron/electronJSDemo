<template>
  <div class="uk-container uk-margin-large-top uk-width-1-2@m">
    <h1 class="uk-heading-line uk-text-center"><span>Créer un compte</span></h1>

    <form @submit.prevent="signup" class="uk-form-stacked uk-margin">
      <div class="uk-margin">
        <label class="uk-form-label">Email</label>
        <input v-model="newUser.email" type="email" class="uk-input" required />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Mot de passe</label>
        <input v-model="newUser.password" type="password" class="uk-input" required />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Confirmer mot de passe</label>
        <input v-model="newUser.passwordConfirm" type="password" class="uk-input" required />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Pseudo</label>
        <input v-model="newUser.pseudo" class="uk-input" required />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Ville</label>
        <input v-model="newUser.city" class="uk-input" required />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Code postal</label>
        <input v-model="newUser.cityCode" class="uk-input" required />
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Téléphone</label>
        <input v-model="newUser.phone" class="uk-input" required />
      </div>

      <button type="submit" class="uk-button uk-button-secondary uk-width-1-1">S'inscrire</button>

      <p class="uk-text-success uk-text-center uk-margin-small-top">{{ successMessage }}</p>
    </form>

    <div class="uk-text-center uk-margin-top">
      <router-link to="/">Déjà un compte ? Connectez-vous</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const newUser = ref({
  email: '',
  password: '',
  passwordConfirm: '',
  pseudo: '',
  city: '',
  cityCode: '',
  phone: ''
});

const successMessage = ref('');

async function signup() {
  successMessage.value = '';
  try {
    const res = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser.value)
    });

    const result = await res.json();
    if (result.code === "200") {
      successMessage.value = "Inscription réussie ! Vous pouvez maintenant vous connecter.";
    } else {
      successMessage.value = result.message;
    }
  } catch (e) {
    successMessage.value = "Erreur lors de l'inscription";
  }
}
</script>
