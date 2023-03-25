const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    app.get('/api/users', UsersController.getAll);
    app.post('/api/user/create', upload.array('image',1), UsersController.registerWithImage);
    app.post('/api/user/login', UsersController.login);
};