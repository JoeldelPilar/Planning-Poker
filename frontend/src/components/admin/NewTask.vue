<script setup lang="ts">
  import { socket } from '@/socket';
  import { ref } from 'vue';
  
  const newTaskDescription = ref("")

  function addNewTask(event: Event) {
    event.preventDefault();

    const newTask = {
      task: newTaskDescription.value,
      storyPoints: 0,
      deleted: false,
    };

    fetch('http://localhost:3000/tasks/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(task => {
      console.log('New task added:', task);
      socket.emit('newTask', task.task);
    })
    .catch(error => {
      console.error('Error adding new task:', error);
    });

    newTaskDescription.value = '';
  }
</script>

<template>
  <div class="addTaskForm">
    <form>
      <label for="newTaskInput" class="visually-hidden">Enter a new task</label>
      <input v-model="newTaskDescription" type="text" name="newTaskInput" placeholder="Task description">
      <button type="submit" @click="addNewTask">Submit task</button>
    </form>
  </div>
</template>
  
<style>
  .addTaskForm {
    display: flex;
    align-items: center;
    margin: 20px;
  }

  .visually-hidden {
    position: absolute;
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0,0,0,0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
</style>