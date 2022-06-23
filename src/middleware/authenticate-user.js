const jwt = require('jsonwebtoken');
const services = require('../services');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    req.user = undefined;
    res.status(403).send({
      success: false,
      apiCalled: false,
      message: 'Authentication failed. No cookie present.'
    });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      req.user = undefined;
      res.status(500).send({
        success: false,
        apiCalled: false,
        message: 'Cookie found but something went wrong during JWT verification.'
      });
      return;
    }
    req.username = decoded.username;
    next();
  });
}