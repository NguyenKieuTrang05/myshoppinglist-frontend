<script setup lang="ts">
import logo from '@/assets/Logo.png'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <aside class="sidebar">

    <div class="logo-section">
      <img :src="logo" alt="Logo" class="logo" />
      <h2>My ShoppingList</h2>
    </div>

    <nav class="menu">
      <button class="menu-item" @click="router.push('/dashboard')">
        🏠 Homepage
      </button>

      <button class="menu-item" @click="router.push('/all-lists')">
        📋 Alle Listen
      </button>

      <button class="menu-item" @click="router.push('/favorites')">
        ⭐ Favoriten
      </button>

      <button class="menu-item" @click="router.push('/shared')">
        👥 Geteilte Listen
      </button>

      <button class="menu-item" @click="router.push('/expenses')">
        💰 Ausgaben
      </button>

      <button class="menu-item" @click="router.push('/settings')">
        ⚙️ Einstellungen
      </button>
    </nav>

  </aside>
</template>

<style scoped>

.sidebar {
  width: 280px;
  min-height: 100vh;
  background-color: #f5f1ea;
  border-right: 1px solid #e0d8d0;
  padding: 30px 20px;
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

.logo {
  width: 150px;
  height: 150px;
  object-fit: contain;
  margin-bottom: 15px;
}

.logo-section h2 {
  color: #8b5a5a;
  font-size: 28px;
  font-weight: 700;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-item {
  background-color: #b87464;
  color: white;
  border: none;
  border-radius: 14px;
  padding: 18px;
  font-size: 17px;
  cursor: pointer;
  transition: 0.2s;
  text-align: left;
}

.menu-item:hover {
  transform: scale(1.03);
}

</style>
