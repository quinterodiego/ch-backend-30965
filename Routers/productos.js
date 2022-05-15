const express = require('express')
const { Router } = express
const Container = require('./../Container')

const contenedor = new Container()

const productosRouter = Router()

productosRouter.get('/api/productos', async (req, res) => {
    const productos = await contenedor.getAll();
    res.send( { "Productos": productos } );
})

productosRouter.get('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const producto = await contenedor.getById(id)
    res.send({ "Producto": producto })
})

productosRouter.post('/api/productos', async (req, res) => {
    const producto = req.body
    const id = await contenedor.save(producto)
    const productoGuardado = await contenedor.getById(id)
    res.send({ "Nuevo Producto": productoGuardado })
})

module.exports = productosRouter