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
</style>