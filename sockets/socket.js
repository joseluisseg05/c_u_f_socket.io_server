const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('AC/DC'));
bands.addBand(new Band('Bad wolves'));
bands.addBand(new Band('The 1975'));
bands.addBand(new Band('Metallica'));

//console.log(bands);
//mensajes de sockets
io.on('connection', client => {
    console.log('Cliente concentado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje!!!', payload);
        io.emit('mensaje', { admin: 'nuevo mensaje' })
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        //console.log(payload);
        io.emit('active-bands', bands.getBands());
    });

    client.on('new-band', (payload) => {
        bands.addBand(new Band(payload.name));
        //console.log(payload);
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    /*
    client.on('emitir-mensaje', (payload) => {
        //console.log(payload);
        //io.emit('nuevo-mensaje', payload); //emite a todos los clientes conectados 
        client.broadcast.emit('nuevo-mensaje', payload); //emite a todos menos el que lo emitio
    })*/
});