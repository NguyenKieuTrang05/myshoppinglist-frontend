<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const { user } = useAuth0()
const router = useRouter()

const categories = ref([
  { name: 'Lebensmittel', icon: '🛒', count: 5 },
  { name: 'Bücher', icon: '📚', count: 3 },
  { name: 'Make-up', icon: '💄', count: 4 },
  { name: 'Klamotten', icon: '👕', count: 6 },
  { name: 'Schuhe', icon: '👟', count: 2 },
  { name: 'Drogerie', icon: '🧴', count: 5 },
  { name: 'Haushalt', icon: '🏠', count: 4 },
  { name: 'Geschenke', icon: '🎁', count: 3 },
])

const showAddCategoryForm = ref(false)

const newCategory = ref({
  name: '',
  icon: '📁'
})

const openCategory = (name: string) => {
  router.push(`/category/${name}`)
}

const createCategory = () => {
  showAddCategoryForm.value = true
}

const saveNewCategory = () => {
  categories.value.push({
    name: newCategory.value.name,
    icon: newCategory.value.icon || '📁',
    count: 0
  })

  newCategory.value = {
    name: '',
    icon: '📁'
  }

  showAddCategoryForm.value = false
}

const cancelNewCategory = () => {
  showAddCategoryForm.value = false
}
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="content">
      <div class="top-section">
        <h1>Hallo {{ user?.name || 'Viona' }} 👋</h1>
        <p>Hier findest du deine kategorisierten Einkaufslisten.</p>
      </div>

      <h2>Alle Listen</h2>

      <div class="card-grid">
        <button class="card create-card" @click="createCategory">
          <span class="plus">+</span>
          <h3>Neue Kategorie</h3>
          <p>erstellen</p>
        </button>

        <button
          v-for="category in categories"
          :key="category.name"
          class="card"
          @click="openCategory(category.name)"
        >
          <span class="icon">{{ category.icon }}</span>
          <h3>{{ category.name }}</h3>
          <p>{{ category.count }} Listen</p>
        </button>
      </div>

      <div v-if="showAddCategoryForm" class="add-box">
        <h2>Neue Kategorie erstellen</h2>

        <input v-model="newCategory.name" placeholder="Kategoriename" />
        <input v-model="newCategory.icon" placeholder="Icon z.B. 📚" />

        <div class="add-actions">
          <button @click="saveNewCategory">Erstellen</button>
          <button @click="cancelNewCategory">Abbrechen</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  display: flex;
  min-height: 100vh;
  background-color: #f5f1ea;
}

.content {
  flex: 1;
  padding: 45px 55px;
  color: #8b4513;
}

.top-section h1 {
  font-size: 38px;
  margin-bottom: 8px;
}

.top-section p {
  font-size: 20px;
  margin-bottom: 45px;
}

h2 {
  font-size: 32px;
  margin-bottom: 30px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 25px;
}

.card {
  height: 165px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  color: #8b4513;
  cursor: pointer;
  text-align: center;
  transition: 0.2s;
  padding: 20px;
}

.card:hover {
  transform: translateY(-5px);
  background-color: #f1e5d8;
}

.icon {
  font-size: 38px;
}

.plus {
  font-size: 48px;
  font-weight: bold;
}

.card h3 {
  font-size: 22px;
  margin-top: 15px;
  margin-bottom: 8px;
}

.card p {
  font-size: 17px;
}

.create-card {
  background-color: #8b4513;
  color: white;
}

.create-card:hover {
  background-color: #7a3b1d;
}

@media (max-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 800px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.add-box {
  margin-top: 35px;
  padding: 25px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  max-width: 650px;
}

.add-box h2 {
  margin-bottom: 20px;
  color: #8b4513;
}

.add-box input {
  width: 100%;
  margin-bottom: 14px;
  padding: 13px;
  border: 1px solid #8b4513;
  border-radius: 8px;
  background-color: #f5f1ea;
  color: #8b4513;
  font-size: 16px;
}

.add-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.add-actions button {
  background-color: #8b4513;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 25px;
  cursor: pointer;
}

.add-actions button:hover {
  opacity: 0.9;
}
</style>
