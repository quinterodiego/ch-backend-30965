const fs = require('fs')
const fileName = 'MiArchivo.json'

class Container {
    constructor(){
        this.path = fileName
    }

    save = async () => {
        await fs.promises.writeFile(this.path, 'utf-8')
    }
}

const c = new Container();
c.save();