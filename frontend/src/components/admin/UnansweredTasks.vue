<script setup lang="ts">
  import { socket } from '@/socket';
  import { ref } from 'vue';

  interface Task {
    _id: string;
    task: string;
    storyPoints: number;
    deleted: boolean;
  }

  const tasksArray = ref<Task[]>([]);

  function fetchTasks() {
    fetch('http://localhost:3000/tasks')
    .then(response => {
      console.log('Response:', response);
      return response.json();
    })
    .then(tasks => {
      const filteredTasks = tasks.filter((task: any) => task.storyPoints === 0 && task.deleted === false);
      tasksArray.value = filteredTasks;
      console.log(filteredTasks)
    })
    .catch(error => {
      console.error('Error fetching tasks:', error);
    });
  }

  socket.on('updateList', () => {
    fetchTasks();
  });

  fetchTasks();
</script>

<template>
  <div class="unansweredTasksContainer">
    <h2 class="adminCenter">To be voted on:</h2>
    <ul>
      <li v-for="(task, index) in tasksArray" :key="index">{{ task.task }}</li>
    </ul>
  </div>
</template>

<style>
  .unansweredTasksContainer {
    width: 40vw;
    padding: 20px;
    border: 1px solid green;
  }

  .adminCenter {
    text-align: center;
  }
</style>