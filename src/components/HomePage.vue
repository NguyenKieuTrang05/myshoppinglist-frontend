<script setup lang="ts">
const emit = defineEmits(['login'])

function login() {
  emit('login')
}

function register() {
  alert('Registrierung kommt später')
}
</script>

<template>
  <main class="home">
    <div class="card">
      <h1>My Shopping List</h1>

      <p>
        Plane deine Einkäufe, speichere Produkte und verwalte deine Listen zentral.
      </p>

      <div class="buttons">
        <button class="login-btn" @click="login">
          Einloggen
        </button>

        <button class="register-btn" @click="register">
          Registrieren
        </button>
      </div>
    </div>
  </main>
</template>


