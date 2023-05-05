<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Start</RouterLink>
      <RouterLink to="/admin">Anppdmin</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
