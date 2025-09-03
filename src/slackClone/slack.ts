import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static(path.join(__dirname, 'public')));

httpServer.listen(9000, () => {
  console.log('Server running on port 9000');
});

io.on('connection', (socket) => {
  console.log(socket.id, 'has connected');
  socket.emit('welcome', 'Welcome to the server');
});
