const express = require('express')
const router = express.Router()
const webhookController = require('./webhook.controller')
const asyncMiddleware = require('../../middleware/async')

router.post('/webhook', asyncMiddleware(webhookController.handleWebhook))

module.exports = router
