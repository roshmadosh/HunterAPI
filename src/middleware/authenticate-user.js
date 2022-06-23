const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    req.user = undefined;
    next();
  }

  jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
      req.user = undefined;
      console.error(err);
      next();
    }
    console.log(decoded);
  });


  next();
}