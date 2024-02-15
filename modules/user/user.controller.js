const  userValidation  = require('./user.validation')
const userService = require('./user.service')
const ResponseService  = require('../../services/response.service')
const { userRepository } = require('../../repositories/user.repositories')

const userController = {
  async register(req, res) {
    const { value, error } = userValidation.create.validate(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })
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
    const { token, refreshToken } = await userService.loginUser(value)
    res.header('authorization', token)
    const data = { email, token }
    return ResponseService.success(res, 'Login Successful', data)
  },

  async updateUser(req, res) {
    const { value, error } = userValidation.profile.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    if (req.body.email) {
      const { email } = req.body;
      const user = await userRepository.getOneUser(email);

      if (user) {
        return res.status(400).send({
          error: true,
          message: "email already exists, change to a another email",
        });
      }
    }
    value.firstName = req.body.firstName || req.user?.firstName;
    value._id = req.user._id;
    await userService.updateProfile(value);
    return ResponseService.success(res, "Profile Updated");
  },

}

module.exports = userController
