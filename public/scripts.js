const username = 'Yurii';
const password = 'X';

const BACKEND_URL = 'https://ts-socketio-bootstrap-slackclone.onrender.com';

// Always join the main namespace
const socket = io(BACKEND_URL);

const namespaceSockets = [];
const listeners = {
  nsChange: [],
  messageToRoom: [],
};

let selectedNsId = 0;

document.querySelector('#message-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  console.log(newMessage, selectedNsId);

  namespaceSockets[selectedNsId].emit('newMessageToRoom', {
    newMessage,
    date: Date.now(),
    avatar: '',
    username,
    selectedNsId,
  });
});

// addListeners job is to manage all listeners added to all namespaces
const addListeners = (nsId) => {
  // namespaceSockets[ns.id] = thisNs;
  if (!listeners.nsChange[nsId]) {
    namespaceSockets[nsId].on('nsChange', (data) => {
      console.log('Namespace Changed!');
      console.log(data);
    });
    listeners.nsChange[nsId] = true;
  }

  if (!listeners.messageToRoom[nsId]) {
    namespaceSockets[nsId].on('messageToRoom', (messageObj) => {
      console.log(messageObj);
      document.querySelector('#messages').innerHTML +=
        buildMessageHtml(messageObj);
    });
    listeners.messageToRoom[nsId] = true;
  }
};

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('clientConnect');
});

socket.on('nsList', (nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces');
  nameSpacesDiv.innerHTML = '';
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" /></div>`;

    // let thisNs = namespaceSockets[ns.id];

    if (!namespaceSockets[ns.id]) {
      // join this namespace with io()
      namespaceSockets[ns.id] = io(`${BACKEND_URL}${ns.endpoint}`);
    }
    addListeners(ns.id);
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      element.addEventListener('click', (e) => {
        joinNs(element, nsData);
      });
    }
  );

  joinNs(document.getElementsByClassName('namespace')[0], nsData);
});
