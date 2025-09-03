import Room from './Room.ts';

class NameSpace {
  id: number;
  name: string;
  image: string;
  endpoint: string;
  rooms: Room[];

  constructor(id: number, name: string, image: string, endpoint: string) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.endpoint = endpoint;
    this.rooms = [];
  }

  addRoom(roomObj: Room) {
    this.rooms.push(roomObj);
  }
}

export default NameSpace;
