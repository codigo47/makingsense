const basicAuth = require('basic-auth');

const authMiddleware = (req, res, next) => {
  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }

  if (user.name === 'esteban' && user.pass === 'pass123') {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
};

const getAuthUser = (req) => {
  return basicAuth(req).name; 
};

module.exports = {
  authMiddleware,
  getAuthUser
};