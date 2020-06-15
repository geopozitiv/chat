const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = new express.Router()

// register new user
router.post('/signup', async (req, res) => {
    // console.log('signup',req.body)
    const findUser = await User.findEmailSignup(req.body.email)
    if(!findUser) {
        const user = new User(req.body)
        try {
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        } catch (e) {
            res.status(400).send(e)
        }
    } else {
        res.status(400).send({
            error: true,
            message: "This email is registered try add new one"
        })
    }
   
})

// login user
router.post('/signin', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user: {_id: user.id, name: user.name, email: user.email}, token: token})
    } catch (e) {
        res.status(400).send({error: true, massage: e.message})
    }
})

// sign out user
router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send({status: "ok"})
    } catch (e) {
        res.status(500).send()
    }
})

// user info
router.get('/me', auth, async (req, res) => {
    const user =  {
            _id: req.user._id, 
            name: req.user.name, 
            email: req.user.email
        }
    res.status(200).send(user)
})


module.exports = router