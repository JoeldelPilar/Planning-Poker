<script setup lang="ts">
import NewTask from '../components/admin/NewTask.vue'
import CurrentTask from '../components/admin/CurrentTask.vue'
import UnansweredTasks from '../components/admin/UnansweredTasks.vue'
import AnsweredTasks from '../components/admin/AnsweredTasks.vue'
import EndSession from '@/components/admin/EndSession.vue'
import ConnectedUsers from '@/components/admin/ConnectedUsers.vue'
import { userState } from '@/sockets/userSocket'
import { ref, watchEffect } from 'vue'
import { socket } from '@/socket'

const connectedUsers = ref(userState.users)

watchEffect(() => {
  connectedUsers.value = userState.users
})

let averageNumber = ref<number | null>(null)

socket.on('average', (average: number) => {
  console.log(`Medelvärdet är ${average}`)
  averageNumber.value = average
})

socket.on('redirectToStartingpage', (startingpage) => {
  window.location.href = startingpage
  localStorage.removeItem('user')
})
</script>

<template>
  <main class="admin">
    <NewTask />
    <CurrentTask />
    <div class="tasksContainer">
      <UnansweredTasks />
      <div class="connectedUsers-container">
        <h2 class="adminCenter">Connected users:</h2>
        <ul class="connectedUsers-ul">
          <li class="listHeader">
            <div class="taskName"><h3>Name</h3></div>
            <div class="taskOrder"><h3>Story points</h3></div>
          </li>
          <ConnectedUsers
            v-for="{ id, name, storyPoints } in connectedUsers"
            :key="id"
            :name="name"
            :story-points="storyPoints"
          />
        </ul>
        <span class="average-result">Avarage Story Point: {{ averageNumber }}</span>
      </div>
      <AnsweredTasks />
    </div>
    <EndSession />
  </main>
</template>

<style>
.connectedUsers-container {
  display: flex;
  flex-direction: column;
  width: 30vw;
  padding: 20px;
  background-color: #06928e;
  border-radius: 0.5rem;
}

.connectedUsers-ul {
  padding: 0;
}

.tasksContainer {
  display: flex;
  justify-content: space-around;
  max-width: 95vw;
  gap: 1.5rem;
  margin: auto;
  margin-top: 4rem;
}

.admin {
  color: #060c0c;
}

.average-result {
  background-color: #f9f7f5;
  padding: 0.8rem;
  font-size: 1.2rem;
  width: 90%;
  margin: auto;
  border-radius: 0.2rem;
  margin-bottom: 0;
}
</style>
