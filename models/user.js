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
    const sql = `SELECT * FROM users where email = $1`;
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