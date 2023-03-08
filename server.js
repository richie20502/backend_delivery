const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');

const port = process.env.PORT || 3000;
app.set('port', port);

server.listen(3000, '192.168.1.5' || 'localhost', function(){
    console.log('Aplicacion de nodeJS '+ process.pid + " Iniciada ...........");
});
