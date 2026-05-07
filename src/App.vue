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

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  width: 100%;
  min-height: 100vh;
  background: #f3f4f6;  /* ← das hier ist neu */
}
</style>

