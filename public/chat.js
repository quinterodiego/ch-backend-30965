const socket = io()

const serverNotification = document.getElementById('serverNotification')
const usersContainer = document.getElementById('usersContainer')
const sendMessage = document.getElementById('sendMessage')
const messageInput = document.getElementById('messageInput')
const messagesContainer = document.getElementById('messagesContainer')

const { username } = Qs.parse(window.location.search, { 
    ignoreQueryPrefix: true
})

socket.emit('joinChat', { username })

socket.on('notification', data => {
    serverNotification.innerHTML = data
    setTimeout(() => {
        serverNotification.innerHTML = ''
    }, 2000)
})

socket.on('users', data => {
    const users = data
        .map(user => {
            const userTemplate = `
                <li class="clearfix">
                    <img src="https://bootdey.com/img/Content/avatar/avatar${user.avatarId}.png" alt="avatar" />
                    <div class="about">
                        <div class="name">${user.username}</div>
                        <div class="status"> <i class="fa fa-circle online"></i> online </div>                                            
                    </div>
                </li>
            `
            return userTemplate
        })
        .join('')
    
    usersContainer.innerHTML = users
})

socket.on('message', data => {
    const message = `
    <li class="clearfix">
        <div class="message-data text-right">
            <span class="message-data-time">${data.time}, ${data.user.username}</span>
            <img src="https://bootdey.com/img/Content/avatar/avatar${data.user.avatarId}.png" alt="avatar">
        </div>
        <div class="message other-message float-right"> ${data.text} </div>
    </li>             
    `

    messagesContainer.innerHTML += message
})

socket.on('myMessage', data => {
    const message = `
    <li class="clearfix">
        <div class="message-data">
            <span class="message-data-time">${data.time}</span>
        </div>
        <div class="message my-message">${data.text}</div>                                    
    </li>         
    `

    messagesContainer.innerHTML += message
})

sendMessage.addEventListener('click', () => {
    socket.emit('messageInput', messageInput.value)
    messageInput.value = ''
})