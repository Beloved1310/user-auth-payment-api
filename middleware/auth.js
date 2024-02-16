
const jwt = require('jsonwebtoken');
const  config  = require('../config');
 
const auth = (req, res, next) => {
  const token = req.header('authorization')
  if (!token) {
    return res
      .status(401)
      .send({ message: 'Access denied. No token provided' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], config.JWT);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).send({ message: 'Invalid token.' });
  }
};

module.exports =  auth