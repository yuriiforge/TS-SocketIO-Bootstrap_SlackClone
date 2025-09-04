import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketEvents } from '../socket-events.enum.js';
import namespaces from './data/namespaces.js';
import Room from './classes/Room.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(process.cwd(), 'public')));

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
    socket.on('joinRoom', async (roomObj, ackCallback) => {
      const thisNs = namespaces[roomObj.namespaceId];
      const thisRoomObj = thisNs?.rooms.find(
        (room) => room.roomTitle === roomObj.roomTitle
      );
      const thisRoomsHistory = thisRoomObj?.history;

      const rooms = socket.rooms;

      let i = 0;
      rooms.forEach((room) => {
        if (i !== 0) {
          socket.leave(room);
        }
        i++;
      });

      socket.join(roomObj.roomTitle);

      // fetch the number of sockets in this room
      const sockets = await io
        .of(namespace.endpoint)
        .in(roomObj.roomTitle)
        .fetchSockets();
      const socketCount = sockets.length;

      ackCallback({
        numUsers: socketCount,
        thisRoomsHistory,
      });
    });

    socket.on('newMessageToRoom', (messageObj) => {
      console.log(messageObj);
      //broadcast this to all the connected clients... this room only!
      const rooms = socket.rooms;
      const currentRoom = [...rooms][1];

      // send out this messageObj
      io.of(namespace.endpoint)
        .in(currentRoom!)
        .emit('messageToRoom', messageObj);

      const thisNs = namespaces[messageObj.selectedNsId];
      const thisRoom = thisNs?.rooms.find(
        (room) => room.roomTitle === currentRoom
      );

      console.log('Current room:', currentRoom);
      console.log(
        'All rooms in namespace:',
        thisNs?.rooms.map((r) => r.roomTitle)
      );
      console.log('thisRoom:', thisRoom);

      thisRoom?.addMessage(messageObj);
    });
  });
});
