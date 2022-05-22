const express = require('express')
const fs = require('fs')
const app = express()

app.engine('coder', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if(err){
            return callback(new Error(err))
        }

        const rendered = content.toString()
            .replace('#title#', options.title)
            .replace('#message#', options.message)

        return callback(null, rendered)
    })
})

app.set('views', './views')
app.set('view engine', 'coder')

app.get('', (req, res) => {
    const data = {
        title: 'Hola',
        message: 'Motor de plantillas propio'
    }

    return res.render('index', data)
})

const PORT = 8080

const Server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

Server.on('error', error => console.log(`Error en el servidor: ${error}`))