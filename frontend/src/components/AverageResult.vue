<script setup lang="ts">
const votes = [1, 8, 3, 8, 5, 1];

function calculateFibonacciAverage(votes: number[]) {
  // Calculate the avareage number of votes
  const average = votes.reduce((sum, vote) => sum + vote, 0) / votes.length;
  
  // Find nearest Fibonacci-number
  let prev = 1;
  let current = 1;
  while (current <= average) {
    const next = prev + current;
    prev = current;
    current = next;
  }
  const nearestFibonacci = (current - average) < (average - prev) ? current : prev;
  
  return nearestFibonacci;
}

const averageNumber = calculateFibonacciAverage(votes);
console.log("Medeltal" + averageNumber);

</script>

<template>
  <div class="average-result">
    <span>{{ averageNumber }}</span>
  </div>
</template>

<style>
  .average-result {
    width: 5vw;
    padding: 1rem;
    border: 1px solid lightblue;
  }
</style>