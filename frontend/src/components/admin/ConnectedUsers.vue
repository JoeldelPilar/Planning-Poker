<template>
  <div>
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
  background-color: white;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid whitesmoke;
  color: black;
}
</style>
