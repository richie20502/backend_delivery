const User = require('../models/user');
module.exports = {
    async getAll(req, res, next){
        try {
            const data = await User.getAll();
            return res.status(201).json(data);
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: 'Error al obtener la ruta',
                error: error
            });
        } 
    },
    async register(req, res, next){
        try {
            const user = req.body;
            const data = await User.create(user);
            return res.status(201).json({
                success: true,
                message : "El registro se realizo correctamente",
                data : data.id
            });
        } catch (error) {
            return res.status(501).json({
                success: false,
                message: 'Error al obtener la ruta',
                error: error
            }); 
        }
    }
};