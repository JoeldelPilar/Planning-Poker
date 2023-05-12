<script setup lang="ts">
import { socket } from '@/socket'
import { ref } from 'vue'

const newTaskDescription = ref('')

function addNewTask(event: Event) {
  event.preventDefault()

  const newTask = {
    task: newTaskDescription.value,
    storyPoints: 0,
    deleted: false
  }

  fetch('http://localhost:3000/tasks/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })
    .then((response) => response.json())
    .then((task) => {
      console.log('New task added:', task)
      socket.emit('newTask', task.task)
    })
    .catch((error) => {
      console.error('Error adding new task:', error)
    })

  newTaskDescription.value = ''
}
</script>

<template>
  <div class="addTaskForm">
    <form>
      <label for="newTaskInput" class="visually-hidden">Enter a new task</label>
      <input
        v-model="newTaskDescription"
        type="text"
        name="newTaskInput"
        placeholder="Task description"
      />
      <button type="submit" @click="addNewTask">Submit task</button>
    </form>
  </div>
</template>

<style scoped>
.addTaskForm {
  display: flex;
  align-items: center;
  margin: 20px;
}

button {
  background-color: #f9f7f5;
  border: none;
  padding: 0.4rem;
  border-radius: 0.2rem;
  margin-left: 0.4rem;
}

button:hover {
  background-color: lightcyan;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 25px;
  cursor: pointer;
}

input {
  padding: 0.4rem 1.5rem;
  border: none;
  border-radius: 0.2rem;
  background-color: #f9f7f5;
}

.visually-hidden {
  position: absolute;
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
</style>
