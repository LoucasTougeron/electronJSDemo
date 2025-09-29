<template>
  <div class="uk-container uk-margin-large-top uk-width-1-2@m">
    <h1 class="uk-heading-line uk-text-center"><span>Connexion</span></h1>

    <form @submit.prevent="login" class="uk-form-stacked uk-margin">
      <div class="uk-margin">
        <label class="uk-form-label">Email</label>
        <div class="uk-form-controls">
          <input v-model="email" type="email" class="uk-input" required />
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label">Mot de passe</label>
        <div class="uk-form-controls">
          <input v-model="password" type="password" class="uk-input" required />
        </div>
      </div>

      <button type="submit" class="uk-button uk-button-primary uk-width-1-1">Se connecter</button>

      <p class="uk-text-danger uk-text-center uk-margin-small-top">{{ errorMessage }}</p>
    </form>

    <div class="uk-text-center uk-margin-top">
      <router-link to="/register">Pas de compte ? Inscrivez-vous</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function login() {
  errorMessage.value = '';
  try {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value, password: password.value })
    });

    const result = await res.json();
    if (result.code === "200") {
      localStorage.setItem('token', result.data);
      window.dispatchEvent(new Event('auth-change'));
      await router.push('/articles-list');
    } else {
      errorMessage.value = result.message;
    }
  } catch (e) {
    errorMessage.value = "Erreur de connexion à l'API";
  }
}
</script>
