<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { listsByCategory } from '@/data/lists'

const route = useRoute()
const router = useRouter()

const categoryName = route.params.categoryName as string

const lists = ref(listsByCategory[categoryName] || [])

const saveNewList = () => {
  lists.value.push({
    name: newList.value.name,
    products: 0,
    icon: newList.value.icon || '🛒',
    isFavorite:false
  })

  newList.value = {
    name: '',
    count: 0,
    icon: '🛒'
  }

  showAddListForm.value = false
}

const cancelNewList = () => {
  showAddListForm.value = false
}

const showAddListForm = ref(false)

const newList = ref({
  name: '',
  count: 0,
  icon: '🛒'
})

const goBack = () => {
  router.push('/dashboard')
}

const openList = (listName: string) => {
  router.push(`/list/${categoryName}/${listName}`)
}

const createList = () => {
  showAddListForm.value = true
}
const toggleFavorite = (listName: string) => {
  const list = lists.value.find(l => l.name === listName)

  if (list) {
    list.isFavorite = !list.isFavorite
  }
}
</script>

<template>
  <div class="category-page">
    <Sidebar />

    <main class="content">
      <div class="breadcrumb">
        <button @click="goBack">Alle Listen</button>
        <span>›</span>
        <strong>{{ categoryName }}</strong>
      </div>

      <h1>{{ categoryName }}</h1>
      <p>Hier findest du alle Listen in dieser Kategorie.</p>

      <div class="card-grid">
        <button class="card create-card" @click="createList">
          <span class="plus">+</span>
          <h3>Neue Liste</h3>
          <p>erstellen</p>
        </button>

        <button
          v-for="list in lists"
          :key="list.name"
          class="card"
          @click="openList(list.name)"
        >
          <span
            class="favorite-btn"
            @click.stop="toggleFavorite(list.name)"
          >
            {{ list.isFavorite ? '❤️' : '🤍' }}
        </span>

          <span class="icon">{{ list.icon }}</span>
          <h3>{{ list.name }}</h3>
          <p>{{ list.products }} Produkte</p>
        </button>
      </div>
      <div v-if="showAddListForm" class="add-box">
        <h2>Neue Liste erstellen</h2>

        <input v-model="newList.name" placeholder="Listenname" />
        <input v-model="newList.icon" placeholder="Icon z.B. 🛒" />

        <div class="add-actions">
          <button @click="saveNewList">Erstellen</button>
          <button @click="cancelNewList">Abbrechen</button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.category-page {
  display: flex;
  min-height: 100vh;
  background-color: #f5f1ea;
}

.content {
  flex: 1;
  padding: 45px 55px;
  color: #8b4513;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 35px;
  font-size: 20px;
}

.breadcrumb button {
  border: none;
  background: none;
  color: #8b4513;
  font-size: 20px;
  text-decoration: underline;
  cursor: pointer;
}

h1 {
  font-size: 42px;
  margin-bottom: 8px;
}

p {
  font-size: 20px;
  margin-bottom: 40px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 25px;
}

.card {
  position: relative;
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

.favorite-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
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
  margin: 0;
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
</style>
