<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import logo from '@/assets/Logo.png'
import macbook from '@/assets/macbook.png'

const router = useRouter()
const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0()

watch(
  [isAuthenticated, isLoading],
  () => {
    if (!isLoading.value && isAuthenticated.value) {
      router.push('/dashboard')
    }
  },
  { immediate: true },
)

function goToLogin() {
  loginWithRedirect({
    appState: { target: '/dashboard' },
  })
}

function goToRegister() {
  loginWithRedirect({
    appState: { target: '/dashboard' },
    authorizationParams: { screen_hint: 'signup' },
  })
}
</script>
<template>
  <div class="landing">
    <header class="navbar">
      <div class="logo-area">
        <img :src="logo" alt="Logo" class="landing-logo" />
        <h2>My ShoppingList</h2>
      </div>
    </header>

    <section class="landing-main">
      <div class="landing-text">
        <h1>
          Plane deine Einkäufe, speichere Produkte und verwalte deine Listen
          zentral.
        </h1>

        <div class="buttons">
          <button class="register" @click="goToRegister()">
            Registrieren
          </button>

          <button class="login" @click="goToLogin()">
            Einloggen
          </button>
        </div>
      </div>

      <div class="landing-pic">
        <img :src="macbook" alt="My ShoppingList" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  background-color: #f5f1ea;
  padding: 32px 70px;
  font-family: 'Poppins', sans-serif;
  color: #1f1f1f;
}

.navbar {
  display: flex;
  align-items: center;
}

.landing-logo {
  width: 90px;
  height: 90px;
  object-fit: contain;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-area h2 {
  color: #8b5a5a;
  font-size: 34px;
  font-weight: 700;
}

.landing-main {
  margin-top: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.landing-text h1 {
  max-width: 650px;
  font-size: 44px;
  line-height: 1.25;
  font-weight: 600;
  margin-top: -25px;
}

.buttons {
  margin-top: 56px;
  display: flex;
  gap: 64px;
}

.register,
.login {
  width: 210px;
  height: 56px;
  background: #8a461f;
  color: white;
  border: 1.5px solid #2f1a10;
  border-radius: 7px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.register:hover,
.login:hover {
  background: #6f3618;
}

.landing-pic {
  display: flex;
  justify-content: center;
  align-items: center;
}

.landing-pic img {
  width: 760px;
  height: auto;
}
</style>
