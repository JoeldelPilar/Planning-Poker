<script setup lang="ts">
    import router from '@/router';
import { ref } from 'vue';
    
    const username = ref("")

    function connectUser() {
        console.log("hej");
        console.log(username.value);
        
        if (username.value === "admin") {
            router.push("/admin");
        } else {
            return;
        }
    }
</script>

<template>
<main>
    <div class="user-container">
        <form @submit.prevent="connectUser()">
            <label for="username-input" class="visually-hidden">Enter username</label>
            <input v-model="username" type="text" name="username-input" placeholder="Username">
            <button type="submit">Join</button>
        </form>
    </div>
</main>
</template>

<style>
    .user-container {
        padding: 20px 200px;
        background-color: antiquewhite;
    }

    form {
        display: flex;
        gap: 1rem;
        flex-direction: column;
    }

.visually-hidden {
    position: absolute;
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0,0,0,0) !important;
    white-space: nowrap !important;
    border: 0 !important;
}
</style>