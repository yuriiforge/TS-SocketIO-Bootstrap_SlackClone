const username = 'Yurii';
const password = 'X';

// Always join the main namespace
const socket = io('http://localhost:9000');

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
    // join this namespace with io()
    io(`http://localhost:9000${ns.endpoint}`);
  });

  Array.from(document.getElementsByClassName('namespace')).forEach(
    (element) => {
      element.addEventListener('click', (e) => {
        joinNs(element, nsData);
      });
    }
  );

  joinNs(document.getElementsByClassName('namespace')[0].nsData);
});
