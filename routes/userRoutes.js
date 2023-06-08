const UsersController = require('../controllers/usersController');

module.exports = (app, upload) => {
    app.get('/api/users', UsersController.getAll);
    app.get('/api/user/findById/:id', UsersController.findById);
    app.post('/api/user/create', upload.array('image',1), UsersController.registerWithImage);
    //app.post('/api/user/create', UsersController.register);
    app.post('/api/user/login', UsersController.login);

    //Actualizar Datos
    app.put('/api/user/update', upload.array('image',1),  UsersController.update);
};