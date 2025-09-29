<template>
  <div class="uk-section">
    <div class="uk-container">
      <h1 class="uk-heading-line"><span>Liste des articles</span></h1>

      <div v-if="loading" class="uk-text-center uk-margin">Chargement...</div>

      <div v-else>
        <div class="uk-grid uk-child-width-1-2@s uk-child-width-1-3@m" data-uk-grid>
          <div v-for="article in articles" :key="article.id">
            <div class="uk-card uk-card-default uk-card-small">
              <div class="uk-card-media-top">
                <img :src="article.imgPath" alt="" />
              </div>
              <div class="uk-card-body">
                <h4 class="uk-margin-small-bottom uk-text-bold">{{ article.title }}</h4>
                <p class="uk-text-small">{{ article.desc }}</p>
                <router-link :to="`/articles/${article.id}`" class="uk-button uk-button-text">Lire plus</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const articles = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/articles');
    const result = await res.json();
    if (result.code === "200") {
      articles.value = result.data;
    }
  } catch (e) {
    console.error('Erreur de chargement', e);
  } finally {
    loading.value = false;
  }
});
</script>
