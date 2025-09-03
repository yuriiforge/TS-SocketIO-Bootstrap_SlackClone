const username = 'Yurii';
const password = 'X';

const socket = io('http://localhost:9000');

socket.on('connect', () => {
  console.log('Connected!');
  socket.emit('clientConnect');
});

socket.on('nsList', (nsData) => {
  console.log(nsData);
  const nameSpacesDiv = document.querySelector('.namespaces');
  nsData.forEach((ns) => {
    nameSpacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.image}" /></div>`;
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      element.addEventListener('click', (e) => {
        const nsEndpoint = element.getAttribute('ns');
        console.log(nsEndpoint);

        const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
        const rooms = clickedNs.rooms;

        let roomsList = document.querySelector('.room-list');
        roomsList.innerHTML = '';
        rooms.forEach((room) => {
          roomsList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
        });
      });
    }
  );
});
