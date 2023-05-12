<script setup lang="ts">
import { socket } from '@/socket'
import { ref, watchEffect } from 'vue'

interface Task {
  _id: string
  task: string
  storyPoints: number
  deleted: boolean
}

const tasksArray = ref<Task[]>([])
const disabledButton = ref(false)

watchEffect(() => {
  const ul = document.querySelector('.newTasks')
  if (ul) {
    ul.innerHTML = ul.innerHTML
  }
})

function fetchTasks() {
  fetch('http://localhost:3000/tasks')
    .then((response) => response.json())
    .then((tasks) => {
      const filteredTasks = tasks.filter(
        (task: any) => task.storyPoints === 0 && task.deleted === false
      )

      const taskOrder = JSON.parse(localStorage.getItem('taskOrder') || '[]')

      const sortedTasks = taskOrder
        .map((taskId: string) => {
          const task = filteredTasks.find((task: Task) => task._id === taskId)
          return task
        })
        .filter(Boolean)

      const newTask = filteredTasks.filter((task: Task) => !sortedTasks.includes(task))
      sortedTasks.push(...newTask)

      tasksArray.value = sortedTasks

      localStorage.setItem('taskOrder', JSON.stringify(sortedTasks.map((task: Task) => task._id)))
    })
    .catch((error) => {
      console.error('Error fetching tasks:', error)
    })
}

function moveTaskUp(index: number) {
  const task = tasksArray.value[index]
  tasksArray.value[index] = tasksArray.value[index - 1]
  tasksArray.value[index - 1] = task
  localStorage.setItem('taskOrder', JSON.stringify(tasksArray.value.map((task: Task) => task._id)))
}

function moveTaskDown(index: number) {
  const task = tasksArray.value[index]
  tasksArray.value[index] = tasksArray.value[index + 1]
  tasksArray.value[index + 1] = task
  localStorage.setItem('taskOrder', JSON.stringify(tasksArray.value.map((task: Task) => task._id)))
}

function displayNextTask() {
  socket.emit('nextTask', tasksArray.value[0])
  disabledButton.value = true
}

socket.on('displayNextTask', () => {
  tasksArray.value.splice(0, 1)
})

socket.on('returnQuestionToList', (task: Task) => {
  const taskToMove = task
  tasksArray.value.push(taskToMove)
  localStorage.setItem('taskOrder', JSON.stringify(tasksArray.value.map((t: Task) => t._id)))
})

socket.on('updateList', () => {
  fetchTasks()
})

socket.on('clearNewTasks', () => {
  tasksArray.value = []
  localStorage.removeItem('taskOrder')
})

socket.on('votingResults', () => {
  disabledButton.value = false
})

fetchTasks()
</script>

<template>
  <div class="unansweredTasksContainer">
    <h2 class="adminCenter">To be voted on:</h2>
    <ul class="newTasks">
      <li class="listHeader">
        <div class="taskName"><h3>Task description</h3></div>
        <div class="taskOrder"><h3>Next task to be displayed</h3></div>
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
    <div class="adminCenter">
      <button @click="displayNextTask" class="nextTaskButton" :disabled="disabledButton === true">
        Display next task
      </button>
    </div>
  </div>
</template>

<style>
h3 {
  font-size: 1.3rem;
}
.unansweredTasksContainer {
  width: 40vw;
  padding: 20px;
  background-color: #06928e;
  border-radius: 0.5rem;
}

.adminCenter {
  text-align: center;
  text-decoration: underline;
  font-size: 1.8rem;
}

.newTasks {
  padding-left: 0;
}

.listHeader {
  font-weight: bold;
}

.unansweredTask,
.listHeader {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid whitesmoke;
}

.taskName {
  grid-column: 1;
  font-size: 1.2rem;
}

.taskOrder {
  grid-column: 2;
  text-align: right;
}

.taskOrder button {
  margin: 0px 10px;
  cursor: pointer;
}

.nextTaskButton {
  margin: auto;
  margin-bottom: 0;
  padding: 0.8rem;
  cursor: pointer;
  font-size: 1.2rem;
}

.taskOrder button:hover {
  background-color: lightcyan;
}

.nextTaskButton:hover {
  background-color: lightcyan;
  transition: all 0.2s ease-in-out;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 25px;
}
</style>
