const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { JWT } = require('../config');

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type:String
    },
    password: {
      type: String,
      required: true,
    },
    status: "unpaid"
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function generatedToken() {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT
  );
  return token;
};

module.exports = mongoose.model('User', UserSchema);