const isValid = require('../util/validations.js')
const Message = require('../models/message')
const RoomsModel = require('../models/rooms')

const socketInit = function socket(io) {
    // connect to socket and add token 
    io.use(async (socket, next) => {
        let token = socket.handshake.query.token;
        const auth = await isValid(token)
        if (auth) {
          socket.userInfo = auth
          return next();
        }
        return next(new Error('authentication error'));
    });
    // connect to room
    io.on('connection', function (socket) {
        socket.on('connectToRoom', function (data) {
            socket.join([data.id], () => {
                // const rooms = Object.keys(socket.rooms);
              });           

        });
        // send message to room
        socket.on('sendMessage', async function (room) {   
            if(room.id && room.message) { 
                const message = new Message({text:room.message})
                try {
                    message.user = socket.userInfo.user
                    await message.save()
                    await RoomsModel.SaveRoomMessage(room.id, message)
                } catch (e) {
                    console.log(e, 'error message.save() sendMessage')
                }
                // sent to roomers
                io.to(room.id).emit('MessageToRoom', message);
            }
        });
    });

}

module.exports = socketInit
