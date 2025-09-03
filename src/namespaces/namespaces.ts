import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketEvents } from '../socket-events.enum.js';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(__dirname + '/public'));

httpServer.listen(8001, () => {
  console.log('Server running on port 8001');
});

io.of('/').on('connection', (socket) => {
  socket.join('chat');
  socket.join('adminChat');

  // io.of('/').to('chat').emit(SocketEvents.WELCOME_TO_CHAT_ROOM, {});
  // io.of('/')
  //   .to('chat')
  //   .to('chat2')
  //   .to('adminChat')
  //   .emit(SocketEvents.WELCOME_TO_CHAT_ROOM, {});
  io.to(socket.id).emit(SocketEvents.SOCKET_CHECK, socket.id);
  io.of('/admin').emit(SocketEvents.USER_JOINED_MAIN_NS, '');

  console.log(socket.id, 'has connected');

  socket.on(SocketEvents.NEW_MESSAGE_TO_SERVER, (dataFromClient) => {
    console.log('Data:', dataFromClient);
    io.emit(SocketEvents.NEW_MESSAGE_TO_CLIENTS, { text: dataFromClient.text });
  });
});

io.of('/admin').on('connection', (socket) => {
  console.log(socket.id, 'has joined /admin');
  io.of('/admin').to('chat').emit(SocketEvents.WELCOME_TO_CHAT_ROOM, {});
});
