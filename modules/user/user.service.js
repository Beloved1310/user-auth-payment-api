const userRepository = require('../../repositories/user.repositories')
const bcrypt = require('bcrypt')
const ValidationError = require('../../utilis/validation-error')
const NotFoundError = require('../../utilis/not-found-error')
const UnprocessableError = require('../../utilis/not-processed-error')
const ConflictError = require('../../utilis/conflict-error')

const userService = {
  async createUser(createUser) {
    const { email } = createUser
    const user = await userRepository.getOneUser(email)
    if (user)
      throw new ConflictError('User already registered. Proceed to login')
    const salt = await bcrypt.genSalt(10)
    createUser.password = await bcrypt.hash(createUser.password, salt)
    const savedUser = await userRepository.createUser(createUser)
    if (!savedUser) throw new UnprocessableError('Unsaved User')
    return savedUser
  },

  async loginUser(loginUser) {
    const user = await userRepository.getOneUser(loginUser.email)
    if (!user) throw new ValidationError('Username or Password not found')
    const validPassword = await bcrypt.compare(
      loginUser.password,
      user.password,
    )
    if (!validPassword)
      throw new ValidationError('Username or Password not found')
    const token = user.generateAuthToken()
    const refreshToken = user.generateRefreshToken()
    return { token, refreshToken, user }
  },

  async updateProfile(value) {
    const {
      _id,
      password,
      email,
      firstName,
      lastName,
    } = value

    const updateData = {}

    if (password) {
      const salt = await bcrypt.genSalt(10)
      updateData.password = await bcrypt.hash(password, salt)
    }

    if (email) {
      updateData.email = email
    }

    if (firstName) {
      updateData.firstName = firstName
    }

    if (lastName) {
      updateData.lastName = lastName
    }

    await userRepository.updateUserData(updateData, { _id })
    return ''
  },
}

module.exports = userService
