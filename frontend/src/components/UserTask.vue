<script setup lang="ts">
    defineProps ({
        task: String
    })

</script>

<template>
    <p>{{ task }}</p>
</template>

<style scoped>
  p {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 2rem;
  }
</style>