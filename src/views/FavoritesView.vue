<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { listsByCategory } from '@/data/lists'

const router = useRouter()

const favoriteLists = Object.entries(listsByCategory).flatMap(
  ([category, lists]) =>
    lists
      .filter(list => list.isFavorite)
      .map(list => ({
        ...list,
        category
      }))
)

const openList = (category: string, listName: string) => {
  router.push(`/list/${category}/${listName}`)
}
</script>

<template>
  <div class="favorites-page">
    <Sidebar />

    <main class="content">
      <h1>Favoriten ❤️</h1>
      <p>Hier findest du alle Listen, die du favorisiert hast.</p>

      <div v-if="favoriteLists.length === 0" class="empty-box">
        Noch keine Favoriten ausgewählt.
      </div>

      <div v-else class="card-grid">
        <button
          v-for="list in favoriteLists"
          :key="`${list.category}-${list.name}`"
          class="card"
          @click="openList(list.category, list.name)"
        >
          <span class="favorite-icon">❤️</span>
          <span class="icon">{{ list.icon }}</span>
          <h3>{{ list.name }}</h3>
          <p>{{ list.category }}</p>
          <p>{{ list.products }} Produkte</p>
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.favorites-page {
  display: flex;
  min-height: 100vh;
  background-color: #f5f1ea;
}

.content {
  flex: 1;
  padding: 45px 55px;
  color: #8b4513;
}

h1 {
  font-size: 42px;
  margin-bottom: 8px;
}

p {
  font-size: 20px;
  margin-bottom: 35px;
}

.empty-box {
  padding: 25px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  font-size: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 25px;
}

.card {
  position: relative;
  height: 180px;
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

.favorite-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 24px;
}

.icon {
  font-size: 38px;
}

.card h3 {
  font-size: 22px;
  margin-top: 15px;
  margin-bottom: 8px;
}

.card p {
  font-size: 16px;
  margin: 5px 0;
}
</style>
