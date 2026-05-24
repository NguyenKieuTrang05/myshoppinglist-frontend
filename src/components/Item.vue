<script setup lang="ts">
defineProps<{
  item: {
    id: number
    name: string
    category: string
    amount: string
    shop: string
    url: string
    price: number
    priority: string
    status: string
  }
}>()
</script>

<template>
  <div class="row">
    <span>{{ item.name }}</span>
    <span>{{ item.category }}</span>
    <span>{{ item.amount }}</span>
    <span>{{ item.shop }}</span>
    <span>
      <a :href="item.url" target="_blank">
          Öffnen
      </a>
    </span>
    <span>{{ item.price }} €</span>
    <span>{{ item.priority }}</span>
    <span>{{ item.status}}</span>
  </div>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 2fr 2fr 1fr 1fr 1fr;
  gap: 24px;
  padding: 18px 20px;
  border-bottom: 1px solid #ddd;
  color: black;
  align-items: center;
}


</style>
