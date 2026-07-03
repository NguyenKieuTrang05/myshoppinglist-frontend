<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const openSharedList = (listName: string) => {
  router.push(`/shared/${listName}`)
}

const searchQuery = ref('')

const searchResult = ref<{ id: number; username: string; color: string } | null>(null)

const friendRequests = ref([
  { id: 1, username: 'anna_müller' },
])

const friends = ref([
  { id: 1, username: 'viona.podv', color: '#d8d3c7' },
  { id: 2, username: 'leoml', color: '#6b2d10' },
  { id: 3, username: 'kieu.ngy', color: '#6ec6e8' },
])

const sharedLists = ref([
  {
    id: 1,
    name: 'WG Einkauf',
    category: 'Geteilte Listen',
    icon: '🛒',
    products: 4,
    sharedBy: 'leoml'
  },
  {
    id: 2,
    name: 'Geburtstag',
    category: 'Geteilte Listen',
    icon: '🎂',
    products: 3,
    sharedBy: 'kieu.ngy'
  },
  {
    id: 3,
    name: 'Urlaub',
    category: 'Geteilte Listen',
    icon: '🏖️',
    products: 3,
    sharedBy: 'viona.podv'
  },
])

const searchUser = () => {
  if (!searchQuery.value.trim()) return

  searchResult.value = {
    id: Date.now(),
    username: searchQuery.value,
    color: '#b87464'
  }
}

const addFriend = () => {
  if (!searchResult.value) return

  friendRequests.value.push({
    id: searchResult.value.id,
    username: searchResult.value.username
  })

  searchQuery.value = ''
  searchResult.value = null
}

const acceptRequest = (id: number) => {
  const request = friendRequests.value.find(request => request.id === id)

  if (!request) return

  friends.value.push({
    id: Date.now(),
    username: request.username,
    color: '#d8d3c7'
  })

  friendRequests.value = friendRequests.value.filter(request => request.id !== id)
}

const rejectRequest = (id: number) => {
  friendRequests.value = friendRequests.value.filter(request => request.id !== id)
}
</script>

<template>
  <div class="shared-page">
    <Sidebar />

    <main class="content">
      <h1>Geteilte Listen</h1>

      <div class="search-box">
        <input v-model="searchQuery" placeholder="Benutzer suchen" />
        <button @click="searchUser">🔍</button>
      </div>

      <div v-if="searchResult" class="search-result">
        <div class="user-info">
          <div class="avatar search-avatar">👤</div>
          <span>{{ searchResult.username }}</span>
        </div>

        <button @click="addFriend">Freund hinzufügen</button>
      </div>

      <h2>Freundschaftsanfragen</h2>

      <div
        v-for="request in friendRequests"
        :key="request.id"
        class="request-card"
      >
        <div class="user-info">
          <div class="avatar red">👤</div>
          <span>{{ request.username }}</span>
        </div>

        <div class="request-actions">
          <button @click="acceptRequest(request.id)">Annehmen</button>
          <button @click="rejectRequest(request.id)">Ablehnen</button>
        </div>
      </div>

      <div v-if="friendRequests.length === 0" class="empty-box">
        Keine offenen Freundschaftsanfragen.
      </div>

      <h2>Meine Freunde</h2>

      <div class="friends-grid">
        <div
          v-for="friend in friends"
          :key="friend.id"
          class="friend-card"
        >
          <div
            class="friend-avatar"
            :style="{ backgroundColor: friend.color }"
          >
            👤
          </div>
          <p>{{ friend.username }}</p>
        </div>
      </div>

      <h2>Geteilte Listen</h2>

      <div class="shared-grid">
        <div
          v-for="list in sharedLists"
          :key="list.id"
          class="shared-card"
          @click="openSharedList(list.name)"
        >
          <span class="list-icon">{{ list.icon }}</span>
          <h3>{{ list.name }}</h3>
          <p>{{ list.products }} Produkte</p>
          <small>geteilt von {{ list.sharedBy }}</small>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.shared-page {
  display: flex;
  min-height: 100vh;
  background-color: #f5f1ea;
}

.content {
  flex: 1;
  padding: 45px 55px;
  color: #8b4513;
}

h1 {
  font-size: 42px;
  margin-bottom: 35px;
}

h2 {
  font-size: 28px;
  margin: 35px 0 15px;
}

.search-box {
  display: flex;
  align-items: center;
  width: 330px;
  border: 2px solid #8b4513;
  background-color: #fffaf3;
  padding: 8px 12px;
  margin-bottom: 30px;
}

.search-box input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 20px;
  color: #8b4513;
  outline: none;
}

.search-box button {
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
}

.search-result {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fffaf3;
  border: 2px solid #8b4513;
  border-radius: 18px;
  padding: 14px 25px;
  max-width: 650px;
  margin-bottom: 30px;
}

.search-avatar {
  background-color: #b87464;
}

.search-result button {
  background-color: #8b4513;
  color: white;
  border: 2px solid #5f2c12;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 17px;
  cursor: pointer;
}

.request-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ded8cc;
  border-radius: 18px;
  padding: 14px 25px;
  max-width: 950px;
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 30px;
  font-size: 26px;
}

.avatar,
.friend-avatar {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.avatar {
  width: 70px;
  height: 70px;
  font-size: 34px;
}

.red {
  background-color: #c9182b;
}

.request-actions {
  display: flex;
  gap: 20px;
}

.request-actions button {
  background-color: #8b4513;
  color: white;
  border: 2px solid #5f2c12;
  border-radius: 10px;
  padding: 10px 18px;
  font-size: 17px;
  cursor: pointer;
}

.empty-box {
  padding: 18px;
  border: 2px solid #8b4513;
  border-radius: 14px;
  background-color: #fffaf3;
  max-width: 500px;
}

.friends-grid {
  display: flex;
  gap: 55px;
  margin-top: 25px;
}

.friend-card {
  text-align: center;
  font-size: 20px;
}

.friend-avatar {
  width: 115px;
  height: 115px;
  font-size: 58px;
  margin-bottom: 12px;
}

.shared-grid {
  display: flex;
  gap: 25px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.shared-card {
  width: 220px;
  padding: 20px;
  border: 2px solid #8b4513;
  border-radius: 18px;
  background-color: #fffaf3;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;
}

.shared-card:hover {
  transform: translateY(-5px);
  background-color: #f1e5d8;
}

.list-icon {
  font-size: 40px;
}

.shared-card h3 {
  font-size: 22px;
  margin: 12px 0 8px;
}

.shared-card p {
  font-size: 16px;
  margin: 5px 0;
}

.shared-card small {
  font-size: 14px;
}
</style>
