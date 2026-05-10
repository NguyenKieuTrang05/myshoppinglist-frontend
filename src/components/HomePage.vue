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

    <img src="/shoppinglist-logo.jpeg" alt="Logo" class="logo" />

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

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;

  background: white;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}

.card {
  text-align: center;
}

.logo {
  width: 160px;

  position: absolute;
  top: 20px;
  left: 20px;
}

h1 {
  font-size: 48px;

  color: #111827;

  margin-bottom: 20px;
}

p {
  color: #4b5563;

  font-size: 18px;

  margin-bottom: 35px;
}

.buttons {
  display: flex;
  flex-direction: column;

  gap: 18px;
}

button {
  padding: 16px 28px;

  border: none;
  border-radius: 12px;

  font-size: 18px;
  font-weight: bold;

  cursor: pointer;

  transition: 0.2s;
}

button:hover {
  transform: scale(1.03);
}

.login-btn {
  background: #42b883;
  color: white;
}

.register-btn {
  background: #e5e7eb;
  color: #111827;
}
</style>
