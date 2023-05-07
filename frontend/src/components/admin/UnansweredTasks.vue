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

  function moveTaskUp(index: number) {
    const task = tasksArray.value[index];
    tasksArray.value[index] = tasksArray.value[index - 1];
    tasksArray.value[index - 1] = task;
  }

  function moveTaskDown(index: number) {
    const task = tasksArray.value[index];
    tasksArray.value[index] = tasksArray.value[index + 1];
    tasksArray.value[index + 1] = task;
  }

  socket.on('updateList', () => {
    fetchTasks();
  });

  fetchTasks();
</script>

<template>
  <div class="unansweredTasksContainer">
    <h2 class="adminCenter">To be voted on:</h2>
    <ul class="newTasks">
      <li class="listHeader">
        <div class="taskName">Task description</div>
        <div class="taskOrder">Next task to be displayed</div>
      </li>
      <li v-for="(task, index) in tasksArray" :key="index" class="unansweredTask">
        <div class="taskName">{{ task.task }}</div>
        <div class="taskOrder">
          <button :disabled="index === tasksArray.length - 1" @click="moveTaskDown(index)">
            <i class="fa-solid fa-arrow-down-long"></i>
          </button>
          {{ index + 1 }}
          <button :disabled="index === 0" @click="moveTaskUp(index)">
            <i class="fa-solid fa-arrow-up-long"></i>
          </button>
        </div>
      </li>
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

  .newTasks {
    padding-left: 0;
  }

  .listHeader {
    font-weight: bold;
  }

  .unansweredTask, .listHeader {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    padding: 10px;
    border-bottom: 2px solid whitesmoke;
  }

  .taskName {
    grid-column: 1;
  }

  .taskOrder {
    grid-column: 2;
    text-align: right;
  }

  .taskOrder button {
    margin: 0px 10px;
  }
</style>