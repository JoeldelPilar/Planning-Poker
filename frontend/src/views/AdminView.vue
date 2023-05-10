<script setup lang="ts">
  import NewTask from '../components/admin/NewTask.vue';
  import CurrentTask from '../components/admin/CurrentTask.vue';
  import UnansweredTasks from '../components/admin/UnansweredTasks.vue';
  import AnsweredTasks from '../components/admin/AnsweredTasks.vue';
  import EndSession from '@/components/admin/EndSession.vue';
  import AverageResult from '@/components/AverageResult.vue';
  import ConnectedUsers from '@/components/admin/ConnectedUsers.vue';
  import { userState } from '@/sockets/userSocket';
  import { ref, watchEffect } from 'vue';
  import { socket } from '@/socket';

  const connectedUsers = ref(userState.users);

  watchEffect(() => {
    connectedUsers.value = userState.users;
  });

  let averageNumber = ref<number | null>(null);

  socket.on('average', (average: number) => {
    console.log(`Medelvärdet är ${average}`);
    averageNumber.value = average;
  });

  socket.on('redirectToStartingpage', (startingpage) => {
    window.location.href = startingpage;
    localStorage.removeItem('user');
  });
</script>

<template>
  <main class="admin">
    <NewTask />
    <CurrentTask />
    <div class="tasksContainer">
      <UnansweredTasks />
      <div>
        <ul class="connectedUsers-container">
          <ConnectedUsers
            v-for="{ id, name, storyPoints } in connectedUsers"
            :key="id"
            :name="name"
            :story-points="storyPoints"
          />
        </ul>
        <span>Avarage Story Point: {{ averageNumber }}</span>
      </div>
      <AnsweredTasks />
    </div>
    <EndSession />
  </main>
</template>

<style>
.connectedUsers-container {
  display: flex;
  flex-direction: column;
  width: 40vw;
  padding: 20px;
  border: 1px solid blue;
}

.tasksContainer {
  display: flex;
  justify-content: space-around;
}

.admin {
  color: white;
}
</style>
