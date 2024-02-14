const User = require('../model/user.model');


const userRepository = {
  async getOneUser(email) {
    const user = await User.findOne({ email }).select('-__v ')
    return user
  },
  async getOneUserData(item) {
    const user = await User.findOne(item).select('-__v')
    return user
  },
  async updateUserData(queryParams, fields) {
    return User.updateOne(fields, {
      $set: queryParams,
    })
  },
}

module.exports = userRepository
