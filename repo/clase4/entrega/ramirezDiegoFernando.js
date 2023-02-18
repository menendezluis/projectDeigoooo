const fs = require('fs');

class Contenedor{
    constructor(archivo){
        this.archivo= archivo;
    }

    save=async(producto)=>{
        try {
         if(fs.existsSync(this.archivo)){
            let productos= await this.getAll();
            if( productos.length>0){
                let lastId=productos[productos.length-1].id+1
                let newProduct={
                id: lastId ,
                ...producto}
                productos.push(newProduct);
                await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
                return lastId;
            }else{
                let lastId=1
                let newProduct={
                id: lastId,
                ...producto}
                productos.push(newProduct);
                await fs.promises.writeFile(this.archivo,JSON.stringify(productos,null,2))
                return lastId;
            }     
        }else{
            let newProduct={
            id:1,
            title: producto.title,
            price: producto.price,
            thumbnail: producto.thumbnail}
            await fs.promises.writeFile(this.archivo,JSON.stringify([newProduct],null,2));
            return 1;
        }
        } catch (error) {
            console.log(error)
       }
    }
    geById=async(id)=>{
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
    getAll=async()=>{
        try {
            if(fs.existsSync(this.archivo)){
                let info= await fs.promises.readFile(this.archivo, 'utf8');
                let result= JSON.parse(info);
                return result;
            }else{
                return "No se encontro el archivo"
            }
        } catch (error) {
            console.log(error)            
        }
    }
    deleteById=async(id)=>{
        try {
            if(fs.existsSync(this.archivo)){
                let productos= await this.getAll();
                productos.splice(id-1,1)
                await fs.promises.writeFile(this.archivo,JSON.stringify([productos],null,2));
            }
        } catch (error) {
            
        }
    }
    deleteAll=async()=>{
        try {
            if(fs.existsSync(this.archivo)){
                await fs.promises.writeFile(this.archivo,JSON.stringify([ ],null,2));
            }
            
        } catch (error) {
            
        }

    }
}

module.exports = Contenedor