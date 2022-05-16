const express = require('express');
const productosRouter = require('./Routers/productos')
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: 'true' }))
app.use(express.static('public'))
app.use('/', productosRouter)

const PORT = 8080;

const Server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))

Server.on("error", (error) => console.log(`Hubo un error: ${error}`));
