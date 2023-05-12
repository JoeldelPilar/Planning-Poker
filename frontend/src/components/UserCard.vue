<script setup lang="ts">
import { socket } from '@/socket'

const signedInUser = localStorage.getItem('user')
console.log('signedInUser', signedInUser)

const fibonacci = defineProps({
  fibonacciValue: String
})
let vote = null

function readCardValue() {
  console.log(fibonacci.fibonacciValue)
  vote = fibonacci.fibonacciValue
  console.log('vote', vote)
  socket.emit('vote', { user: signedInUser, vote: vote })
}

socket.on('clearResults', () => {
  vote = null
})
</script>

<template>
  <button class="optionCard" @click.prevent="readCardValue()">
    <span>{{ fibonacci.fibonacciValue }}</span>
  </button>
</template>

<style scoped>
button {
  transition: all 0.2s ease-in-out;
  width: 150px;
  height: 200px;
  border-radius: 10px;
  background-color: #f9f7f5;
  list-style: none;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  text-align: center;
  line-height: 200px;
  font-size: 2rem;
  border: none;
}

button:hover {
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 25px;
  cursor: pointer;
  margin-top: -5px;
}

button:disabled {
  background-color: rgb(190, 190, 190);
  cursor: not-allowed;
  margin-top: 0;
}
</style>
