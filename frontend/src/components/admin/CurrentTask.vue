<script setup lang="ts">
  import { socket } from '@/socket';
  import { ref } from 'vue';

  interface Task {
    _id: string;
    task: string;
    storyPoints: number;
    deleted: boolean;
  }

  const nextTask = ref<Task|null>(null);
  
  socket.on('displayNextTask', (task) => {
    nextTask.value = task;
  })
</script>

<template>
  <div class="currentTasksContainer">
    <h2>Current task:</h2>
    <h3>{{ nextTask?.task }}</h3>
    <div v-if="nextTask">
      <div class="optionButtons">
        <button>1</button>
        <button>3</button>
        <button>5</button>
        <button>8</button>
        <button>?</button>
      </div>
      <button>Save</button>
    </div>
    <div v-else>
      <p>Start the voting by displaying the first task</p>
    </div>
  </div>
</template>

<style>
  .currentTasksContainer {
    margin: 20px auto;
    padding: 20px;
    width: 40vw;
    border: 1px solid red;
    text-align: center;
  }

  .optionButtons {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin: 10px;
  }
</style>