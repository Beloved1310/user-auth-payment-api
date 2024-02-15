const Joi = require('joi')

const passwordRegex = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]*)(?=.*[!@#$%^&*_-])(?=.{8,})',
)
const userValidation = {
  create: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(passwordRegex)
      .max(70)
      .messages({
        'string.pattern.match': '"password" must be stronger',
        'string.pattern.base':
          'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
      })
      .required(),
    confirm_password: Joi.any()
      .equal(Joi.ref('password'))
      .messages({ 'any.only': '{{#label}} does not match' }),
  }).with('password', 'confirm_password'),

  login: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
      .pattern(passwordRegex)
      .max(70)
      .messages({
        'string.pattern.match': '"password" must be stronger',
        'string.pattern.base':
          'The "password" must meet the specified criteria: at least one lowercase letter, one uppercase letter, one digit, one special character, and a minimum length of 8 characters.',
      })
      .required(),
  }),
}

module.exports = userValidation
