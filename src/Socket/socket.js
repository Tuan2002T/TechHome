import { io } from 'socket.io-client'
import API_URL from '../config/API_URL'
export const socket = io.connect(API_URL.API_SOCKET)
