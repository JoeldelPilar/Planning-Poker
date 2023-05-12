import type User from '@/models/UserModel'
import { reactive } from 'vue'
import { socket } from '@/socket'

export const userState = reactive({
  users: [] as User[]
})

socket.on('user-join', (users: User[]) => {
  userState.users = []
  // console.log('Mottagen user', users)
  userState.users = users
  console.log(userState.users)
})

socket.on('clearResult', () => {
  for (let i = 0; i < userState.users.length; i++) {
    userState.users[i].storyPoints = ''
  }
  console.log(userState.users)
})
