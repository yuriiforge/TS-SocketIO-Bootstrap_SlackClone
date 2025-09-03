import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { SocketEvents } from '../socket-events.enum.ts';
import namespaces from './data/namespaces.ts';

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
    console.log(`${socket.id} has connected to ${namespace.endpoint}`);
  });
});
