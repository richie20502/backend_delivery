const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const multer = require('multer');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
/*
Se inicializan firebase admin
*/
admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

const upload = multer({
    storage : multer.memoryStorage()
});

/*
RUTAS
*/
const users = require('./routes/userRoutes');
const { credential } = require('firebase-admin');

const port = process.env.PORT || 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.disable('x-powered-by');

app.set('port', port);

/**
 * se jecutan las rutas de userRoutes importadas
*/
users(app, upload);

server.listen(3000, '192.168.1.12' || 'localhost', function(){
    console.log('Aplicacion de nodeJS '+ process.pid + " Iniciada ...........");
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

app.use((err, req, res, next) =>{
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = {
    app: app,
    server: server
}
