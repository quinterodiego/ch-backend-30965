const express = require('express')
const { Router } = express
const cartsContainer = require('../containers/carts')
const cartsContainerClass = new cartsContainer()

const router = Router()

router.post('/api/carrito', async (req, res) => {
    const cart = req.body
    const id = await cartsContainerClass.addNewCart(cart)
    res.json({ id: id })
})

router.delete('/api/carrito/:id', (req, res) => {
    const id = Number(req.params.id)
    const carts = await cartsContainerClass.getAllCarts()
    const cart = carts.find(c => c.id === id)
    const cartsFilter = carts.filter(c => c.id !== id)
    if(cart) {
        await cartsContainerClass.deleteById(id)
        res.send({ "Carritos": cartsFilter })
    } else { 
        res.send({ error: "Producto no encontrado" })
    }
})