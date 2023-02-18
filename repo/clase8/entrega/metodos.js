class Metodos{
    constructor(productos){
        this.productos= productos;
    }

    save(objeto){

        let id = 1;
        this.productos.forEach((element, index) => {
            if (element.id >= id) {
            id = element.id + 1;
            }
        });
        objeto.id = id;
        this.productos.push(objeto);
        return id;
    }
    getById(id) {
        let objetoSeleccionado = null;
        this.productos.forEach(element => {
            if (element.id == id) {
                objetoSeleccionado = element;
            }
        });
        return objetoSeleccionado;
    }
    getAll() {
        return this.productos;
    }
    deleteById(id) {
        let indexSeleccionado = -1;
        this.productos.forEach((element, index) => {
            if (element.id == id) {
            indexSeleccionado = index;
            }
        });
        if (indexSeleccionado != -1) {
            this.productos.splice(indexSeleccionado, 1);
        }        
      }    
    deleteAll() {
        this.productos = [];
    }
    update(producto){
        this.productos = this.productos.map((element) => {
            if(element.id == producto.id){
                return producto;
            }
            return element;
        });

    } 
}


module.exports = Metodos