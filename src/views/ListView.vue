<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { productsByList, type Product } from '@/data/products'

const route = useRoute()
const router = useRouter()

const categoryName = route.params.categoryName as string | undefined
const listName = route.params.listName as string

const isSharedList = route.path.startsWith('/shared')

let listKey = ''

if (isSharedList) {
  listKey = listName
} else {
  listKey = `${categoryName}-${listName}`
}

const products = ref<Product[]>(productsByList[listKey] || [])

const toggleStatus = (index: number) => {
  const product = products.value[index]

  if (!product) return

  product.status =
    product.status === 'Offen'
      ? 'Gekauft'
      : 'Offen'
}

const deleteProduct = (index: number) => {
  const confirmDelete = confirm('Möchtest du dieses Produkt wirklich löschen?')

  if (confirmDelete) {
    products.value.splice(index, 1)
  }
}

const editingIndex = ref<number | null>(null)

const editProduct = ref<Product>({
  article: '',
  category: '',
  quantity: '',
  price: '',
  priority: '',
  status: '',
})

const startEdit = (index: number) => {
  editingIndex.value = index
  editProduct.value = { ...products.value[index] }
}

const saveEdit = () => {
  if (editingIndex.value !== null) {
    products.value[editingIndex.value] = { ...editProduct.value }
    editingIndex.value = null
  }
}

const cancelEdit = () => {
  editingIndex.value = null
}

const goBack = () => {
  if (isSharedList) {
    router.push('/shared')
  } else {
    router.push(`/category/${categoryName}`)
  }
}

const showAddForm = ref(false)

const newProduct = ref<Product>({
  article: '',
  category: '',
  quantity: '',
  price: '',
  priority: 'Mittel',
  status: 'Offen'
})

const addProduct = () => {
  showAddForm.value = true
}

const saveNewProduct = () => {
  products.value.push({ ...newProduct.value })

  newProduct.value = {
    article: '',
    category: '',
    quantity: '',
    price: '',
    priority: 'Mittel',
    status: 'Offen'
  }

  showAddForm.value = false
}

const cancelNewProduct = () => {
  showAddForm.value = false
}
</script>

<template>
  <div class="list-page">
    <Sidebar />

    <main class="content">
      <div class="breadcrumb">

        <button
          @click="isSharedList ? router.push('/shared') : router.push('/dashboard')"
        >
          {{ isSharedList ? 'Geteilte Listen' : 'Alle Listen' }}
        </button>

        <template v-if="!isSharedList">
          <span>›</span>

          <button @click="router.push(`/category/${categoryName}`)">
            {{ categoryName }}
          </button>
        </template>

        <span>›</span>

        <strong>{{ listName }}</strong>

      </div>

      <div class="title-row">
        <h1>{{ listName }}</h1>
        <button class="add-button" @click="addProduct">+ Produkt hinzufügen</button>
      </div>

      <nav class="tabs">
        <button>Alle Artikel</button>
        <button>Nach Kategorie</button>
        <button>Zu kaufen</button>
        <button>Priorität</button>
      </nav>

      <table>
        <thead>
        <tr>
          <th>Artikel</th>
          <th>Kategorie</th>
          <th>Menge</th>
          <th>Preis</th>
          <th>Priorität</th>
          <th>Status</th>
          <th>Aktionen</th>
        </tr>
        </thead>

        <tbody>
        <tr v-for="(product, index) in products" :key="product.article">
          <td>{{ product.article }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.priority }}</td>
          <td>
            <button
              class="status-button"
              :class="product.status === 'Gekauft' ? 'bought' : 'open'"
              @click="toggleStatus(index)"
            >
              {{ product.status }}
            </button>
          </td>
          <td>
            <button class="small-btn" @click="startEdit(index)">✏️</button>
            <button class="small-btn" @click="deleteProduct(index)">🗑️</button>
          </td>
        </tr>
        </tbody>
      </table>

      <div v-if="showAddForm" class="edit-box">
        <h2>Produkt hinzufügen</h2>

        <input v-model="newProduct.article" placeholder="Artikel" />
        <input v-model="newProduct.category" placeholder="Kategorie" />
        <input v-model="newProduct.quantity" placeholder="Menge" />
        <input v-model="newProduct.price" placeholder="Preis" />

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
          <button @click="saveNewProduct">Hinzufügen</button>
          <button @click="cancelNewProduct">Abbrechen</button>
        </div>
      </div>

      <div v-if="editingIndex !== null" class="edit-box">
        <h2>Produkt bearbeiten</h2>

        <input v-model="editProduct.article" placeholder="Artikel" />
        <input v-model="editProduct.category" placeholder="Kategorie" />
        <input v-model="editProduct.quantity" placeholder="Menge" />
        <input v-model="editProduct.price" placeholder="Preis" />

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
          <button @click="saveEdit">Speichern</button>
          <button @click="cancelEdit">Abbrechen</button>
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
  max-width: 700px;
}

.edit-box h2 {
  margin-bottom: 20px;
  color: #8b4513;
}

.edit-box input,
.edit-box select {
  width: 100%;
  margin-bottom: 14px;
  padding: 12px;
  border: 1px solid #8b4513;
  border-radius: 8px;
  background-color: #f5f1ea;
  color: #8b4513;
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
</style>
