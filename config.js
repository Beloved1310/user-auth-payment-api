const dotenv = require('dotenv');

dotenv.config();
const { env } = process;

module.exports = {
  JWT: env.JWT_SECRET,
  REFRESH_JWT: env.REFRESH_JWT,
  PORT: env.PORT || 4000,
  MONGODBURI: env.MONGODBURI,
  debug: env.debug,
};