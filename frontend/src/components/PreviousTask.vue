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
  text-align: center;
}

h3 {
  letter-spacing: 1.5px;
  font-weight: 700;
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
