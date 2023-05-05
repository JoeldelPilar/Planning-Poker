<script setup lang="ts">
import StartPage from '../components/StartPage.vue'

const validate: boolean = true
</script>

<template>
  <main>
    <StartPage />
    <h1 v-if="validate">hej</h1>
  </main>
</template>
