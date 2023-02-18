const fs = require('fs');

class Procesos{
    constructor(archivo){
        this.archivo = archivo;
    }

    async getAll(){
        try {
            if(fs.existsSync(this.archivo)){
                console.log('Leyendo archivo');
                let info= await fs.promises.readFile(this.archivo, 'utf8');
                let result= JSON.parse(info);
                console.log('se guardo el contenido en result');
                return result;
            }else{
                return "No se encontro el archivo"
            }
        } catch (error) {
            console.log(error)            
        }
    }
    async getById(id){
        try {
            if(fs.existsSync(this.archivo)){
                let productos= await this.getAll();
                let productById = productos.filter(item=>item.id==id);
                if(productById.length === 0){
                    throw new Error('No se encontro el Id');
                }else{
                    return productById
                }
            }else{
                return "No se encontro el archivo"
            }
            
        } catch (error) {
            console.log(error)
        }
    }

}
module.exports = Procesos