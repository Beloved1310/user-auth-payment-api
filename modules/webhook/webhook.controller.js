const webhookService = require('./webhook.service')

const webhookController = {
  async handleWebhook(req, res) {
    await webhookService.handleWebhook(req, res)
  },
}

module.exports = webhookController
