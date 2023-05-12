<script setup lang="ts">
import { socket } from '@/socket'
import { ref } from 'vue'

interface Task {
  taskDescription: string
  storyPoints: number
}

const votingResults = ref<Task[]>([])

socket.on('votingResults', (results) => {
  votingResults.value = results
})
</script>

<template>
  <div class="answeredTasksContainer">
    <h2 class="adminCenter">Voting results:</h2>
    <ul class="votingList">
      <li class="listHeader">
        <div><h3>Task description</h3></div>
        <div><h3>Story points</h3></div>
      </li>
      <li class="votingResult" v-for="(result, index) in votingResults" :key="index">
        <div class="description">
          {{ result.taskDescription }}
        </div>
        <div class="points">
          {{ result.storyPoints }}
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
.answeredTasksContainer {
  width: 40vw;
  padding: 20px;
  background-color: #06928e;
  border-radius: 0.5rem;
}

.votingList {
  padding-left: 0;
}

.votingResult {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid whitesmoke;
}
</style>
