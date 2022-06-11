const express = require('express')
const app = express()
const productRouter = require('./routers/products')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/productos', productRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))