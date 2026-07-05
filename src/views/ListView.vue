<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

const API_URL = 'https://myshoppinglist-backend-vjdp.onrender.com'

const route = useRoute()
const router = useRouter()

const categoryName = route.params.categoryName as string
const listId = Number(route.params.listName)

type ShoppingList = {
  id: number
  name: string
  category: string
  emoji: string | null
}

type Product = {
  id?: number
  name: string
  category: string
  amount: string
  price: number
  priority: string
  status: string
  purchased: boolean
  url: string
}

const shoppingList = ref<ShoppingList | null>(null)
const products = ref<Product[]>([])
const activeFilter = ref('Alle Artikel')

const showAddForm = ref(false)
const editingIndex = ref<number | null>(null)
const searchQuery = ref('')
const showRenameForm = ref(false)
const newListName = ref('')

const emptyProduct = (): Product => ({
  name: '',
  category: '',
  amount: '',
  price: 0,
  priority: 'Mittel',
  status: 'Offen',
  purchased: false,
  url: '',
})

const newProduct = ref<Product>(emptyProduct())
const editProduct = ref<Product>(emptyProduct())

async function loadList() {
  const response = await fetch(`${API_URL}/shoppinglist/${listId}`)
  shoppingList.value = await response.json()
}

async function loadProducts() {
  const response = await fetch(`${API_URL}/shoppinglist/${listId}/items`)
  products.value = await response.json()
}

function goBack() {
  router.push(`/category/${categoryName}`)
}

function addProduct() {
  showAddForm.value = true
}

async function saveNewProduct() {
  if (!newProduct.value.name.trim()) return

  try {
    const response = await fetch(`${API_URL}/item`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newProduct.value,
        price: Number(newProduct.value.price) || 0,
        shoppingList: {
          id: listId,
        },
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Backend lehnte Produkt ab:', response.status, errorText)
      alert(`Fehler beim Speichern: ${response.status}`)
      return
    }

    newProduct.value = emptyProduct()
    showAddForm.value = false
    await loadProducts()
  } catch (error) {
    console.error('Netzwerkfehler:', error)
    alert('Verbindung zum Server fehlgeschlagen.')
  }
}
function cancelNewProduct() {
  showAddForm.value = false
}
function startEdit(product: Product) {
  editingIndex.value = products.value.findIndex(p => p.id === product.id)
  editProduct.value = { ...product }
}

async function saveEdit() {
  if (editingIndex.value === null) return

  const product = products.value[editingIndex.value]
  if (!product || !product.id) return

  await fetch(`${API_URL}/item/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...editProduct.value,
      shoppingList: {
        id: listId,
      },
    }),
  })

  editingIndex.value = null
  await loadProducts()
}

function cancelEdit() {
  editingIndex.value = null
}

async function deleteProduct(product: Product) {
  if (!product.id) return

  const confirmDelete = confirm('Möchtest du dieses Produkt wirklich löschen?')
  if (!confirmDelete) return

  await fetch(`${API_URL}/item/${product.id}`, {
    method: 'DELETE',
  })

  await loadProducts()
}
async function deleteList() {
  if (!shoppingList.value) return

  const confirmed = confirm(
    `Möchtest du die Liste "${shoppingList.value.name}" wirklich löschen?`
  )

  if (!confirmed) return

  await fetch(`${API_URL}/shoppinglist/${shoppingList.value.id}`, {
    method: 'DELETE',
  })

  router.push(`/category/${categoryName}`)
}
function startRenameList() {
  if (!shoppingList.value) return

  newListName.value = shoppingList.value.name
  showRenameForm.value = true
}

async function saveRenameList() {
  if (!shoppingList.value) return
  if (!newListName.value.trim()) return

  await fetch(`${API_URL}/shoppinglist/${shoppingList.value.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...shoppingList.value,
      name: newListName.value,
    }),
  })

  showRenameForm.value = false
  await loadList()
}

async function toggleStatus(product: Product) {
  if (!product.id) return

  await fetch(`${API_URL}/item/${product.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...product,
      status: product.status === 'Offen' ? 'Gekauft' : 'Offen',
      purchased: product.status === 'Offen',
      shoppingList: {
        id: listId,
      },
    }),
  })

  await loadProducts()
}
const filteredProducts = computed(() => {
  let result = products.value

  switch (activeFilter.value) {
    case 'Nach Kategorie':
      result = [...products.value].sort((a, b) =>
        a.category.localeCompare(b.category)
      )
      break

    case 'Zu kaufen':
      result = products.value.filter(
        product => product.status === 'Offen'
      )
      break

    case 'Priorität':
      const order: Record<string, number> = {
        Hoch: 1,
        Mittel: 2,
        Niedrig: 3,
      }

      result = [...products.value].sort(
        (a, b) => (order[a.priority] ?? 99) - (order[b.priority] ?? 99)
      )
      break
  }

  if (!searchQuery.value.trim()) {
    return result
  }

  return result.filter(product =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )

})

onMounted(async () => {
  await loadList()
  await loadProducts()
})
</script>

<template>
  <div class="list-page">
    <Sidebar />

    <main class="content">
      <div class="breadcrumb">
        <button @click="router.push('/dashboard')">
          Alle Listen
        </button>

        <span>›</span>

        <button @click="goBack">
          {{ categoryName }}
        </button>

        <span>›</span>

        <strong>{{ shoppingList?.name }}</strong>
      </div>

      <div class="title-row">
        <div class="title-with-edit">
          <h1>{{ shoppingList?.name }}</h1>

          <button
            class="edit-title-btn"
            @click="startRenameList"
          >
            ✏️
          </button>
        </div>

        <div class="actions">
          <button
            class="delete-list-btn"
            @click="deleteList"
          >
            🗑️ Liste löschen
          </button>

          <button
            class="add-button"
            @click="addProduct"
          >
            + Produkt hinzufügen
          </button>
        </div>
      </div>

      <div v-if="showRenameForm" class="rename-box">
        <input
          v-model="newListName"
          placeholder="Neuer Listenname"
        />

        <button @click="saveRenameList">Speichern</button>
        <button @click="showRenameForm = false">Abbrechen</button>
      </div>

      <nav class="tabs">
        <button @click="activeFilter = 'Alle Artikel'">
          Alle Artikel
        </button>

        <button @click="activeFilter = 'Nach Kategorie'">
          Nach Kategorie
        </button>

        <button @click="activeFilter = 'Zu kaufen'">
          Zu kaufen
        </button>

        <button @click="activeFilter = 'Priorität'">
          Priorität
        </button>
      </nav>
      <input
        v-model="searchQuery"
        class="search-bar"
        placeholder="🔍 Produkt suchen..."
      />
      <table>
        <thead>
        <tr>
          <th>Artikel</th>
          <th>Kategorie</th>
          <th>Menge</th>
          <th>Preis</th>
          <th>Link/Ort</th>
          <th>Priorität</th>
          <th>Status</th>
          <th>Aktionen</th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="(product, index) in filteredProducts"
          :key="product.id"
        >
          <td>{{ product.name }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ product.price }} €</td>
          <td>
            <a
              v-if="product.url && product.url.startsWith('http')"
              :href="product.url"
              target="_blank"
            >
              Öffnen
            </a>

            <span v-else-if="product.url">
              {{ product.url }}
            </span>

            <span v-else>-</span>
          </td>
          <td>{{ product.priority }}</td>

          <td>
            <button
              class="status-button"
              :class="product.status === 'Gekauft' ? 'bought' : 'open'"
              @click="toggleStatus(product)"
            >
              {{ product.status }}
            </button>
          </td>

          <td>
            <button
              class="small-btn"
              @click="startEdit(product)"
            >
              ✏️
            </button>

            <button
              class="small-btn"
              @click="deleteProduct(product)"
            >
              🗑️
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- Produkt hinzufügen -->

      <div
        v-if="showAddForm"
        class="edit-box"
      >
        <h2>Produkt hinzufügen</h2>

        <input
          v-model="newProduct.name"
          placeholder="Artikel"
        />

        <input
          v-model="newProduct.category"
          placeholder="Kategorie"
        />

        <input
          v-model="newProduct.amount"
          placeholder="Menge"
        />

        <input
          v-model="newProduct.price"
          type="number"
          placeholder="Preis"
        />
        <input
          v-model="newProduct.url"
          placeholder="Produkt-Link oder Ort z.B. REWE"
        />

        <select v-model="newProduct.priority">
          <option>Hoch</option>
          <option>Mittel</option>
          <option>Niedrig</option>
        </select>

        <select v-model="newProduct.status">
          <option>Offen</option>
          <option>Gekauft</option>
        </select>

        <div class="edit-actions">
          <button @click="saveNewProduct">
            Hinzufügen
          </button>

          <button @click="cancelNewProduct">
            Abbrechen
          </button>
        </div>
      </div>

      <!-- Produkt bearbeiten -->

      <div
        v-if="editingIndex !== null"
        class="edit-box"
      >
        <h2>Produkt bearbeiten</h2>

        <input
          v-model="editProduct.name"
          placeholder="Artikel"
        />

        <input
          v-model="editProduct.category"
          placeholder="Kategorie"
        />

        <input
          v-model="editProduct.amount"
          placeholder="Menge"
        />

        <input
          v-model="editProduct.price"
          type="number"
          placeholder="Preis"
        />
        <input
          v-model="editProduct.url"
          placeholder="Produkt-Link"
        />

        <select v-model="editProduct.priority">
          <option>Hoch</option>
          <option>Mittel</option>
          <option>Niedrig</option>
        </select>

        <select v-model="editProduct.status">
          <option>Offen</option>
          <option>Gekauft</option>
        </select>

        <div class="edit-actions">
          <button @click="saveEdit">
            Speichern
          </button>

          <button @click="cancelEdit">
            Abbrechen
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.list-page {
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
  font-size: 18px;
  margin-bottom: 25px;
}

.breadcrumb button {
  border: none;
  background: none;
  color: #8b4513;
  text-decoration: underline;
  cursor: pointer;
  font-size: 18px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 42px;
}

.add-button {
  background-color: #8b4513;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 15px 25px;
  font-size: 17px;
  cursor: pointer;
}

.tabs {
  display: flex;
  gap: 35px;
  margin: 35px 0 25px;
}

.tabs button {
  border: none;
  background: none;
  color: #8b4513;
  font-size: 20px;
  cursor: pointer;
  text-decoration: underline;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 17px;
  background-color: #fffaf3;
}

th,
td {
  border: 1px solid #8b4513;
  padding: 15px;
  text-align: center;
}

th {
  font-weight: 700;
  background-color: #f1e5d8;
}

.status {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 15px;
}

.open {
  background-color: #f8dfc8;
}

.bought {
  background-color: #d8ead0;
}

.small-btn {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 18px;
  margin: 0 4px;
}

.edit-box {
  margin-top: 35px;
  padding: 25px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  max-width: 650px;
}

.edit-box h2 {
  margin-bottom: 20px;
  color: #8b4513;
}
.edit-box input,
.edit-box select {
  width: 92%;
  margin-bottom: 14px;
  padding: 12px;
  border: 1px solid #8b4513;
  border-radius: 8px;
  background-color: #f5f1ea;
  color: #8b4513;
  display: block;
}

.edit-actions {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.edit-actions button {
  background-color: #8b4513;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 25px;
  cursor: pointer;
}
.search-bar {
  width: 320px;
  padding: 12px 16px;
  margin: 20px 0;
  border: 1px solid #8b4513;
  border-radius: 10px;
  background: #fffaf3;
  color: #8b4513;
  font-size: 16px;
}
.actions {
  display: flex;
  gap: 12px;
}

.delete-list-btn {
  background: #c0392b;
  color: white;
  border: none;
  padding: 15px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 17px;
}

.delete-list-btn:hover {
  background: #a93226;
}
.title-with-edit {
  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-title-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #8b4513;
}

.edit-title-btn:hover {
  transform: scale(1.15);
}
.rename-box {
  margin: 20px 0;
  display: flex;
  gap: 12px;
}

.rename-box input {
  padding: 12px;
  border: 1px solid #8b4513;
  border-radius: 10px;
  background: #fffaf3;
  color: #8b4513;
}

.rename-box button {
  background: #8b4513;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 20px;
  cursor: pointer;
}
</style>
