const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');
  console.log(nsEndpoint);

  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
  const rooms = clickedNs.rooms;

  let roomsList = document.querySelector('.room-list');
  roomsList.innerHTML = '';
  rooms.forEach((room) => {
    console.log(room);
    roomsList.innerHTML += `<li class="room" namespaceId=${
      room.namespaceId
    }><span class="fa-solid fa-${room.privateRoom ? 'lock' : 'globe'}"></span>${
      room.roomTitle
    }</li>`;
  });

  // add click listener to each room
  const roomNodes = document.querySelectorAll('.room');
  Array.from(roomNodes).forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const namespaceId = elem.getAttribute('namespaceId');
      joinRoom(e.target.innerText, namespaceId);
    });
  });
};
