const express = require('express')
const app = express()

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    const data = {
        comision: 30965
    }

    return res.render('index', data)
})

app.get('/alumnos', (req, res) => {
    const alumnos = [
        { nombre: 'Aaron', apellido: 'Jallaza' },
        { nombre: 'Agustina', apellido: 'Prats' },
        { nombre: 'Alan', apellido: 'Mathiasen' },
        { nombre: 'Alejandro', apellido: 'Zapata' },
        { nombre: 'Benjamin', apellido: 'Hernandez' }
    ]
    
    const data = {
        alumnos,
        comision: 30965 
    }

    return res.render('alumnos', data)
})

const personas = []

app.get('/form', (req, res) => {

    const data = {
        personas
    }

    return res.render('form', data)
})

app.post('/personas', (req, res) => {
    const persona = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad
    }

    personas.push(persona)

    return res.redirect('/form')
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`)

    server.on('error', error => console.log(`Error en el servidor: ${error}`))
})