<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Item from './Item.vue'

const search = ref('')
const sortByPriority = ref(false)

const priorityOrder: Record<string, number> = {
  'Hoch': 1,
  'Mittel': 2,
  'Niedrig': 3
}

const items = ref<any[]>([])

onMounted(() => {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL
  const endpoint = baseUrl + '/item'

  const requestOptions = {
    method: 'GET',
    redirect: 'follow' as RequestRedirect
  }

  fetch(endpoint, requestOptions)
    .then(response => response.json())
    .then(result => {
      items.value = result
    })
    .catch(error => console.log('error', error))
})

const filteredItems = computed(() => {
  let result = items.value.filter(item =>
    item.name.toLowerCase().includes(search.value.toLowerCase()) ||
    item.category.toLowerCase().includes(search.value.toLowerCase())
  )

  if (sortByPriority.value) {
    result = [...result].sort(
      (a, b) =>
        (priorityOrder[a.priority] ?? 99) -
        (priorityOrder[b.priority] ?? 99)
    )
  }

  return result
})
</script>

<template>
  <main class="list-page">
    <h1>🛒 Einkaufsliste</h1>

    <div class="toolbar">
      <input v-model="search" placeholder="🔍 Suchen..." class="search" />
      <button @click="sortByPriority = !sortByPriority" :class="{ active: sortByPriority }">
        ⬆️ Nach Priorität sortieren
      </button>
    </div>

    <div class="table-header">
      <span>🛒 Name</span>
      <span>🏷️ Kategorie</span>
      <span>🔢 Menge</span>
      <span>🏪 Anbieter</span>
      <span>🔗 Link</span>
      <span>💶 Preis</span>
      <span>⬆️ Priorität</span>
      <span>✅ Status</span>
    </div>

    <div class="table">
      <Item v-for="item in filteredItems" :key="item.id" :item="item" />
    </div>
  </main>
</template>

<style>
.list-page {
  width: 100vw;
  min-height: 100vh;
  padding: 48px 64px;
  background: #f3f4f6;
  color: black;
}

h1 {
  font-size: 42px;
  font-weight: 650;
  margin-bottom: 24px;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  align-items: center;
}

.search {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 14px;
  width: 280px;
  background: white;
  color: black;
}

.toolbar button {
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: white;
  color: black;
  font-size: 14px;
  cursor: pointer;
}

.toolbar button.active {
  background: black;
  color: white;
  border-color: black;
}

.table { width: 100%; }

.table-header {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 2fr 2fr 1fr 1fr 1fr;
  gap: 24px;
  padding: 16px 20px;
  font-size: 14px;
  font-weight: bold;
  color: #6b7280;
  border-bottom: 2px solid #d1d5db;
}
</style>
