<script setup lang="ts">
import { ref } from 'vue'
import HomePage from './components/HomePage.vue'
import ShoppingList from './components/ShoppingList.vue'

const isLoggedIn = ref(false)
</script>

<template>
  <HomePage v-if="!isLoggedIn" @login="isLoggedIn = true" />
  <ShoppingList v-else />
</template>
