const express = require('express');
const path = require('path');
require('dotenv').config();

//app de express
const app = express();

//node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');





const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


server.listen(process.env.PORT, (error) => {
    if (error) throw new Error(error);

    console.log('Servidor corriendo en el puerto ', process.env.PORT);
});