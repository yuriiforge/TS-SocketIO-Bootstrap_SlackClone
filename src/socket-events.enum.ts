export enum SocketEvents {
  // Client to Server events
  NEW_MESSAGE_TO_SERVER = 'newMessageToServer',

  // Server to Client events
  NEW_MESSAGE_TO_CLIENTS = 'newMessageToClients',
  WELCOME_TO_CHAT_ROOM = 'welcomeToChatRoom',
  SOCKET_CHECK = 'socketCheck',
  USER_JOINED_MAIN_NS = 'userJoinedMainNS',
}
