import io from 'socket.io-client';
//INSTANTIATIING SOCKET CONNECTION
const socket = io.connect('http://localhost:5000');

let selectedUsername;
let selectedRoom;

const joinRoom = (room, username) => {
  if (!username || !room) {
    return;
  }

  selectedUsername = username;
  selectedRoom = room;
  socket.emit('join_room', room);
};

export { socket, joinRoom, selectedRoom, selectedUsername };
