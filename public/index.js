const socket = io()

const input = document.getElementById('message')
const button = document.getElementById('send')

button.addEventListener('click', () => {
    socket.emit('mensajeCliente', input.value)
})

socket.on('mensajeServidor', (data) => {
    const message = `<br>SocketId: ${data.socketID} --> Mensaje: ${data.mensaje}`
    document.querySelector('p').innerHTML += message
})

socket.on('mensajes', data => {
    const messages = data
        .map(message => `SocketId: ${message.socketID} --> Mensaje: ${message.mensaje}`)
        .join('<br>')

    document.querySelector('p').innerHTML = messages
})