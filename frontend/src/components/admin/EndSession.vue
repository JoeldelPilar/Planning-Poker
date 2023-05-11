<script setup lang="ts">
  import { socket } from '@/socket';

  function endSession() {
    fetch("http://localhost:3000/tasks/endSession", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      socket.emit('clearVotingResults')
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
</script>

<template>
  <div class="endSession">
    <button @click="endSession">End session</button>
  </div>
</template>
  
<style>
  .endSession {
    position: fixed;
    top: 20px;
    right: 20px;
  }

  button {
    background-color: #F9F7F5;
    border: none;
    padding: 0.4rem;
    border-radius: 0.2rem;
    margin-left: 0.4rem;
  }
</style>