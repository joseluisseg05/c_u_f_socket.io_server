const { io } = require('../index');
//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente concentado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje!!!', payload);

        io.emit('mensaje', { admin: 'nuevo mensaje' })
    });
});