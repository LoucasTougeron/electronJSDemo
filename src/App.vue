<template>
  <!-- Navigation -->
  <ul uk-tab>
    <!-- Non connecté -->
    <li v-if="!isLoggedIn">
      <router-link to="/">Connexion</router-link>
    </li>

    <!-- Connecté -->
    <li v-if="isLoggedIn">
      <router-link to="/articles-list">Les articles</router-link>
    </li>
    <li v-if="isLoggedIn">
      <a href="#" @click.prevent="logout">Déconnexion</a>
    </li>
  </ul>

  <!-- Vue router -->
  <router-view />
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(!!localStorage.getItem('token'));

// Fonction pour déconnexion
function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  window.location.href = '/';
}

// Écouter l'événement global pour mise à jour du login
onMounted(() => {
  window.addEventListener('auth-change', () => {
    isLoggedIn.value = !!localStorage.getItem('token');
  });
});
</script>
