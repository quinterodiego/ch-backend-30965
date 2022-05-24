const express = require('express')
const { engine } = require('express-handlebars')
const Container = require('./Container')
//const productosRouter = require('./Routers/productos')
const app = express()

const contenedor = new Container();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: `${__dirname}/views/index`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
}))

app.set('views', './views')
app.set('view engine', 'hbs')
app.use(express.json())
app.use(express.urlencoded({ extended: 'true' }))
//app.use(express.static('public'))
//app.use('/', productosRouter)

app.get('/', (req, res) => {
    return res.render('layouts/form')
})

app.get('/productos',async (req, res) => {
    const productos = await contenedor.getAll()
    const data = {
        productos
    }

    return res.render('layouts/productos', data)
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
