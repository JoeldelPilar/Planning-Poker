<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Start</RouterLink>
      <RouterLink to="/admin">Admin</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
body {
  font-family: Inter;
  background-color: #3f3f3f;
}
</style>
