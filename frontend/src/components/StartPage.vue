<script setup lang="ts">
import router from '@/router'
import User from '@/models/UserModel'
import { socket } from '@/socket'
import { ref } from 'vue'
import { userState } from '@/sockets/userSocket'

const username = ref('')
const msgToUser = ref('')

function connectUser() {
  //Vill vi kolla om localStorage har ett användarnamn och direkt pusha till user sidan?
  const usernameRegex = /^[a-zA-Z]+$/

  if (!usernameRegex.test(username.value)) {
    msgToUser.value = 'Enter a user name, letters a-z.'
    return
  }
  if (username.value === 'admin') {
    router.push('/admin')
    socket.emit('adminJoin')
  } else {
    const user = new User('', username.value)
    socket.emit('user-join', user)
    router.push('/usercard')
  }

  localStorage.setItem('user', username.value)
  console.log(userState)
}
</script>

<template>
  <section class="enter-card">
    <h1>Planning Poker</h1>
    <form @submit.prevent="connectUser()">
      <label for="username-input" class="visually-hidden">Enter username</label>
      <input v-model="username" type="text" name="username-input" placeholder="Username" />
      <button type="submit">Join</button>
    </form>
    <span>{{ msgToUser }}</span>
  </section>
</template>

<style scoped>
.enter-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-block: 4rem;
  padding-inline: 5rem;
  border: none;
  border-radius: 1rem 1rem 0rem 1rem;
  background-color: #06928e;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.219);
}
h1 {
  font-size: 2.4rem;
  margin-inline: 0 auto;
  width: fit-content;
}
.user-container {
  padding: 2rem;
}

form {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

input {
  padding: 0.9rem 2rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #f9f7f5;
}

button {
  padding: 15px 50px;
  margin: auto;
  margin-top: 0.9rem;
}

button:hover {
  cursor: pointer;
}

.visually-hidden {
  position: absolute;
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
