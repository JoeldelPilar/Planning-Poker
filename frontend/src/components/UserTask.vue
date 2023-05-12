<script setup lang="ts">
defineProps({
  task: String
})
</script>

<template>
  <p>{{ task }}</p>
</template>

<style scoped>
p {
  font-size: 2rem;
}
</style>
