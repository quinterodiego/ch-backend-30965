const express = require('express');
const Container = require('./Container');

const Server = express();

const contenedor = new Container();

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

Server.get('/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.send( { "Productos": productos } );
})

Server.get('/productoRandom', async (req, res) => {
    const idRandom = getRandomInt(1, 4)
    const productoRandom = await contenedor.getById(idRandom);
    res.send({ "Producto random": productoRandom });
})

const PORT = 8080;
Server.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))

Server.on("error", (error) => console.log(`Hubo un error: ${error}`));
