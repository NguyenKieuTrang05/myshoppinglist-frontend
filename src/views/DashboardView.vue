<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRouter } from 'vue-router'
import { computed, ref, watch } from 'vue'

const API_URL = 'https://myshoppinglist-backend-vjdp.onrender.com'

const { user, isLoading, isAuthenticated } = useAuth0()
const router = useRouter()

type ShoppingList = {
  id: number
  emoji: string | null
  name: string
  category: string
}

const shoppingLists = ref<ShoppingList[]>([])
const showAddCategoryForm = ref(false)

const newCategory = ref({
  name: '',
  icon: '📁',
})

const categories = computed(() => {
  const grouped: Record<string, { name: string; icon: string; count: number }> = {}

  shoppingLists.value.forEach((list) => {
    if (!grouped[list.category]) {
      grouped[list.category] = {
        name: list.category,
        icon: list.emoji || '📁',
        count: 0,
      }
    }

    grouped[list.category]!.count++
  })

  return Object.values(grouped)
})

async function loadShoppingLists() {
  if (!user.value?.sub) return

  const response = await fetch(
    `${API_URL}/shoppinglist/user/${encodeURIComponent(user.value.sub)}`,
  )

  shoppingLists.value = await response.json()
}

async function saveCurrentUser() {
  if (!user.value?.sub) return

  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.value.sub,
      email: user.value.email || null,
      name: user.value.name || null,
    }),
  })
}

const openCategory = (name: string) => {
  router.push(`/category/${name}`)
}

const createCategory = () => {
  showAddCategoryForm.value = true
}

const saveNewCategory = () => {
  if (!newCategory.value.name.trim()) return

  router.push(`/category/${newCategory.value.name}`)

  newCategory.value = {
    name: '',
    icon: '📁',
  }

  showAddCategoryForm.value = false
}

const cancelNewCategory = () => {
  showAddCategoryForm.value = false
}

watch(
  [user, isLoading, isAuthenticated],
  async () => {
    if (isLoading.value) return
    if (!isAuthenticated.value) return
    if (!user.value?.sub) return

    await saveCurrentUser()
    await loadShoppingLists()
  },
  { immediate: true },
)
</script>

<template>
  <div class="dashboard">
    <Sidebar />

    <main class="content">
      <div class="top-section">
        <h1>Hallo {{ user?.name }} 👋</h1>
        <p>Hier findest du deine kategorisierten Einkaufslisten.</p>
      </div>

      <h2>Kategorisierte Listen</h2>

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

/* ===== Seitenlayout ===== */

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

/* ===== Begrüßungsbereich ===== */

.top-section h1 {
  font-size: 38px;
  margin-bottom: 8px;
}

.top-section p {
  font-size: 20px;
  margin-bottom: 45px;
}

/* ===== Überschriften ===== */

h2 {
  font-size: 32px;
  margin-bottom: 30px;
}

/* ===== Kategorien-Karten ===== */

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 25px;
}

.card {
  min-height: 220px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  color: #8b4513;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  transition: 0.2s;
}

.card:hover {
  transform: translateY(-5px);
  background-color: #f1e5d8;
}

.icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.card h3 {
  margin: 0 0 10px;
  font-size: 22px;
  font-weight: 700;
}

.card p {
  margin: 0;
  font-size: 18px;
}

/* ===== Neue Kategorie ===== */

.create-card {
  background: #8b4513;
  color: white;
}

.create-card:hover {
  background: #7a3b1d;
}

.create-card .plus {
  font-size: 48px;
  line-height: 1;
  margin-bottom: 18px;
}

.create-card h3 {
  margin: 0 0 8px;
  font-size: 22px;
  color: white;
}

.create-card p {
  margin: 0;
  font-size: 17px;
  color: white;
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

.add-actions button:hover {
  opacity: 0.9;
}

/* ===== Responsive Design ===== */

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
</style>
