const fs = require( 'fs' )
const fileName = 'productos.txt'

class Container {
    constructor() {
        this.path = fileName
    }

    save = async ( product ) => {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const dataArray = JSON.parse( data )
        const id = dataArray.length + 1
        const newProduct = { ...product, id }
        dataArray.push( newProduct )
        const newProductJSON = JSON.stringify( dataArray, null, 2 )
        await fs.promises.writeFile( this.path, newProductJSON )
        console.log( "ID asignado: ", id )
    }

    getById = async ( id ) => {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const dataArray = JSON.parse( data )
        const product = dataArray.find(p => p.id = id)
        console.log(product)
    }

    getAll = async () => {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const dataArray = JSON.parse( data )
        console.log( "Data: ", dataArray )
    }

    deleteById = async ( id ) => {
        const data = await fs.promises.readFile( this.path, 'utf-8' )
        const dataArray = JSON.parse( data )
        const products = dataArray.filter((p => p.id !== id))
        const newProducts = JSON.stringify( products, null, 2 )
        await fs.promises.writeFile( this.path, newProducts )
    }

    deleteAll = async () => {
        await fs.promises.writeFile( this.path, '[]' )
    }
}

const c = new Container();

const product = {
    title: "Telcado Bluetooth",
    price: 20000,
    thumbnail: 'https://http2.mlstatic.com/D_905396-MLA42715899515_072020-O.jpg'
}

// c.save( product );
// c.getById( 2 );
// c.getAll();
// c.deleteById(2);
// c.deleteAll();