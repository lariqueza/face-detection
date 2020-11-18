var chatForm = document.getElementById('chat-form');
var chatMessages = document.querySelector('.chat-messages');
var roomName = document.getElementById('room-name');
var userList = document.getElementById('users');

//get username and room from url
var {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

var socket = io();
//join chatroom
socket.emit('joinRoom', {username, room}); 

//get room and users
socket.on('roomusers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

// Message from server
socket.on('message', message => {
    console.log(message); 
    outputMessage(message);
    //scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

//message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //get message text
    var msg = e.target.elements.msg.value;
    //emit message to server
    socket.emit('chatMessage', msg);
    //clear input(s)
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

//output message to DOM

function outputMessage(message) {
    var div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.user} <span>9:12pm</span></p><p class="text">${message.text}</p>`;
    document.querySelector('.chat-messages').appendChild('div');
}

//add room name to DOM
function outputRoomName () {
    roomName.innerText = room;
}

//add users to DOM
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`
}

