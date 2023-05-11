<template>
  <div>
    <li class="listHeader">
        <div class="taskName"><h3>Name</h3></div>
        <div class="taskOrder"><h3>Story points</h3></div>
      </li>
    <li>
      {{ name }} <span>{{ storyPoints }}</span>
    </li>
  </div>
</template>

<script setup lang="ts">
defineProps({
  name: String,
  storyPoints: String
})
</script>

<style scoped>

li {
  list-style: none;
  /* background-color: #F9F7F5; */
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px;
  margin: auto;
  border-bottom: 2px solid whitesmoke;
  border-radius: 0.2rem;
  font-size: 1.1rem;
}
</style>
