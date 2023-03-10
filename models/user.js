const db = require('../config/config');
const crypto = require('crypto');

const User = {};
User.getAll = () =>{
    const sql = `SELECT * FROM users`;
    return db.manyOrNone(sql);
}

User.findById = (id, callback)=>{
    const sql = `SELECT * FROM users where id = $1`;
    return db.oneOrNone(sql, id).then(user =>{ callback(null, user)});
},

User.findByEmail = (email) => {
    const sql = `SELECT u.id, u.email, u.name, lastname, u.phone, u.image, u.password, u.is_avalible, u.session_token, u.created_at, u.updated_at,
	json_agg(
		json_build_object(
			'id' , r.id,
			'name', r.name,
			'image', r.image,
			'route', r.route
		)
	) as roles
	FROM public.users as u
	inner join user_has_roles as umr
	on umr.id_user = u.id
	inner join roles as r
	on r.id = umr.id_rol
    where u.email = $1
    group by u.id`;
    return db.oneOrNone(sql, email);
},

User.create = (user) => {
    const myPasswordHashed = crypto.createHash('md5').update(user.password).digest('hex');
    const sql = `
    INSERT INTO
        users(
            email,
            name,
            lastname,
            phone,
            password,
            image,
            created_at,
            updated_at
            )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
    `;
    return db.oneOrNone(sql,[
        user.email,
        user.name,
        user.lastname,
        user.phone,
        myPasswordHashed,
        user.image,
        new Date(),
        new Date()
    ]);
},

User.isPasswordMatched = (userPassword, hash) =>{
    const myPasswordHashed = crypto.createHash('md5').update(userPassword).digest('hex');
    if(myPasswordHashed === hash){
        return true;
    }
    return false;
}

module.exports = User;