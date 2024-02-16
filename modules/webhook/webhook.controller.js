const webhookService = require('./webhook.service')

const webhookController = {
  async handleWebhook(req, res) {
   const data =  await webhookService.handleWebhook(req, res)
    return ResponseService.success(
      res,
      'User record updated successfully',
      data,
    )
  },
}

module.exports = webhookController
