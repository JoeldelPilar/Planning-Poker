<script setup lang="ts">
  defineProps({
    name: String,
    storyPoints: String
  })
</script>

<template>
  <div class="userScorecard">
    {{ name }} <span>{{ storyPoints }}</span>
  </div>
</template>

<style>
  .userScorecard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-size: 1.5rem;
    width: 150px;
    height: 200px;
    border-radius: 10px;
  }
</style>