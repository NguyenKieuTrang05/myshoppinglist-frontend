<script setup lang="ts">
import logo from '@/assets/Logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
const goToDashboard = () => {
  router.push('/dashboard')
}
</script>

<template>
  <div class="login-page">
    <button class="back-button" @click="goBack">‹</button>

    <section class="login-content">
      <div class="form-section">
        <h1>Willkommen zurück!</h1>
        <p><strong>Melde dich an</strong> und setzte deine Liste fort.</p>

        <label>E-Mail Adresse</label>
        <input type="email" placeholder="E-Mail Adresse" />

        <label>Passwort</label>
        <input type="password" placeholder="Passwort" />

        <a href="#" class="forgot-password">Passwort vergessen?</a>

        <button class="login-button" @click="goToDashboard">Anmelden</button>
      </div>

      <div class="logo-section">
        <img :src="logo" alt="ShoppingList Logo" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f5f1ea;
  padding: 40px 70px;
  color: #8b4513;
  font-family: Arial, sans-serif;
}

.back-button {
  background: none;
  border: none;
  color: #8b4513;
  font-size: 70px;
  cursor: pointer;
}

.login-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
}

.form-section {
  width: 58%;
}

h1 {
  font-size: 34px;
  margin-bottom: 15px;
  font-weight: 800;
}

p {
  font-size: 28px;
  margin-bottom: 55px;
}

label {
  display: block;
  font-size: 26px;
  margin-bottom: 12px;
}

input {
  width: 100%;
  height: 65px;
  border: 2px solid #8b4513;
  border-radius: 10px;
  background: transparent;
  font-size: 20px;
  text-align: center;
  margin-bottom: 25px;
}

.forgot-password {
  display: block;
  text-align: right;
  color: #8b4513;
  font-size: 18px;
  margin-bottom: 80px;
}

.login-button {
  background-color: #8b4513;
  color: white;
  border: 2px solid #3d2a21;
  border-radius: 10px;
  padding: 24px 90px;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
}

.logo-section {
  width: 35%;
  display: flex;
  justify-content: center;
}

.logo-section img {
  width: 330px;
  height: 330px;
}

@media (max-width: 900px) {
  .login-content {
    flex-direction: column;
    gap: 50px;
  }

  .form-section {
    width: 100%;
  }

  .logo-section img {
    width: 390px;
    height: 390px;
  }
}
</style>
