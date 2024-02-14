const { userValidation } = require('../validation/user.validation');
const { userService } = require('../services/user.service');
const { ResponseService } = require('../services/response.service');
const { generateRandomString } = require('../utilis/generateToken');
const { userRepository } = require('../repositories/user.repositories');

export const userController = {
  async register(req, res) {
    const { value, error } = userValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    value.verificationToken = generateRandomString(5)
    value.verificationTokenExp = new Date(Date.now() + 600000) // 10 mins
    const data = await userService.createUser(value)
    return ResponseService.success(
      res,
      'Welcome! You have successfully sign up. Proceed to login',
      data,
    )
  },

  async login(req, res) {
    const { value, error } = userValidation.login.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
    const { email } = value
    const { token, refreshToken, ...user } = await userService.loginUser(value)
    res.header('authorization', token)
    res
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
        domain: 'api.worknoon.com',
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
      })
    const data = { email, token, ...user }
    return ResponseService.success(res, 'Login Successful', data)
  },
}
