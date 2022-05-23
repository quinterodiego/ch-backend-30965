const express = require('express')

const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => res.json({ status: 'ok' }))
app.get('/hello', (req, res) => {
    const data = {
        mensaje: 'Aprendiendo Pug JS'
    }
    return res.render('hello', data)
})

const PORT = 8080

const Server = app.listen(PORT, () => console.log(`Servidor corriendo en el puesto: ${PORT}`))

Server.on('error', error => console.log(`Error en el servidor: ${error}`))