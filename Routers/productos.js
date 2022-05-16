const express = require('express')
const { send } = require('express/lib/response')
const { Router } = express
const Container = require('./../Container')

const contenedor = new Container()

let productos = [
    {
        title: "Teclado Bluetooth",
        price: 20000,
        thumbnail: "https://http2.mlstatic.com/D_905396-MLA42715899515_072020-O.jpg",
        id: 1
    },
    {
        title: "HUB USB C",
        price: 11700,
        thumbnail: "https://http2.mlstatic.com/D_905396-MLA42715899515_072020-O.jpg",
        id: 2
    },
    {
        title: "Fuente ATX",
        price: 7500,
        thumbnail: "https://http2.mlstatic.com/D_905396-MLA42715899515_072020-O.jpg",
        id: 3
    }
]

const productosRouter = Router()

productosRouter.get('/api/productos', async (req, res) => {
    res.send( { "Productos": productos } );
})

productosRouter.get('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const producto = productos.find(p => p.id === id)
    producto ? res.send({ "Producto": producto }) : res.send({ error: "Producto no encontrado" })
})

productosRouter.post('/api/productos', async (req, res) => {
    const producto = req.body
    const id = await contenedor.save(producto)
    const productoGuardado = await contenedor.getById(id)
    res.send({ "Nuevo Producto": productoGuardado })
})

productosRouter.put('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const productoIndex = productos.findIndex(producto => producto.id === id)
    if(productoIndex === -1) {
        res.send({ error: "Producto no encontrado" })
    } else {
        productos[productoIndex].title = req.body.title
        productos[productoIndex].price = req.body.price
        productos[productoIndex].thumbnail = req.body.thumbnail

        res.json(productos[productoIndex])
    }
})

module.exports = productosRouter