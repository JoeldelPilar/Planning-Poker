<script setup lang="ts">
  import { ref } from 'vue';
  
  const newTaskDescription = ref("")

  function addNewTask(event: Event) {
    event.preventDefault();
    console.log(newTaskDescription.value);
    newTaskDescription.value = '';
  }
</script>

<template>
  <div class="addTaskForm">
    <form>
      <label for="newTaskInput" class="visually-hidden">Enter a new task</label>
      <input v-model="newTaskDescription" type="text" name="newTaskInput" placeholder="Task description">
      <button type="submit" @click="addNewTask">Add</button>
    </form>
  </div>
</template>
  
<style>
  .addTaskForm {
    min-height: 100vh;
    display: flex;
    align-items: center;
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