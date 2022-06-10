const express = require('express')
const { Router } = express
const productsContainer = require('./../containers/products')
const productsContainerClass = new productsContainer()

const productosRouter = Router()

productsRouter.get('/api/productos', async (req, res) => {
    const products = await productsContainerClass.getAll()
    res.send( { "Productos": products } );
})

productsRouter.get('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const products = await productsContainerClass.getAll()
    const product = products.find(p => p.id === id)
    product ? res.send({ "Producto": product }) : res.send({ error: "Producto no encontrado" })
})

productsRouter.post('/api/productos', async (req, res) => {
    const product = req.body
    const products = await productsContainerClass.getAll()
    const id = products.length + 1
    newProduct = { id: id, ...product }
    await productsContainerClass.save(newProduct)
    res.send({ "Nuevo Producto": newProduct })
})

productsRouter.put('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const products = await productsContainerClass.getAll()
    const productIndex = products.findIndex(producto => producto.id === id)
    if(productIndex === -1) {
        res.send({ error: "Producto no encontrado" })
    } else {
        products[productIndex].title = req.body.title
        products[productIndex].price = req.body.price
        products[productIndex].thumbnail = req.body.thumbnail

        res.json(products[productIndex])
    }
})

productsRouter.delete('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const producto = productos.find(p => p.id === id)
    const productosDelete = productos.filter(p => p.id !== id)
    producto ? res.send({ "Productos": productosDelete }) : res.send({ error: "Producto no encontrado" })
})

module.exports = productsRouter