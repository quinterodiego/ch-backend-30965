const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const Container = require('./Container')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const contenedor = new Container();

app.set('views', './views')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: 'true' }))
app.use(express.static('./public'))

let users = []
const messages = []

app.get('/', (req, res) => {
    return res.render('index')
})

app.get('/productos',async (req, res) => {
    const productos = await contenedor.getAll()
    const data = {
        productos
    }

    return res.render('prod', data)
})

app.post('/productos', async (req, res) => {
    const producto = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    }

    const id = await contenedor.save(producto)
    console.log("ID asignado: ", id)
    return res.redirect('/')
})

const PORT = 8080;

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))

httpServer.on("error", (error) => console.log(`Hubo un error: ${error}`));

io.on('connection', async socket => {
    console.log('Nuevo usuario conectado: ', socket.id)

    const productos = await contenedor.getAll()

    socket.emit('productos', productos)

    socket.on('newProduct', async (producto) => {
        await contenedor.save(producto)
        const productos = await contenedor.getAll();
        io.sockets.emit('productos', productos);
    })
})