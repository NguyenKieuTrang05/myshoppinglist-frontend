<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
html,
body,
#app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

button,
input,
textarea,
select {
  font-family: inherit;
}
</style>
