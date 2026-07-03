<script setup lang="ts">
<<<<<<< HEAD
import { useAuth0 } from '@auth0/auth0-vue'
const { loginWithRedirect } = useAuth0()

function goToRegister() {
  loginWithRedirect({
    appState: {
      target: '/dashboard',
    },
    authorizationParams: {
      screen_hint: 'signup',
    },
  })
}

function goToLogin() {
  loginWithRedirect({
    appState: {
      target: '/dashboard',
    },
  })
=======
import logo from '@/assets/Logo.png'

import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
>>>>>>> 1130080 (komplettes frontend)
}
</script>

<template>
<<<<<<< HEAD
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
=======
  <div class="landing-page">
    <header class="header">
      <div class="logo-container">
        <img :src="logo" alt="ShoppingList Logo" class="logo" />
        <h1>My ShoppingList</h1>
      </div>
    </header>

    <main class="content">
      <div class="left-section">
        <h2>
          Plane deine Einkäufe, speichere Produkte
          und verwalte deine Listen zentral.
        </h2>

        <div class="buttons">
          <button class="register-btn" @click="goToRegister">
            Registrieren
          </button>

          <button class="login-btn" @click="goToLogin">
>>>>>>> 1130080 (komplettes frontend)
            Einloggen
          </button>
        </div>
      </div>
<<<<<<< HEAD
      <div class="landing-pic">
        <img src="@/assets/macbook.png" alt="My ShoppingList">
      </div>
    </section>
=======

      <div class="phone-container">
        <div class="phone">
          <div class="cloud"></div>
          <div class="hill hill-light"></div>
          <div class="hill hill-dark"></div>

          <div class="phone-bottom">
            <div class="search-bar"></div>
            <span>♡</span>
            <span>▽</span>
          </div>
        </div>
      </div>
    </main>
>>>>>>> 1130080 (komplettes frontend)
  </div>
</template>

<style scoped>
<<<<<<< HEAD
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
=======
.landing-page {
  min-height: 100vh;
  background-color: #F5F1EA;
  padding: 30px 60px;
  font-family: Arial, sans-serif;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 25px;
}

.logo {
  width: 70px;
  height: 70px;
}

h1 {
  color: #8B4513;
  font-size: 42px;
  font-weight: 500;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
}

.left-section {
  max-width: 650px;
}

.left-section h2 {
  font-size: 42px;
  line-height: 1.25;
  color: #111;
  font-weight: 700;
  max-width:700px;
}

.buttons {
  margin-top: 80px;
  display: flex;
  gap: 50px;
}

button {
  background-color: #8B4513;
  color: white;
  border: none;
  padding: 22px 65px;
  border-radius: 12px;
  font-size: 24px;
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

.phone-container {
  margin-right: 100px;
  margin-top: -120px;
}

.phone {
  width: 280px;
  height: 560px;
  border: 10px solid black;
  border-radius: 45px;
  background: linear-gradient(to bottom, #bfe4ff, #eaf7ff);
  position: relative;
  overflow: hidden;
}

.cloud {
  position: absolute;
  top: 80px;
  left: 60px;
  width: 150px;
  height: 60px;
  background: white;
  border-radius: 50px;
}

.cloud::before {
  content: "";
  position: absolute;
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 50%;
  top: -30px;
  left: 20px;
}

.cloud::after {
  content: "";
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  top: -15px;
  right: 20px;
}

.hill-light {
  position: absolute;
  width: 400px;
  height: 150px;
  background: #c3db8b;
  border-radius: 50%;
  bottom: 80px;
  left: -70px;
}

.hill-dark {
  position: absolute;
  width: 420px;
  height: 220px;
  background: #86a800;
  border-radius: 50%;
  bottom: -80px;
  left: -80px;
}

.phone-bottom {
  position: absolute;
  bottom: 20px;
  left: 25px;
  right: 25px;
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  font-size: 28px;
}

.search-bar {
  flex: 1;
  height: 20px;
  border: 2px solid white;
  border-radius: 15px;
}

@media (max-width: 1100px) {
  .content {
    flex-direction: column;
    gap: 60px;
  }

  .phone-container {
    margin-right: 0;
  }

  .left-section h2 {
    font-size: 42px;
  }
>>>>>>> 1130080 (komplettes frontend)
}
</style>
