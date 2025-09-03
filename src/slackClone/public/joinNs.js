const joinNs = (element, nsData) => {
  const nsEndpoint = element.getAttribute('ns');
  console.log(nsEndpoint);

  const clickedNs = nsData.find((row) => row.endpoint === nsEndpoint);
  const rooms = clickedNs.rooms;

  let roomsList = document.querySelector('.room-list');
  roomsList.innerHTML = '';
  rooms.forEach((room) => {
    roomsList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
  });
};
