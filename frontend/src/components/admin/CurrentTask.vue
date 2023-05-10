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
  const selectedStoryPoints = ref<number|null>(null);
  const showResult = ref<boolean>(false);
  
  socket.on('displayNextTask', (task) => {
    showResult.value = false;
    selectedStoryPoints.value = null;
    nextTask.value = task;
  })

  function setStoryPoints(points: number): void {
    selectedStoryPoints.value = points;
  }

  function saveStoryPoints() {
    const taskId = nextTask.value?._id;
    const taskDescription = nextTask.value?.task;

    if (selectedStoryPoints.value === 0) {
      socket.emit('returnCurrentQuestion', nextTask.value);
      showResult.value = true;
    } else {
      fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storyPoints: selectedStoryPoints.value }),
      })
      .then(() => {
        showResult.value = true;
        socket.emit('adminVote', { taskDescription: taskDescription, storyPoints: selectedStoryPoints.value });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  }
</script>

<template>
  <div class="currentTasksContainer">
    <h2>Current task:</h2>
    <div v-if="nextTask">
      <div v-if="!showResult">
        <h3>{{ nextTask.task }}</h3>
        <div class="optionButtons">
          <button :class="{ activeOption: selectedStoryPoints === 1 }" @click="setStoryPoints(1)">1</button>
          <button :class="{ activeOption: selectedStoryPoints === 3 }" @click="setStoryPoints(3)">3</button>
          <button :class="{ activeOption: selectedStoryPoints === 5 }" @click="setStoryPoints(5)">5</button>
          <button :class="{ activeOption: selectedStoryPoints === 8 }" @click="setStoryPoints(8)">8</button>
          <button :class="{ activeOption: selectedStoryPoints === 0 }" @click="setStoryPoints(0)">?</button>
        </div>
        <button @click="saveStoryPoints">Save</button>
      </div>
      <div v-if="showResult">
        <p v-if="selectedStoryPoints !== 0">Your vote has been saved</p>
        <p v-if="selectedStoryPoints === 0">The task was returned to the voting backlog</p>
      </div>
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

  .activeOption {
    background-color: #A6F4FF;
  }
</style>