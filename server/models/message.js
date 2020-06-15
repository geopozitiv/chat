const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "send text",
    minlength: 1,
    maxlength: 2500,
    
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  },
},{
  timestamps: true
});

messageSchema.plugin(mongoosePaginate);

messageSchema.statics.result = (result) => {
      const arrayMessages = result.docs.map(item => {
        return {
            id: item.id,
            text: item.text,
            createdAt: item.createdAt,
            room: item.room,
            user: {
                name: item.user.name,
                _id: item.user._id,

            }
        }
    });
    result = {
        messages: arrayMessages.slice().reverse(),
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

const Message = mongoose.model('Message', messageSchema);

module.exports = Message; 