const config = require('../../config')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)
const userRepository = require('../../repositories/user.repositories')
const NotFoundError = require('../../utilis/not-found-error')
const ValidationError = require('../../utilis/validation-error')

const webhookController = {
  async handleWebhook(req, res) {
    const sig = req.headers['stripe-signature']
    let event
    // Retrieve the raw request body
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        config.STRIPE_WEBHOOK_KEY,
      )
    } catch (err) {
      throw new ValidationError(err.message)
    }

    // Handle the event
    if (event.type === 'payment_intent.succeeded') {
      const {
        data: {
          object: { customer: customerId, receipt_email: email },
        },
      } = event

      let updateData = { status: 'paid' }
//check if email and customerId exist
      if (customerId) {
        updateData.stripeCustomerId = customerId
      } else {
       const foundEmail =  await userRepository.getOneUser(email)
       if(!foundEmail) throw new NotFoundError('User Credentials is not available')
        updateData.email = email
      }
      await userRepository.updateUserData(updateData)
      return {status: "paid"}
    }
  },
}

module.exports = webhookController