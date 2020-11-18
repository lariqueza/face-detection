var path = require('path');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var socketio = require('socket.io');
var formatMessage = require('./utils/messages');
var {userJoin, getCurrentUser, userLeave} = require('./utils/users');
const { getRoomUsers } = require('./users');

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
var botName = 'ChatCord Bot';

//Run when a client connects
io.on('connection', socket => {
    socket.on('joinRoom', ({username, room}) => {
        var user = userJoin(socket.id, username, room)
        socket.join(user.room);

        //welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord'));
    });

    socket.emit('message',formatMessage('botName', 'Welcome to Chatcord!'));

    //broadcast when a user connects
    socket.broadcast.to(user.room).emit('message',
    formatMessage(botName, `${user.username} has joined the chat`));

    //send users and room info
    io.to(user.room).emit('roomusers', {
        room: user.room,
        users: getRoomUsers(user.room)
    });

    //runs when client disconnects
    socket.on('disconnect', () => {
        var user = userLeave(socket.id);

        if(user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));
        }
    });

    //listen for chatMessage
    socket.on('chatMessage', msg => {
        var user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage('user.username', msg)); //emit to everybody
    });
});

var PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));