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
  const selectedStoryPoints = ref<number>(1);
  
  socket.on('displayNextTask', (task) => {
    nextTask.value = task;
  })

  function setStoryPoints(points: number): void {
    selectedStoryPoints.value = points;
  }

  function saveStoryPoints() {
    const taskId = nextTask.value?._id;
    
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ storyPoints: selectedStoryPoints.value }),
    })
    .then(() => {
      console.log('Task updated successfully')
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
</script>

<template>
  <div class="currentTasksContainer">
    <h2>Current task:</h2>
    <h3>{{ nextTask?.task }}</h3>
    <div v-if="nextTask">
      <div class="optionButtons">
        <button @click="setStoryPoints(1)">1</button>
        <button @click="setStoryPoints(3)">3</button>
        <button @click="setStoryPoints(5)">5</button>
        <button @click="setStoryPoints(8)">8</button>
        <button>?</button>
      </div>
      <button @click="saveStoryPoints">Save</button>
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