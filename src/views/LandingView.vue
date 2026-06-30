<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect } = useAuth0()

function goToRegister() {
  loginWithRedirect({
    authorizationParams: {
      screen_hint: 'signup',
    },
  })
}

function goToLogin() {
  loginWithRedirect()
}
</script>

<template>
  <div class="landing">
    <header class="navbar">
      <div class="logo-area">
        <div class="logo">SL</div>
        <h2>My ShoppingList</h2>
      </div>
    </header>
    <section class="landing-main">
      <div class="landing-text">
        <h1>
          Plane deine Einkäufe, speichere Produkte und verwalte deine Listen zentral.
        </h1>
        <div class="buttons">
          <button class="register"
                  @click="goToRegister">
            Registrieren
          </button>
          <button class="login"
                  @click="goToLogin">
            Einloggen
          </button>
        </div>
      </div>
      <div class="landing-pic">
        <img src="@/assets/Macbook.png" alt="My ShoppingList">
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  background: #F8F4EC;
  padding: 32px 70px;
  font-family: 'Poppins', sans-serif;
  color: #1f1f1f;
}

.navbar {
  display: flex;
  align-items: center;
}

.logo-area {
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #8a461f;
  color: #fff8ee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Georgia, serif;
  font-size: 20px;
  border: 2px solid #fff8ee;
  box-shadow: 0 0 0 2px #8a461f;
}

.logo-area h2 {
  color: #8a461f;
  font-size: 24px;
  font-weight: 400;
}

.landing-main {
  margin-top: 180px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.landing-text h1 {
  max-width: 650px;
  font-size: 46px;
  line-height: 1.25;
  font-weight: 800;
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

/* Bild */

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
