const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const { JWT, REFRESH_JWT } = require('../config')

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'unpaid',
    },
    stripeCustomerId: {
      type: String,
    },
  },
  { timestamps: true },
)

UserSchema.methods.generateAuthToken = function generateToken() {
  const user = this
  const expiresIn = 60 * 15 // 15 minutes in seconds
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    code: user.code,
    email: user.email,
    isAdmin: user.isAdmin,
    isPartner: user.isPartner,
    exp: Math.floor(Date.now() / 1000) + expiresIn,
  }

  const token = jwt.sign(payload, JWT)
  return token
}

UserSchema.methods.generateRefreshToken = function generatedToken() {
  const user = this
  const expiresIn = 60 * 60 * 24 * 7

  const token = jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      email: user.email,
      isAdmin: user.isAdmin,
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    },
    REFRESH_JWT,
  )

  return token
}

module.exports = mongoose.model('User', UserSchema)
