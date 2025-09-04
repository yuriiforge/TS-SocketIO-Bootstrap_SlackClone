const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');
  console.log(nsEndpoint);

  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
  selectedNsId = clickedNs.id;
  const rooms = clickedNs.rooms;

  let roomsList = document.querySelector('.room-list');
  roomsList.innerHTML = '';

  let firstRoom;

  rooms.forEach((room, i) => {
    if (i === 0) {
      firstRoom = room.roomTitle;
    }

    console.log(room);

    roomsList.innerHTML += `<li class="room" namespaceId=${
      room.namespaceId
    }><span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe'}"></span>${
      room.roomTitle
    }</li>`;
  });

  joinRoom(firstRoom, clickedNs.id);

  // add click listener to each room
  const roomNodes = document.querySelectorAll('.room');
  Array.from(roomNodes).forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const namespaceId = elem.getAttribute('namespaceId');
      console.log('SocketId', parseInt(namespaceId));
      joinRoom(e.target.innerText, parseInt(namespaceId));
    });
  });
};
