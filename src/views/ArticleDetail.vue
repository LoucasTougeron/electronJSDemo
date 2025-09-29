<template>
  <div class="section-small">
    <div class="container-small">
      <div v-if="loading" class="loading">Chargement de l'article...</div>

      <div v-else-if="article">
        <h1 class="article-title">{{ article.title }}</h1>
        <p class="article-meta">Par <span class="author">{{ article.author }}</span></p>
        <p class="article-desc">{{ article.desc }}</p>

        <div class="image-wrapper">
          <img :src="article.imgPath" alt="" class="article-img" />
        </div>

        <div class="action-buttons">
          <button @click="editArticle" class="btn btn-primary">
            ✏️ Éditer
          </button>
          <button @click="deleteArticle" class="btn btn-danger">
            🗑 Supprimer
          </button>
          <router-link to="/articles-list" class="btn btn-secondary">← Retour</router-link>
        </div>
      </div>

      <div v-else>
        <p class="alert-danger">Article introuvable</p>
      </div>
    </div>

    <!-- MODALE DE MODIFICATION -->
    <div v-if="editing" class="modal-overlay" @click.self="editing = false">
      <div class="modal-dialog">
        <h2 class="modal-title">Éditer l'article</h2>

        <form @submit.prevent="saveArticle">
          <div class="form-group">
            <label>Titre</label>
            <input v-model="editForm.title" required />
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea v-model="editForm.desc" required></textarea>
          </div>

          <div class="form-group">
            <label>Auteur</label>
            <input v-model="editForm.author" required />
          </div>

          <div class="modal-actions">
            <button type="submit" class="btn btn-primary">Enregistrer</button>
            <button type="button" @click="editing = false" class="btn btn-secondary">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const article = ref(null);
const loading = ref(true);

const editing = ref(false);
const editForm = ref({
  title: '',
  desc: '',
  author: '',
  imgPath: ''
});

async function fetchArticle() {
  loading.value = true;
  try {
    const res = await fetch(`http://localhost:3000/articles/${route.params.id}`);
    const result = await res.json();
    if (result.code === "200") {
      article.value = result.data;
    }
  } catch (e) {
    console.error('Erreur de chargement', e);
  } finally {
    loading.value = false;
  }
}

onMounted(fetchArticle);

function editArticle() {
  if (!article.value) return;
  editForm.value = { ...article.value };
  editing.value = true;
}

async function saveArticle() {
  try {
    const res = await fetch('http://localhost:3000/articles/save', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(editForm.value)
    });
    const result = await res.json();
    if (result.code === "200") {
      article.value = { ...result.data };
      editing.value = false;
      alert('Article mis à jour !');
    } else {
      alert(result.message || 'Erreur lors de la mise à jour');
    }
  } catch (e) {
    console.error(e);
    alert('Erreur lors de la mise à jour');
  }
}

async function deleteArticle() {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

  try {
    const res = await fetch(`http://localhost:3000/articles/${article.value.id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    const result = await res.json();
    if (result.code === "200") {
      alert('Article supprimé !');
      router.push('/articles-list');
    } else {
      alert(result.message || 'Erreur lors de la suppression');
    }
  } catch (e) {
    console.error(e);
    alert('Erreur lors de la suppression');
  }
}
</script>

<style scoped>
/* Container et section */
.section-small {
  padding: 3rem 1.5rem;
  background-color: #f9f9fb;
  min-height: 100vh;
}

.container-small {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

/* Typographie moderne */
.article-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 0.5rem;
}
.article-meta {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1.5rem;
}
.article-desc {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}
.author {
  font-weight: 600;
  color: #007BFF;
}

/* Image */
.image-wrapper {
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 2rem;
}
.article-img {
  width: 100%;
  display: block;
  transition: transform 0.3s ease;
}
.article-img:hover {
  transform: scale(1.05);
}

/* Buttons modernes */
.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}
.btn-primary {
  background-color: #007BFF;
  color: white;
}
.btn-primary:hover {
  background-color: #0056d2;
}
.btn-danger {
  background-color: #DC3545;
  color: white;
}
.btn-danger:hover {
  background-color: #a71d2a;
}
.btn-secondary {
  background-color: #6C757D;
  color: white;
}
.btn-secondary:hover {
  background-color: #545b62;
}

/* Alert */
.alert-danger {
  background-color: #ffe5e5;
  color: #b30000;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

/* Modal stylée */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-dialog {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
.modal-title {
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #222;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.6rem 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border 0.2s;
}
.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007BFF;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
</style>
