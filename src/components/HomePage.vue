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

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 24px;
  background: white;

  font-family: Arial, sans-serif;
}

.card {
  width: 100%;
  max-width: 500px;
  padding: 48px 40px;
  padding: 5vw;
  background: white;

  border-radius: 24px;


  text-align: center;


}

h1 {
  margin-bottom: 20px;
  font-size: 40px;
  color: #111827;
}

p {
  color: #4b5563;
  margin-bottom: 35px;
  line-height: 1.5;
}

.buttons {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

button {
  padding: 16px;
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
