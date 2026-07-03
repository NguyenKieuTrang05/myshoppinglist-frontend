<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}
const goToLogin = () => {
  router.push('/login')
}
</script>

<template>
  <div class="register-page">
    <button class="back-button" @click="goBack">‹</button>

    <section class="register-content">
      <h1>Registriere dich bei uns.</h1>
      <p>Plane deine Einkäufe einfach und übersichtlich.</p>

      <form class="form">
        <div class="left-side">
          <label>E-Mail Adresse</label>
          <input type="email" placeholder="E-Mail Adresse" />

          <label>Passwort</label>
          <input type="password" placeholder="Passwort" />

          <div class="row">
            <div>
              <label>Name</label>
              <input type="text" placeholder="Name" />
            </div>

            <div>
              <label>Benutzername</label>
              <input type="text" placeholder="Benutzername" />
            </div>
          </div>
        </div>

        <div class="right-side">
          <label>Geburtstag</label>

          <div class="birthday-row">
            <input type="text" placeholder="Tag" />
            <input type="text" placeholder="Monat" />
            <input type="text" placeholder="Jahr" />
          </div>
        </div>
      </form>

      <button class="create-button" @click="goToLogin">
        Neues Konto erstellen
      </button>
    </section>
  </div>
</template>

<style scoped>
.register-page {
  min-height: 100vh;
  height: 100vh;
  background-color: #f5f1ea;
  padding: 35px 70px;
  color: #8b4513;
  font-family: Arial, sans-serif;
  overflow-y: auto;
}

.back-button {
  background: none;
  border: none;
  color: #8b4513;
  font-size: 70px;
  cursor: pointer;
}

.register-content {
  margin-top: 30px;
}

h1 {
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 15px;
}

p {
  font-size: 28px;
  margin-bottom: 55px;
}

.form {
  display: flex;
  justify-content: space-between;
  gap: 50px;
}

.left-side {
  width: 60%;
}

.right-side {
  width: 35%;
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

.row {
  display: flex;
  gap: 25px;
}

.row div {
  flex: 1;
}

.birthday-row {
  display: flex;
  gap: 18px;
}

.birthday-row input {
  width: 33%;
}

.create-button {
  float: right;
  margin-top: 50px;
  background-color: #8b4513;
  color: white;
  border: 2px solid #3d2a21;
  border-radius: 10px;
  padding: 24px 50px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 900px) {
  .form {
    flex-direction: column;
  }

  .left-side,
  .right-side {
    width: 100%;
  }

  .row {
    flex-direction: column;
  }

  .create-button {
    float: none;
    width: 100%;
  }
}
</style>
