<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { ref, watch } from 'vue'

const { user, logout } = useAuth0()

const name = ref('')
const username = ref('')
const email = ref('')
const profileImage = ref<string | null>(null)

function key(field: string) {
  return `${user.value?.sub}-${field}`
}

function loadProfile() {
  if (!user.value) return

  name.value = localStorage.getItem(key('profileName')) || user.value.name || ''
  username.value = localStorage.getItem(key('profileUsername')) || user.value.nickname || ''
  email.value = user.value.email || ''
  profileImage.value =
    localStorage.getItem(key('profileImage')) ||
    user.value.picture ||
    null
}

watch(user, loadProfile, { immediate: true })

function saveSettings() {
  localStorage.setItem(key('profileName'), name.value)
  localStorage.setItem(key('profileUsername'), username.value)

  if (profileImage.value) {
    localStorage.setItem(key('profileImage'), profileImage.value)
  }

  alert('Änderungen gespeichert!')
}

function changeProfileImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  const reader = new FileReader()

  reader.onload = () => {
    profileImage.value = reader.result as string
  }

  reader.readAsDataURL(file)
}

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  })
}
</script>

<template>
  <div class="settings-page">
    <Sidebar />

    <main class="content">
      <div class="profile-card">
        <h1>Profil</h1>

        <div class="profile-layout">
          <section class="avatar-section">
            <div class="profile-picture">
              <img v-if="profileImage" :src="profileImage" alt="Profilbild" />

              <div v-else class="default-user-icon">
                <div class="head"></div>
                <div class="body"></div>
              </div>

              <label class="edit-icon">
                ✎
                <input type="file" accept="image/*" @change="changeProfileImage" />
              </label>
            </div>
          </section>

          <section class="form-section">
            <label>Name</label>
            <input v-model="name" />

            <label>Benutzername</label>
            <input v-model="username" />

            <label>E-Mail</label>
            <input v-model="email" disabled />

            <p class="hint">
              Die E-Mail wird über Auth0 verwaltet.
            </p>

            <div class="actions">
              <button class="save-btn" @click="saveSettings">
                Speichern
              </button>

              <button class="logout-btn" @click="handleLogout">
                Logout
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>

/* ===== Seitenlayout ===== */

.settings-page {
  display: flex;
  min-height: 100vh;
  background: #f7f3ed;
  font-family: 'Poppins', sans-serif;
}

.content {
  flex: 1;
  padding: 48px 64px;
  color: #8b4b26;
  overflow-x: hidden;
  max-width: calc(100vw - 280px);
}

/* ===== Profilkarte ===== */

.profile-card {
  width: 100%;
  max-width: 1000px;
  padding: 42px 20px;
  background: transparent;
  border: none;
  box-shadow: none;
}

h1 {
  font-size: 38px;
  margin-bottom: 38px;
  font-weight: 700;
}

.profile-layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 560px);
  gap: 55px;
  align-items: start;
}

/* ===== Profilbild ===== */

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-picture {
  width: 190px;
  height: 190px;
  border-radius: 50%;
  position: relative;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #8b4b26;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.default-user-icon {
  width: 110px;
  height: 110px;
}

.default-user-icon .head {
  width: 58px;
  height: 58px;
  background: #fffaf3;
  border-radius: 50%;
  margin: 0 auto;
}

.default-user-icon .body {
  width: 110px;
  height: 62px;
  background: #fffaf3;
  border-radius: 70px 70px 22px 22px;
  margin-top: -2px;
}

.edit-icon {
  position: absolute;
  right: 6px;
  bottom: 10px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #ffffff;
  color: #8b4b26;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
}

.edit-icon input {
  display: none;
}

/* ===== Formular ===== */

.form-section label {
  display: block;
  margin-bottom: 8px;
  margin-top: 18px;
  font-size: 17px;
  font-weight: 700;
}

.form-section input {
  width: 100%;
  height: 52px;
  padding: 0 20px;
  border: 2px solid #8b4b26;
  border-radius: 16px;
  font-size: 18px;
  outline: none;
  background: #fffaf3;
  color: #8b4b26;
  font-family: 'Poppins', sans-serif;
}

.form-section input:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.hint {
  margin-top: 10px;
  font-size: 13px;
  color: #9b6a50;
}

/* ===== Buttons ===== */

.actions {
  display: flex;
  gap: 16px;
  margin-top: 34px;
}

.save-btn,
.logout-btn {
  width: 180px;
  padding: 14px 18px;
  border: none;
  border-radius: 14px;
  color: white;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
}

.save-btn {
  background: #8b4b26;
}

.logout-btn {
  background: #b83b3b;
}

.save-btn:hover,
.logout-btn:hover {
  opacity: 0.9;
}

/* ===== Responsive ===== */

@media (max-width: 1000px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }

  .avatar-section {
    align-items: flex-start;
  }
}
</style>
