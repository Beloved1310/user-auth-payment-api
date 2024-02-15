const express = require('express')
const asyncMiddleware = require('../../middleware/async')
const auth = require('../../middleware/auth')

const router = express.Router()

const userController = require('./user.controller')

router.post('/register', asyncMiddleware(userController.register))
router.post('/login', asyncMiddleware(userController.login))
router.post('/:id', auth, asyncMiddleware(userController.updateUser))

module.exports = router
