const User = require('../models/user');
const Role = require('../models/roles');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
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
    async findById(req, res, next){
        console.log('parametros recibidos');
        console.log(req.params);
        try {
            const id = req.params.id;
            console.log('parametros recibidos');
            console.log(req.params);
            const data = await User.findByUserId(id);
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
            await Role.create(data.id,1); //  crea el cliente con rol cliente
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
    },

    async registerWithImage(req, res, next){
        try {
            const user = JSON.parse(req.body.user);
            const files = req.files;
            if(files.length > 0 ){
                const pathImage = `image_${Date.now()}`;  //nombre del archivo
                const url = await storage(files[0],pathImage);
                if (url != undefined && url != null ){
                    user.image = url;
                }
            }
            const data = await User.create(user);
            await Role.create(data.id,1); //  crea el cliente con rol cliente
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
    },
    async login(req, res, next){
        try {
            const email = req.body.email;
            const password = req.body.password;
            const myUser = await User.findByEmail(email);

            if(!myUser){
                return res.status(401).json({
                    success:false,
                    message:'El email no fue encontrado'
                });
            }

            if(User.isPasswordMatched(password,myUser.password)){
                const token = jwt.sign({id: myUser.id, email:myUser.email}, keys.secretOrKey,{
                    //expiresIn: (60*60*24)
                });
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    password: myUser.password,
                    session_token : `JWT ${token}`,
                    roles:myUser.roles
                }
                
                await User.updateToken(myUser.id,`JWT ${token}`);

                return res.status(201).json({
                    success: true,
                    data: data,
                    message: "Ingresaste bien"
                });
            }else{
                return res.status(401).json({
                    success: false,
                    message: "La contraseña es incorrecta"
                });
            }
            
        } catch (error) {
            console.log(`Error:::::::: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al momento de hacer login',
                error: error
            });
        }
    },

    async update(req, res, next){
        try {
            const user = JSON.parse(req.body.user);
            const files = req.files;
            if(files.length > 0 ){
                const pathImage = `image_${Date.now()}`;  //nombre del archivo
                const url = await storage(files[0],pathImage);
                if (url != undefined && url != null ){
                    user.image = url;
                }
            }
            await User.update(user);
            return res.status(201).json({
                success: true,
                message : "Los datos del usuario se actualizaron correctamente"
            });
        } catch (error) {
            console.log(error);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion de datos del usuario',
                error: error
            }); 
        }
    }
};