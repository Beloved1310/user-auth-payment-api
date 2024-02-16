const User = require('../model/user.model')

const userRepository = {
  async getOneUser(email) {
    const user = await User.findOne({ email }).select('-__v ')
    return user
  },

  async updateUserData(queryParams, fields) {
    return User.updateOne(fields, {
      $set: queryParams,
    })
  },
  async createUser(createUser) {
    const savedUser = await User.create(createUser)
    const { _id, __v, password, ...data } = savedUser.toObject()
    return data
  },
}

module.exports = userRepository
