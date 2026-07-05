<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const API_URL = 'https://myshoppinglist-backend-vjdp.onrender.com'

const router = useRouter()
const { user } = useAuth0()

type ShoppingList = {
  id: number
  emoji: string | null
  name: string
  category: string
  itemCount: number
  favorite: boolean | null
  owner?: {
    id: string
  }
}

const allLists = ref<ShoppingList[]>([])
const searchQuery = ref('')

const filteredLists = computed(() => {
  if (!searchQuery.value.trim()) return allLists.value

  return allLists.value.filter(list =>
    list.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    list.category.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

async function loadAllLists() {
  if (!user.value?.sub) return

  const response = await fetch(`${API_URL}/shoppinglist`)
  const lists: ShoppingList[] = await response.json()

  const ownLists = lists.filter(
    (list) => list.owner?.id === user.value?.sub,
  )

  allLists.value = await Promise.all(
    ownLists.map(async (list) => {
      const itemResponse = await fetch(`${API_URL}/shoppinglist/${list.id}/items`)
      const items = await itemResponse.json()

      return {
        ...list,
        itemCount: items.length,
      }
    }),
  )
}

function openList(list: ShoppingList) {
  router.push(`/list/${list.category}/${list.id}`)
}
async function toggleFavorite(list: ShoppingList) {
  await fetch(`${API_URL}/shoppinglist/${list.id}/favorite`, {
    method: 'PATCH',
  })

  await loadAllLists()
}
onMounted(() => {
  loadAllLists()
})
</script>

<template>
  <div class="all-lists-page">
    <Sidebar />

    <main class="content">
      <h1>Alle Listen</h1>
      <p>Hier findest du alle Listen aus allen Kategorien.</p>

      <input
        v-model="searchQuery"
        class="search-bar"
        placeholder="🔍 Liste oder Kategorie suchen..."
      />

      <div v-if="allLists.length === 0" class="empty-box">
        Du hast noch keine Listen erstellt.
      </div>

      <div v-else class="card-grid">
        <button
          v-for="list in filteredLists"
          :key="list.id"
          class="card"
          @click="openList(list)"
        >
          <span
            class="favorite-btn"
            @click.stop="toggleFavorite(list)"
          >
            {{ list.favorite ? '❤️' : '🤍' }}
          </span>

          <span class="icon">{{ list.emoji || '🛒' }}</span>

          <h3>{{ list.name }}</h3>

          <p class="category">
            {{ list.category }}
          </p>

          <p class="products">
            {{ list.itemCount }} Produkte
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
  height: 205px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  color: #8b4513;
  cursor: pointer;
  transition: 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
  position: relative;
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
  margin-bottom: 14px;
}

.card h3 {
  font-size: 22px;
  margin: 0 0 10px;
  line-height: 1.2;
}

.category {
  font-size: 16px;
  color: #a06b45;
  margin: 0 0 6px;
}

.products {
  font-size: 15px;
  margin: 0;
}
.search-bar {
  width: 360px;
  padding: 12px 16px;
  margin: 0 0 30px;
  border: 1px solid #8b4513;
  border-radius: 10px;
  background: #fffaf3;
  color: #8b4513;
  font-size: 16px;
}

@media (max-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
