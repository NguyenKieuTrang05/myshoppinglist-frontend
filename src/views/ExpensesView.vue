<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { productsByList } from '@/data/products'

const parsePrice = (price: string) => {
  const match = price.replace(',', '.').match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

const parseQuantity = (quantity: string) => {
  const match = quantity.replace(',', '.').match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 1
}

const boughtProducts = Object.entries(productsByList)
  .flatMap(([listKey, products]) =>
    products
      .filter(product => product.status === 'Gekauft')
      .map(product => ({
        ...product,
        mainCategory: listKey.split('-')[0],
        listName: listKey.split('-')[1]
      }))
  )
const getTotal = (product: any) => {
  return parsePrice(product.price) * parseQuantity(product.quantity)
}

const totalExpenses = boughtProducts.reduce((sum, product) => {
  return sum + getTotal(product)
}, 0)

const expensesByCategory = boughtProducts.reduce(
  (result: Record<string, number>, product: any) => {
    result[product.mainCategory] =
      (result[product.mainCategory] || 0) + getTotal(product)

    return result
  },
  {}
)

const categoryExpenses = Object.entries(expensesByCategory)

const formatPrice = (value: number) => {
  return value.toFixed(2).replace('.', ',') + ' €'
}
</script>

<template>
  <div class="expenses-page">
    <Sidebar />

    <main class="content">
      <h1>Ausgaben</h1>
      <p class="subtitle">Hier siehst du alle gekauften Produkte und deine berechneten Ausgaben.</p>

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
          v-for="[category, amount] in categoryExpenses"
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
          <th>Kategorie</th>
          <th>Menge</th>
          <th>Preis</th>
          <th>Gesamt</th>
        </tr>
        </thead>

        <tbody>
        <tr
          v-for="product in boughtProducts"
          :key="product.article + product.price"
        >
          <td>{{ product.article }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.quantity }}</td>
          <td>{{ product.price }}</td>
          <td>{{ formatPrice(getTotal(product)) }}</td>
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
