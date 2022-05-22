const express = require('express')
const { engine } = require('express-handlebars')
const app = express()

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: `${__dirname}/views/index`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
}))

app.set('views', './views')
app.set('view engine', 'hbs')

const jugadores = [
    { nombre: 'Agustín Rossi', puesto: 'Arquero', numero: 1 },
    { nombre: 'Luis Advíncula', puesto: 'Lateral', numero: 17 },
    { nombre:'Carlos Izquierdoz' , puesto: 'Central', numero: 24 },
    { nombre: 'Marcos Rojo', puesto: 'Central', numero: 6 },
    { nombre: 'Frank Fabra', puesto: 'lateral', numero: 18 },
    { nombre: 'Alan Varela', puesto: 'Volante', numero: 33 },
    { nombre: 'Guillermo Fernandez', puesto: 'Volante', numero: 8 },
    { nombre: 'Oscar Romero', puesto: 'Volante', numero: 11 },
    { nombre: 'Sebastian Villa', puesto: 'Delantero', numero: 22 },
    { nombre: 'Eduardo Salvio', puesto: 'Delantero', numero: 10 },
    { nombre: 'Darío Benedetto', puesto: 'Delantero', numero: 9 }
]

app.get('/', (req, res) => {
    const data = {
        jugadores
    }
    console.log(data)
    return res.render('layouts/main', data)
})

const PORT = 8080

const Server = app.listen(PORT, console.log(`Servidor corriendo en el puerto ${PORT}`))

Server.on('error', error => console.log(`Error en el servidor: ${error}`))