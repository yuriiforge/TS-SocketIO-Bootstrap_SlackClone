import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketEvents } from '../socket-events.enum.ts';
import namespaces from './data/namespaces.ts';
import Room from './classes/Room.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

namespaces.forEach((namespace) => {
  console.log(namespace);
});

app.use(
  express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path) => {
      if (path.endsWith('.ts')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    },
  })
);

app.get('/change-ns', (req, res) => {
  if (!namespaces[0]) return;

  namespaces[0].addRoom(new Room(0, 'Deleted Articles', 0));

  io.of(namespaces[0].endpoint).emit('nsChange', namespaces[0]);

  res.json(namespaces[0]);
});

httpServer.listen(9000, () => {
  console.log('Server running on port 9000');
});

io.on('connection', (socket) => {
  socket.emit('welcome', 'Welcome to the server');
  socket.on(SocketEvents.CLIENT_CONNECT, (data) => {
    console.log(socket.id, 'has connected');
    socket.emit('nsList', namespaces);
  });
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (socket) => {
    // console.log(`${socket.id} has connected to ${namespace.endpoint}`);
    socket.on('joinRoom', async (roomTitle, ackCallback) => {
      const rooms = socket.rooms;

      let i = 0;
      rooms.forEach((room) => {
        if (i !== 0) {
          socket.leave(room);
        }
        i++;
      });

      socket.join(roomTitle);

      // fetch the number of sockets in this room
      const sockets = await io
        .of(namespace.endpoint)
        .in(roomTitle)
        .fetchSockets();
      const socketCount = sockets.length;

      ackCallback({
        numUsers: socketCount,
      });
    });
  });
});
