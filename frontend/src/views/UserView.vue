<script setup lang="ts">
import PreviousTask from '@/components/PreviousTask.vue'
import UsercardView from '../components/UserCard.vue'
import ResultCard from '@/components/ResultCard.vue'
import UserTask from '@/components/UserTask.vue'
import { socket } from '@/socket'
import { ref } from 'vue'

const fibonaccis = ['1', '3', '5', '8', '?']

const task = ref('')

function displayTask() {
  socket.on('displayNextTask', (nextTask) => {
    console.log('nextTask', nextTask)
    const displayTask = nextTask.task
    console.log('displayTask', displayTask)
    task.value = displayTask
  })
}

const signedInUser = localStorage.getItem('user')
console.log('signedInUser', signedInUser)

displayTask()
</script>

<template>
  <main>
    <PreviousTask class="previous-container" />
    <div class="task-container">
      <UserTask :task="task"></UserTask>
    </div>
    <aside class="result-container">
      <ResultCard />
    </aside>
    <div class="cards-container">
      <UsercardView
        v-for="(fibonacci, index) in fibonaccis"
        :key="index"
        :fibonacci-value="fibonacci"
        :disabled="task.length == 0"
      />
    </div>
  </main>
</template>

<style scoped>
.previous-container {
  background-color: antiquewhite;
}
.task-container {
  margin: auto;
  max-width: 300px;
  padding: 5px 20px;
  border-radius: 10px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
}

.cards-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 50px;
}

.result-container {
  display: flex;
  justify-content: end;
}
</style>
