<script setup lang="ts">
import { socket } from '@/socket'
import { ref } from 'vue'

// socket.emit('vote', { user: "erik", storyPoints: 8 });

let averageNumber = ref<number | null>(null)

socket.on('average', (average: number) => {
  console.log(`Medelvärdet är ${average}`)
  averageNumber.value = average
})

socket.on('clearResult', () => {
  averageNumber.value = null
})
</script>

<template>
  <div class="result-card">
    <h3>Average</h3>
    <span>{{ averageNumber }}</span>
  </div>
</template>

<style scoped>
.result-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #06928e;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 1.5rem;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  margin-right: 80px;
}

h3 {
  font-size: 1.5rem;
}

span {
  font-size: 2rem;
}
</style>
