const fs = require( 'fs' )
const fileName = './db/carts.txt'
const productsContainer = require('./products')
const productsContainerClass = new productsContainer()

class Container {
    constructor() {
        this.path = fileName
    }

    readFile = async ( file ) => {
        const data = await fs.promises.readFile( file, 'utf-8' )
        return JSON.parse( data )
    }

    addNewCart = async ( cart ) => {
        try {
            const dataArray = await this.readFile( this.path )
            const id = dataArray.length + 1
            const newCart = { ...cart, id }
            dataArray.push( newCart )
            const newCartString = JSON.stringify( dataArray, null, 2 )
            await fs.promises.writeFile( this.path, newCartString )
            return id
        } catch (error) {
            console.error(error)
        }
    }

    addNewProductToCart = async ( idCart, idProduct ) => {
        try {
            const cartsArray = await this.readFile(this.path)
            const cart = cartsArray.find(c => c.id === idCart)
            const cartsFilter = cartsArray.filter(c => c.id !== idCart)
            const product = productsContainerClass.getById(idProduct)
            cart.products.push(product)
            // UPDATE
        } catch (error) {
            console.log(error)
        }
    }

    getAllCarts = async () => {
        const dataArray = await this.readFile(this.path)
        return dataArray 
    }

    getProductsByCartId = async ( id ) => {
        try {
            const dataArray = await this.readFile( this.path )
            const cart = dataArray.find(c => c.id === id)
            return cart
        } catch (error) {
            console.error(error)
        }
    }

    deleteById = async ( id ) => {
        try {
            const dataArray = await this.readFile( this.path )
            const carts = dataArray.filter((c => c.id !== id))
            const newCartString = JSON.stringify( carts, null, 2 )
            await fs.promises.writeFile( this.path, newCartString )
        } catch (error) {
            console.error(error)
        }
    }

    deleteProductOnCart = async ( idCart, idProduct ) => {
        
    }
}