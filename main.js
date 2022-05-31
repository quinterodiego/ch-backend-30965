const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

app.set('views', './views')
app.set('view engine', 'ejs')

let users = []
const messages = []

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const { username } = req.body

    res.redirect(`/chat?username=${username}`)
})

app.get('/chat', (req, res) => {
    res.render('chat')
})

const PORT = 8080

httpServer.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))

io.on('connection', socket => {
    console.log(`Nuevo usuario conectado`)
    socket.on('joinChat', ({ username }) => {
        users.push({
            id: socket.id,
            username,
            avatarId: Math.ceil(Math.random() * 6)
        })

        socket.emit('notification', `Bienvenido ${username}`)
        socket.broadcast.emit('notification', `${username} se ha unido al chat`)
        io.sockets.emit('users', users)
    })

    socket.on('messageInput', data => {
        const now = new Date()
        const user = users.find(user => user.id === socket.id)
        const message = {
            text: data,
            time: `${now.getHours()}:${now.getMinutes()}`,
            user
        }

        messages.push(message)

        socket.emit('myMessage', message)
        socket.emit('message', message)
    })
})