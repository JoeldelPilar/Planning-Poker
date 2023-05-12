<template>
  <aside class="previous-task-component-container">
    <h3>Previous voting</h3>
    <div class="previous-task-result">
      <span> {{ previousTask.taskDescription }} </span>
      <span class="story-point"> {{ previousTask.storyPoints }} </span>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { socket } from '@/socket'
import { ref } from 'vue'

const previousTask = ref({
  taskDescription: null,
  storyPoints: null
})

socket.on('votingResults', (results) => {
  const lastTask = results.slice(-1)[0]

  previousTask.value = lastTask
})
</script>

<style scoped>
.previous-task-component-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #06928e;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 1.2rem;
  max-width: 350px;
  border-radius: 10px;
  margin-left: 80px;
  margin-top: 10px;
  padding: 10px;
}

h3 {
  letter-spacing: 1.5px;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
  text-decoration: underline;
}

.previous-task-result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.story-point {
  font-size: 32px;
}
</style>
