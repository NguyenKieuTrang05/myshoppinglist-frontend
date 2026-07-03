<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { listsByCategory } from '@/data/lists'

const router = useRouter()

const allLists = Object.entries(listsByCategory).flatMap(
  ([category, lists]) =>
    lists.map(list => ({
      ...list,
      category
    }))
)

const openList = (category: string, listName: string) => {
  router.push(`/list/${category}/${listName}`)
}
</script>

<template>
  <div class="all-lists-page">
    <Sidebar />

    <main class="content">
      <h1>Alle Listen</h1>
      <p>Hier findest du alle Listen aus allen Kategorien.</p>

      <div class="card-grid">
        <button
          v-for="list in allLists"
          :key="`${list.category}-${list.name}`"
          class="card"
          @click="openList(list.category, list.name)"
        >
          <span class="icon">{{ list.icon }}</span>

          <h3>{{ list.name }}</h3>

          <p class="category">
            {{ list.category }}
          </p>

          <p class="products">
            {{ list.products }} Produkte
          </p>
        </button>
      </div>
    </main>
  </div>
</template>

<style scoped>
.all-lists-page {
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

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 25px;
}

.card {
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

.icon {
  font-size: 38px;
}

.card h3 {
  font-size: 22px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.category {
  font-size: 16px;
  color: #a06b45;
  margin-bottom: 6px;
}

.products {
  font-size: 15px;
}

@media (max-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
