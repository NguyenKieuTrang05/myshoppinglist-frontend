<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'

const { user, logout } = useAuth0()

function goToLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  })
}
</script>

<template>
  <main class="dashboard">
    <h1>Hallo {{ user?.name }} 👋</h1>
    <p>Du bist erfolgreich eingeloggt.</p>

    <button @click="goToLogout">
      Ausloggen
    </button>
  </main>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: #F8F4EC;
  padding: 40px;
  font-family: 'Poppins', sans-serif;
}

button {
  margin-top: 24px;
  width: 160px;
  height: 48px;
  background: #8a461f;
  color: white;
  border: none;
  border-radius: 7px;
  font-weight: 700;
  cursor: pointer;
}
</style>
