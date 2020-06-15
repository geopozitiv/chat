const express = require('express');
require('./db/mongo_DB');
const helmet = require('helmet');
const UsersApi = require('./routes/Users.js');
const RoomsApi = require('./routes/Rooms.js');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cookie: false} );
const cors = require('cors');

app.use(express.json())
app.use(cors()) 
app.use(helmet()) 

const socket = require('./socket/sockets.js');
const PORT = process.env.PORT || 3000

socket(io);

server.listen(PORT);
// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});

app.use('/api/users', UsersApi);
app.use('/api/rooms', RoomsApi);

module.exports = app