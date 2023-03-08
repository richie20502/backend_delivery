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
    }
};