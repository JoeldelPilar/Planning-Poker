<script setup lang="ts">
  import UsercardView from '../components/UserCard.vue'

  const fibonaccis = ["1", "3", "5", "8", "?"];
</script>

<template>
  <ul>  
    <UsercardView v-for="(fibonacci, index) in fibonaccis" :key="index" :fibonacci-value="fibonacci"/>
  </ul>
</template>

<style scoped>
   ul {
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 50px;
    margin-top: 15%;
   }
</style>