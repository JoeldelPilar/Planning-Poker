<script setup lang="ts">

import router from '@/router'
import { userState } from '@/sockets/userSocket'
import { socket } from '@/socket'
import { ref } from 'vue'

const username = ref('')
const msgToUser = ref('')

function connectUser() {
  if (!username.value) {
    msgToUser.value = 'Enter a user name'
    return
  }
  if (username.value === 'admin') {
    router.push('/admin')
  } else {
    socket.emit('user-join', username.value)
    router.push("/usercard");
  }
  console.log('state: ', userState.users)
}

</script>

<template>
  <section class="enter-card">
    <h1>Poker Planner</h1>
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
  padding-block: 5rem;
  padding-inline: 3rem;
  border: none;
  border-radius: 1rem 1rem 0rem 1rem;
  background-color: #06928e;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.219);
}
h1 {
  position: absolute;
  top: 2rem;
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

button {
  padding-block: 0.25rem;
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
