const fs = require( 'fs' )
const fileName = 'productos.txt'

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
            console.log( "ID asignado: ", id )
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
}

const c = new Container();

const product = {
    title: "Telcado Bluetooth",
    price: 20000,
    thumbnail: 'https://http2.mlstatic.com/D_905396-MLA42715899515_072020-O.jpg'
}

// Ejecuciones de Prueba

// c.save( product );

// c.getById( 1 );

// c.getAll();

// c.deleteById( 2 );

// c.deleteAll();

module.exports = Container;