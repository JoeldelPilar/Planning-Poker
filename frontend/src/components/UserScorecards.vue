<script setup lang="ts">
import { socket } from '@/socket'
import { ref } from 'vue'

const showVotes = ref<boolean>(false)

defineProps({
  name: String,
  storyPoints: String
})

socket.on('average', () => {
  showVotes.value = true
})

socket.on('displayNextTask', () => {
  showVotes.value = false
})
</script>

<template>
  <div class="userScorecard">
    <div v-if="showVotes === false">
      {{ name }}
    </div>
    <div v-if="showVotes === true">
      {{ name }}<br /><span>{{ storyPoints }}</span>
    </div>
  </div>
</template>

<style>
.userScorecard {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: #06928e;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-size: 1.5rem;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  margin-top: 80px;
}
</style>
