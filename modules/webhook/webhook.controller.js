const webhookService = require('./webhook.service')

const webhookController = {
  async handleWebhook(req, res) {
    await webhookService.handleEvent(req, res)
  },
}

module.exports = webhookController
