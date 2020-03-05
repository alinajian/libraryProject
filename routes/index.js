const guard = require('../middlewares/guard');

module.exports = (app) => {
  app.use('/', require('./homeRoutes'));
  app.use('/api/v1/auth', require('./auth.routes'));
  app.use('/api/v1/user', guard, require('./user.routes'));
  app.use('/api/v1/book', guard, require('./book.routes'));
  app.use('/api/v1/buy', guard, require('./order.routes'));
};
