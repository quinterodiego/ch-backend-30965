const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('./public'))

const users = []

app.post('/form', (req, res) => {
    const user = req.body
    user.id = users.length + 1
    users.push(user)
    
    
    return res.json(user)
})

const PORT = 8080

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))