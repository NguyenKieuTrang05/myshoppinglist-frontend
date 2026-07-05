<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { computed, onMounted, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const API_URL = 'https://myshoppinglist-backend-vjdp.onrender.com'
const { user } = useAuth0()

type ShoppingList = {
  id: number
  name: string
  category: string
  owner?: { id: string }
}

type Product = {
  id: number
  name: string
  category: string
  amount: string
  price: number
  priority: string
  status: string
  purchased: boolean
  mainCategory: string
  listName: string
}

const products = ref<Product[]>([])

async function loadExpenses() {
  if (!user.value?.sub) return

  const listResponse = await fetch(`${API_URL}/shoppinglist`)
  const allLists: ShoppingList[] = await listResponse.json()

  const ownLists = allLists.filter(
    (list) => list.owner?.id === user.value?.sub,
  )

  const allProducts = await Promise.all(
    ownLists.map(async (list) => {
      const itemResponse = await fetch(`${API_URL}/shoppinglist/${list.id}/items`)
      const items = await itemResponse.json()

      return items.map((item: any) => ({
        ...item,
        mainCategory: list.category,
        listName: list.name,
      }))
    }),
  )

  products.value = allProducts.flat()
}

const boughtProducts = computed(() =>
  products.value.filter(
    (product) => product.status === 'Gekauft' || product.purchased,
  ),
)

function parseQuantity(amount: string) {
  const match = amount.replace(',', '.').match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 1
}

function getTotal(product: Product) {
  return Number(product.price || 0) * parseQuantity(product.amount || '1')
}

const totalExpenses = computed(() =>
  boughtProducts.value.reduce((sum, product) => sum + getTotal(product), 0),
)

const expensesByCategory = computed(() => {
  const result: Record<string, number> = {}

  boughtProducts.value.forEach((product) => {
    result[product.mainCategory] =
      (result[product.mainCategory] || 0) + getTotal(product)
  })

  return Object.entries(result)
})

function formatPrice(value: number) {
  return value.toFixed(2).replace('.', ',') + ' €'
}

onMounted(() => {
  loadExpenses()
})
</script>

<template>
  <div class="expenses-page">
    <Sidebar />

    <main class="content">
      <h1>Ausgaben</h1>

      <p class="subtitle">
        Hier siehst du alle gekauften Produkte und deine berechneten Ausgaben.
      </p>

      <div class="summary-grid">
        <div class="summary-card">
          <h2>Gesamtausgaben</h2>
          <strong>{{ formatPrice(totalExpenses) }}</strong>
        </div>

        <div class="summary-card">
          <h2>Gekaufte Produkte</h2>
          <strong>{{ boughtProducts.length }}</strong>
        </div>
      </div>

      <h2>Ausgaben nach Kategorie</h2>

      <div class="category-grid">
        <div
          v-for="[category, amount] in expensesByCategory"
          :key="category"
          class="category-card"
        >
          <h3>{{ category }}</h3>
          <p>{{ formatPrice(amount) }}</p>
        </div>
      </div>

      <h2>Gekaufte Produkte</h2>

      <table class="expenses-table">
        <thead>
        <tr>
          <th>Artikel</th>
          <th>Hauptkategorie</th>
          <th>Liste</th>
          <th>Menge</th>
          <th>Preis</th>
          <th>Gesamt</th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="product in boughtProducts"
          :key="product.id"
        >
          <td>{{ product.name }}</td>
          <td>{{ product.mainCategory }}</td>
          <td>{{ product.listName }}</td>
          <td>{{ product.amount }}</td>
          <td>{{ formatPrice(product.price) }}</td>
          <td>{{ formatPrice(getTotal(product)) }}</td>
        </tr>

        <tr v-if="boughtProducts.length === 0">
          <td colspan="6">
            Es wurden noch keine Produkte gekauft.
          </td>
        </tr>
        </tbody>
      </table>
    </main>
  </div>
</template>

<style scoped>
.expenses-page {
  display: flex;
  min-height: 100vh;
  background-color: #f5f1ea;
}

.content {
  flex: 1;
  padding: 45px 55px;
  color: #8b4513;
  overflow-x: auto;
}

h1 {
  font-size: 42px;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 20px;
  margin-bottom: 35px;
}

.summary-grid {
  display: flex;
  gap: 25px;
  margin-bottom: 35px;
}

.summary-card {
  width: 300px;
  padding: 25px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
}

.summary-card h2 {
  font-size: 21px;
  margin-bottom: 14px;
}

.summary-card strong {
  font-size: 34px;
}

h2 {
  font-size: 28px;
  margin: 35px 0 18px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(170px, 1fr));
  gap: 22px;
}

.category-card {
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  padding: 22px;
  text-align: center;
}

.category-card h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.category-card p {
  font-size: 22px;
  font-weight: 700;
  margin: 0;
}

.expenses-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fffaf3;
  font-size: 17px;
}

.expenses-table th,
.expenses-table td {
  border: 1px solid #8b4513;
  padding: 14px;
  text-align: center;
}

.expenses-table th {
  background-color: #f1e5d8;
}
</style>
