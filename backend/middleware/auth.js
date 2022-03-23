const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};
