const socket = io()

const tbProductos = document.getElementById('productos')
const newProduct = document.getElementById('newProduct')

socket.on('productos', data => {
    console.log(data)
    const productos = data.map( producto => {
        const productosTemplate = `
        <tr>
            <th scope="row">${producto.id}</th>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td>
                <img src="${producto.thumbnail}" width="75"/>
            </td>
        </tr>
        `
        return productosTemplate
    } )
    .join('')

    tbProductos.innerHTML = productos
})

newProduct.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    socket.emit('newProduct', {title, price, thumbnail});
    title.value = "";
    price.value = "";
    thumbnail.value = "";
})

const inputEmail = document.getElementById('inputEmail')
const inputMessage = document.getElementById('inputMessage')
const sendMessage = document.getElementById('sendMessage')
const messagesContainer = document.getElementById('mensajes')

socket.on('messages', data => {
    const mensajes = data.map(mensaje => {
        const messageTemplate = `
            <p>${mensaje.email} [${mensaje.time}]: ${mensaje.message}</p>
        `
        return messageTemplate
    })
    .join('')

    messagesContainer.innerHTML = mensajes
})

sendMessage.addEventListener('click', () => {
    const d = new Date
    const time = [
        d.getMonth()+1,
        d.getDate(),
        d.getFullYear()
    ].join('/')+' '+ [
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ].join(':')
    const newMessage = {
        email : inputEmail.value,
        time: time,
        message: inputMessage.value
    }

    socket.emit('newMessage', newMessage)
})
