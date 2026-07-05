<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const API_URL = 'https://myshoppinglist-backend-vjdp.onrender.com'

const router = useRouter()
const { user } = useAuth0()

type ShoppingList = {
  id: number
  emoji: string | null
  name: string
  category: string
  favorite: boolean
  itemCount: number
}

const favoriteLists = ref<ShoppingList[]>([])

async function loadFavorites() {
  if (!user.value?.sub) return

  const response = await fetch(
    `${API_URL}/shoppinglist/user/${encodeURIComponent(user.value.sub)}`
  )

  const lists: ShoppingList[] = await response.json()

  favoriteLists.value = await Promise.all(
    lists
      .filter((list) => list.favorite)
      .map(async (list) => {
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

async function removeFavorite(list: ShoppingList) {
  await fetch(`${API_URL}/shoppinglist/${list.id}/favorite`, {
    method: 'PATCH',
  })

  await loadFavorites()
}

onMounted(() => {
  loadFavorites()
})
</script>

<template>
  <div class="favorites-page">
    <Sidebar />

    <main class="content">
      <h1>Favoriten ❤️</h1>
      <p class="subtitle">Hier findest du alle Listen, die du favorisiert hast.</p>

      <div v-if="favoriteLists.length === 0" class="empty-box">
        Noch keine Favoriten ausgewählt.
      </div>

      <div v-else class="card-grid">
        <button
          v-for="list in favoriteLists"
          :key="list.id"
          class="card"
          @click="openList(list)"
        >
          <span
            class="favorite-icon"
            @click.stop="removeFavorite(list)"
          >
            ❤️
          </span>

          <span class="icon">{{ list.emoji || '🛒' }}</span>
          <h3>{{ list.name }}</h3>
          <p class="category">{{ list.category }}</p>
          <p class="products">{{ list.itemCount }} Produkte</p>
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

  height: 205px;

  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  color: #8b4513;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
  text-align: center;
  box-sizing: border-box;

  cursor: pointer;
  transition: .2s;
}

.card:hover {
  transform: translateY(-5px);
  background-color: #f1e5d8;
}

.icon {
  font-size: 38px;
  margin-bottom: 14px;
}

.favorite-icon {
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 24px;
}

.card h3 {
  font-size: 22px;
  margin: 0 0 10px;
  line-height: 1.2;
}

.card p {
  margin: 0;
  font-size: 16px;
}
</style>
