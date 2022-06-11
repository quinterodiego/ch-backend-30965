const express = require('express')
const { Router } = express
const productsContainer = require('../containers/products')
const productsContainerClass = new productsContainer()

const router = Router()

router.get('/api/productos', async (req, res) => {
    const products = await productsContainerClass.getAll()
    res.send( { "Productos": products } );
})

router.get('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const products = await productsContainerClass.getAll()
    const product = products.find(p => p.id === id)
    product ? res.send({ "Producto": product }) : res.send({ error: "Producto no encontrado" })
})

router.post('/api/productos', async (req, res) => {
    const product = req.body
    const products = await productsContainerClass.getAll()
    const id = products.length + 1
    newProduct = { id: id, ...product }
    await productsContainerClass.save(newProduct)
    const newProductsList = await productsContainerClass.getAll()
    res.send({ "Productos (POST)": newProductsList })
})

router.put('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const newProduct = req.body
    await productsContainerClass.updateById(id, newProduct)
    const products = await productsContainerClass.getAll()
    res.json(products)
})

router.delete('/api/productos/:id', async (req, res) => {
    const id = Number(req.params.id)
    const products = await productsContainerClass.getAll()
    const product = products.find(p => p.id === id)
    const productsDelete = products.filter(p => p.id !== id)
    if(product) {
        await productsContainerClass.deleteById(id)
        res.send({ "Productos": productsDelete })
    } else { 
        res.send({ error: "Producto no encontrado" })
    }
})

module.exports = router