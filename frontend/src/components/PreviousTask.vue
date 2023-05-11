<template>
  <aside>
    <span>
      {{ previousTask.taskDescription }}
    </span>
    {{ previousTask.storyPoints }}
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

<style scoped></style>
