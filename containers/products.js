const fs = require( 'fs' )
const fileName = './db/products.txt'

class Container {
    constructor() {
        this.path = fileName
    }

    readFile = async ( file ) => {
        const data = await fs.promises.readFile( file, 'utf-8' )
        return JSON.parse( data )
    }

    save = async ( product ) => {
        try {
            const dataArray = await this.readFile( this.path )
            const id = dataArray.length + 1
            const newProduct = { ...product, id }
            dataArray.push( newProduct )
            const newProductJSON = JSON.stringify( dataArray, null, 2 )
            await fs.promises.writeFile( this.path, newProductJSON )
            return id
        } catch (error) {
            console.error(error)
        }
    }

    getById = async ( id ) => {
        try {
            const dataArray = await this.readFile( this.path )
            const product = dataArray.find(p => p.id == id)
            return product
        } catch (error) {
            console.error(error)
        }
    }

    getAll = async () => {
        try {
            const dataArray = await this.readFile( this.path )
            return dataArray
        } catch (error) {
            console.error(error)
        }
    }

    deleteById = async ( id ) => {
        try {
            const dataArray = await this.readFile( this.path )
            const products = dataArray.filter((p => p.id !== id))
            const newProducts = JSON.stringify( products, null, 2 )
            await fs.promises.writeFile( this.path, newProducts )
        } catch (error) {
            console.error(error)
        }
    }

    deleteAll = async () => {
        try {
            await fs.promises.writeFile( this.path, '[]' )
        } catch (error) {
            console.error(error)
        }
    }

    async updateById (id, product) {
        const products = await this.getAll();
        product.id = id
        const productsFilter = products.filter(p => p.id !== id)
        const newProducts = [...productsFilter, product]
        const productsString = JSON.stringify(newProducts, null, 2);
        await fs.promises.writeFile(this.path, productsString, 'utf-8');

        return productsString;
    }
}

module.exports = Container;