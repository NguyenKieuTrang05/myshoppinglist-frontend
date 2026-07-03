<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { ref } from 'vue'

const name = ref('Max Mustermann')
const username = ref('max123')
const email = ref('max@example.com')
const password = ref('********')

const saveSettings = () => {
  alert('Änderungen gespeichert!')
}

import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  router.push('/')
}
</script>

<template>
  <div class="settings-page">
    <Sidebar />

    <main class="content">
      <h1>Profil</h1>

      <div class="profile-container">

        <div class="profile-picture">
          👤
          <button class="edit-icon">✏️</button>
        </div>

        <div class="form-container">

          <label>Name</label>
          <div class="input-wrapper">
            <input v-model="name" />
            <span>✏️</span>
          </div>

          <label>Benutzername</label>
          <div class="input-wrapper">
            <input v-model="username" />
            <span>✏️</span>
          </div>

          <label>E-Mail</label>
          <div class="input-wrapper">
            <input v-model="email" disabled/>
          </div>

          <label>Passwort</label>
          <div class="input-wrapper">
            <input type="password" v-model="password" disabled/>
          </div>

          <button class="save-btn" @click="saveSettings">
            Änderungen speichern
          </button>

          <button class="logout-btn" @click="logout">
            Logout
          </button>

        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.settings-page {
  display: flex;
  min-height: 100vh;
  background: #f7f3ed;
}

.content {
  flex: 1;
  padding: 50px;
}

h1 {
  color: #8b4b26;
  font-size: 42px;
  margin-bottom: 40px;
}

.profile-container {
  display: flex;
  gap: 100px;
  align-items: flex-start;
}

.profile-picture {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: #8b4b26;
  color: white;
  font-size: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.edit-icon {
  position: absolute;
  right: 10px;
  bottom: 10px;
  border: none;
  background: transparent;
  font-size: 28px;
  cursor: pointer;
}

.form-container {
  width: 600px;
}

label {
  display: block;
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 28px;
  color: #8b4b26;
}

.input-wrapper {
  position: relative;
}

input {
  width: 100%;
  padding: 18px 60px 18px 25px;
  border: 3px solid #8b4b26;
  border-radius: 50px;
  font-size: 22px;
  outline: none;
  background: transparent;
}

.input-wrapper span {
  position: absolute;
  right: 25px;
  top: 18px;
  font-size: 24px;
}

.save-btn {
  margin-top: 40px;
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 50px;
  background: #8b4b26;
  color: white;
  font-size: 22px;
  cursor: pointer;
}

.logout-btn {
  margin-top: 20px;
  width: 100%;
  padding: 18px;
  border: none;
  border-radius: 50px;
  background: #b33a3a;
  color: white;
  font-size: 22px;
  cursor: pointer;
}
</style>s
