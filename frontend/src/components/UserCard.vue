<script setup lang="ts">
    const fibonacci = defineProps ({
        fibonacciValue: String
    })

    function readCardValue() {
        console.log(fibonacci.fibonacciValue);
    }
</script>

<template>
    <li 
        class="optionCard"
        @click.prevent="readCardValue()"
        ><span>{{ fibonacci.fibonacciValue }}</span>
    </li>
</template>

<style scoped>
   li {
        transition: all 0.4s ease-in-out;
        width: 150px;
        height: 200px;
        border-radius: 10px;
        background-color: rgb(255, 255, 255);
        list-style: none;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        text-align: center;
        line-height: 200px;
        font-size: 2rem;
   }

   li:hover {
        transition: all 0.4s ease-in-out;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 10px 25px;
        cursor: pointer;
        margin-top: -5px;
   }
</style>