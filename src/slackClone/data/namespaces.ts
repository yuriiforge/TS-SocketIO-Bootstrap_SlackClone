import NameSpace from 'slackClone/classes/Namespace.ts';
import Room from 'slackClone/classes/Room.ts';

const wikiNs = new NameSpace(0, 'Wikipedia', '/images/wiki.jpg', '/wiki');
const mozNs = new NameSpace(1, 'Mozilla', '/images/mozilla.jpg', '/mozilla');
const linuxNs = new NameSpace(2, 'Linux', '/images/linux.jpg', '/linux');

wikiNs.addRoom(new Room(0, 'New Articles', 0));
wikiNs.addRoom(new Room(1, 'Editos', 0));
wikiNs.addRoom(new Room(2, 'Others', 0));

mozNs.addRoom(new Room(0, 'Firefox', 1));
mozNs.addRoom(new Room(1, 'SeaMonkey', 1));
mozNs.addRoom(new Room(2, 'SpiderMonkey', 1));
mozNs.addRoom(new Room(3, 'Rust', 1));

linuxNs.addRoom(new Room(0, 'Debian', 2));
linuxNs.addRoom(new Room(1, 'Red Hat', 2));
linuxNs.addRoom(new Room(2, 'Ubuntu', 2));
linuxNs.addRoom(new Room(3, 'Mac OS', 2));

const namespaces = [wikiNs, mozNs, linuxNs];

export default namespaces;
