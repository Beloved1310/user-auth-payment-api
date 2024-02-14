const dotenv = require('dotenv');

dotenv.config();
const { env } = process;

module.exports = {
  JWT: env.JWT_SECRET,
  PORT: env.PORT || 4000,
  MONGODBURI: env.MONGODBURI,
  debug: env.debug,
};