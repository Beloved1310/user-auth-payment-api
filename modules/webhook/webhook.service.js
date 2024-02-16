const config = require('../../config')
const stripe = require('stripe')(config.STRIPE_SECRET_KEY)
const userRepository = require('../../repositories/user.repositories')

exports.handleEvent = async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.STRIPE_WEBHOOK_KEY,
    )
  } catch (err) {
    throw new Error(err.message)
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const {
      data: {
        object: { customer: customerId },
      },
    } = event
    const user = await userRepository.updateUserData(
      { stripeCustomerId: customerId },
      { status: 'paid' },
    )
    console.log('User status updated to "paid"', user)
  }

  res.status(200).end()
}
