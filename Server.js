const express = require('express')
const { engine } = require('express-handlebars')
const Container = require('./Container')
//const productosRouter = require('./Routers/productos')
const app = express()

const contenedor = new Container();

app.set('views', './views')
app.set('view engine', 'pug')
app.use(express.json())
app.use(express.urlencoded({ extended: 'true' }))

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

const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto: ${PORT}`))

server.on("error", (error) => console.log(`Hubo un error: ${error}`));
