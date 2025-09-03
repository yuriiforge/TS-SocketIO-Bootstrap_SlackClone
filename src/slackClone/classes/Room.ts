class Room {
  roomId: number;
  roomTitle: string;
  namespaceId: number;
  privateRoom: boolean;
  history: any;

  constructor(
    roomId: number,
    roomTitle: string,
    namespaceId: number,
    privateRoom = false
  ) {
    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.namespaceId = namespaceId;
    this.privateRoom = privateRoom;
    this.history = [];
  }

  addMessage(message: any) {
    this.history.push(message);
  }

  clearHistory() {
    this.history = [];
  }
}

export default Room;
