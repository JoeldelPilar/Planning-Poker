<script setup lang="ts">

import PreviousTask from '@/components/PreviousTask.vue'
import UsercardView from '../components/UserCard.vue'
import ResultCard from '@/components/ResultCard.vue'
import UserTask from '@/components/UserTask.vue'
import { socket } from '@/socket'
import { ref } from 'vue'
  
const fibonaccis = ["1", "3", "5", "8", "?"];

const task = ref("");


  const disabledCards = ref(true)

  function displayTask() {
    socket.on("displayNextTask", (nextTask) => {
        console.log("nextTask", nextTask);
        const displayTask = nextTask.task;
        console.log("displayTask", displayTask);
        task.value = displayTask;
        disabledCards.value = false;
    })
  }

  socket.on("disableBtn", () => {
    disabledCards.value = true;
  })


const signedInUser = localStorage.getItem('user');
console.log('signedInUser', signedInUser);

displayTask();

socket.on('redirectToStartingpage', (startingpage) => {
  window.location.href = startingpage;
  localStorage.removeItem('user');
});

</script>

<template>
  <main>
    <div class="task-container">
      <UserTask :task="task"></UserTask>
    </div>

    <section class="voting-stats-container">
      <PreviousTask class="previous-container" />
      <aside class="result-container">
        <ResultCard />
      </aside>
    </section>
    <div class="cards-container">
      <UsercardView
        v-for="(fibonacci, index) in fibonaccis"
        :key="index"
        :fibonacci-value="fibonacci"
        :disabled="disabledCards === true"

      />
    </div>
  </main>
</template>

<style scoped>
    .voting-stats-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 100px;
  }
  .task-container {
    margin: auto;
    margin-top: 100px;
    min-height: 50px;
    max-width: 300px;
    padding: 5px 20px;
    border-radius: 10px;
    background-color: #F9F7F5;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    text-align: center;
  }

.cards-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  gap: 50px;
}
</style>
