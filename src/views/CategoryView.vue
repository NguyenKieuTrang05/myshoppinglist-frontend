<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const API_URL = 'https://myshoppinglist-backend-vjdp.onrender.com'

const route = useRoute()
const router = useRouter()
const { user } = useAuth0()

const categoryName = route.params.categoryName as string

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

const lists = ref<ShoppingList[]>([])
const showAddListForm = ref(false)

const newList = ref({
  name: '',
  icon: '🛒',
})

async function loadLists() {
  if (!user.value?.sub) return

  const response = await fetch(
    `${API_URL}/shoppinglist/user/${encodeURIComponent(user.value.sub)}`
  )
  const allLists: ShoppingList[] = await response.json()

  const filteredLists = allLists.filter((list) => list.category === categoryName)

  lists.value = await Promise.all(
    filteredLists.map(async (list) => {
      const itemResponse = await fetch(`${API_URL}/shoppinglist/${list.id}/items`)
      const items = await itemResponse.json()

      return {
        ...list,
        itemCount: items.length,
      }
    }),
  )
}

async function saveNewList() {
  if (!newList.value.name.trim()) return

  await fetch(`${API_URL}/shoppinglist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: newList.value.name,
      emoji: newList.value.icon || '🛒',
      category: categoryName,
      owner: {
        id: user.value?.sub,
        email: user.value?.email || null,
        name: user.value?.name || null,
      },
    }),
  })

  newList.value = {
    name: '',
    icon: '🛒',
  }

  showAddListForm.value = false
  await loadLists()
}

function cancelNewList() {
  showAddListForm.value = false
}

function goBack() {
  router.push('/dashboard')
}

function openList(list: ShoppingList) {
  router.push(`/list/${categoryName}/${list.id}`)
}

function createList() {
  showAddListForm.value = true
}

async function toggleFavorite(list: ShoppingList) {
  await fetch(`${API_URL}/shoppinglist/${list.id}/favorite`, {
    method: 'PATCH',
  })

  await loadLists()
}

onMounted(() => {
  loadLists()
})
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
          <p>{{ list.itemCount ?? 0 }} Produkte</p>
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

/* ===== Seitenlayout ===== */

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

/* ===== Navigation ===== */

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

/* ===== Überschriften ===== */

h1 {
  font-size: 42px;
  margin-bottom: 8px;
}

p {
  font-size: 20px;
  margin-bottom: 40px;
}

/* ===== Listenkarten ===== */

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
  cursor: pointer;
  transition: .2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  box-sizing: border-box;
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

.plus {
  font-size: 48px;
  font-weight: bold;
}

.card h3 {
  font-size: 22px;
  margin: 0 0 10px;
  line-height: 1.2;

}
.card p {
  margin: 0;
  font-size: 17px;

}

/* ===== Neue Liste ===== */

.create-card {
  background-color: #8b4513;
  color: white;
}

.create-card:hover {
  background-color: #7a3b1d;
}

/* ===== Formular ===== */

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
  width: 92%;
  display: block;
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

@media (max-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
