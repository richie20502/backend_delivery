const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
/*
RUTAS
*/

const users = require('./routes/userRoutes');

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
users(app);

server.listen(3000, '192.168.1.5' || 'localhost', function(){
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
