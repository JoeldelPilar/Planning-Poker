<script setup lang="ts">
  import NewTask from '../components/admin/NewTask.vue'
  import CurrentTask from '../components/admin/CurrentTask.vue'
  import UnansweredTasks from '../components/admin/UnansweredTasks.vue'
  import AnsweredTasks from '../components/admin/AnsweredTasks.vue'
</script>

<template>
  <main>
    <NewTask />
    <CurrentTask />
    <div class="tasksContainer">
      <UnansweredTasks />
      <AnsweredTasks />
    </div>
  </main>
</template>

<style>
  .tasksContainer {
    display: flex;
    justify-content: space-around;
  }
</style>