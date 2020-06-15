const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  messages: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message"
  }]
},{
  timestamps: true
});

roomsSchema.index({name: 1})

roomsSchema.plugin(mongoosePaginate);

roomsSchema.statics.SaveRoomMessage = async (id, message) => {
  // find room
  const room = await Room.findOne({ _id: id })
  // add message to room
  room.messages.push(message)
  await room.save() 
  // add room to message
  message.room = room
  await message.save()
  return room
}
roomsSchema.statics.result = (result) => {
  const arrayRooms = result.docs.map(item => {
    return {
        id: item.id,
        name: item.name,
        createdAt: item.createdAt,
    }
  });
  result = {
      rooms: arrayRooms,
      info: {
          totalPages: result.totalPages,
          currentPage: result.page,
          hasPrevPage: result.hasPrevPage,
          hasNextPage: result.hasNextPage,
          nextPage: result.nextPage
      }
  };

  return result
}

const Room = mongoose.model('Room', roomsSchema);

module.exports = Room; 