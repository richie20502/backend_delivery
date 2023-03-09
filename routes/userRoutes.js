const UsersController = require('../controllers/usersController');

module.exports = (app) => {
    app.get('/api/users', UsersController.getAll);
    app.post('/api/user/create', UsersController.register);
    app.post('/api/user/login', UsersController.login);
};