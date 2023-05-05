<script setup lang="ts">
    const fibonacci = defineProps ({
        fibonacciValue: String
    })
</script>

<template>
    <li class="optionCard"><span>{{ fibonacci.fibonacciValue }}</span></li>
</template>

<style scoped>
   li {
        width: 50px;
        height: 100px;
        background-color: aquamarine;
   }
</style>