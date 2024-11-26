import { io } from 'socket.io-client'
import API_URL from '../config/API_URL'
export const socket = io(API_URL.API_SOCKET, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});