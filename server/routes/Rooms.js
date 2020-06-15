const express = require('express')
const RoomsModel = require('../models/rooms')
const MessageModel = require('../models/message')
const auth = require('../middleware/auth')
const router = new express.Router()

// create new room
router.post('/', auth, async (req, res) => {
    const name = req.body.name
    if(name) {
        const room = new RoomsModel(req.body)
        try {
            await room.save()
            res.status(201).send({ 
                id: room._id, 
                name: room.name, 
                messages_length: room.messages.length
             })
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).send({
            error: true,
            message: "Can't create room without 'Name'"
        })
    }
})

// message send = {text, id_room}
router.post('/message', auth, async (req, res) => {
    const text = req.body.text
    if(text) {
        const message = new MessageModel({
            text: req.body.text,
            user: req.user
        } )
        try {
            await message.save()
            await RoomsModel.SaveRoomMessage(req.body.room, message)
            res.status(201).send({ message })
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).send({
            error: true,
            message: "Provide text message"
        })
    }
})

// get All rooms
router.get('/all', auth, async (req, res) => {
    const searchText = {name:{ $regex: req.query.search, $options: "i" }}
    const search = req.query.search ? searchText : {}

    RoomsModel.paginate(search, {
        page: Number(req.query.page), 
        limit: 20,
        sort: { createdAt: -1 },
    })
    .then(function(result) {
        result = RoomsModel.result(result)
        res.send(result);
    }).catch(err => {
        console.log(err)
        res.status(400).send({error: true, message: err.message});
    })
})

// get room -> messages
router.get('/messages', auth, async (req, res) => {
    if(req.query.id) {
        MessageModel.paginate({room: {_id: req.query.id}}, {
            page: Number(req.query.page), 
            limit: 20,
            sort:     { createdAt: -1 },
            populate: 'user'
        })
        .then(function(result) {
            result = MessageModel.result(result)
            res.send(result);
        }).catch(err => {
            console.log(err)
            res.status(400).send({error: true, message: err.message});
        })
    } else {
        res.status(400).send({error: true, message: 'provide room ID'});
    }
   

})

module.exports = router