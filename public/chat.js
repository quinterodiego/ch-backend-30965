const socket = io()

const { username } = Qs.parse(window.location.search, { 
    ignoreQueryPrefix: true
})

socket.emit('joinChat', { username })