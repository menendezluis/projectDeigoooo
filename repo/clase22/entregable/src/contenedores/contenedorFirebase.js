import admin from 'firebase-admin';
import serviceAccount from '../config.js';
//import serviceAccount from '../proyectofinal.json' assert { type: "json" };

admin.initializeApp({
  //credential: admin.credential.cert(serviceAccount)
  credential: admin.credential.cert(serviceAccount.firebase)
});

export class ContenedorFirebase {
  constructor( nombreColeccion ) {
    const db = admin.firestore();
    this.query = db.collection(nombreColeccion);
  }
  
    async save(objeto) {
      let doc = await this.query.add({objeto});
      return doc.id;
    }
  
    async getById(id) {
      let productos = await this.getAll();
      let producto = null;
      productos.forEach( (element) => {
        if( element.id === id ){
          producto = element;
        };
      });
      return producto;
    }

    async getByIdCarritos(id) {
      let productos = await this.getAllMensajes();
      let producto = null;
      productos.forEach( (element) => {
        if( element.id === id ){
          producto = element;
        };
      });
      return producto;
    }
  
    async getAll() {
      let productos = await this.query.get();
      let nuevoArray = [];
      let otroArray = [];
      productos.forEach((producto)=>{        
        nuevoArray.push({id:producto.id, ...producto.data()});        
      });
      nuevoArray.forEach((element) => {
        otroArray.push({
                        title: element.objeto.title,
                        price: element.objeto.price,
                        thumbnail: element.objeto.thumbnail,
                        id: element.id
                      });
      });
      return otroArray;
    }

    async getAllMensajes() {
      let productos = await this.query.get();
      let nuevoArray = [];
      let otroArray = [];
      productos.forEach((producto)=>{        
        nuevoArray.push({id:producto.id, ...producto.data()});        
      });
      nuevoArray.forEach((element) => {
        otroArray.push({
                        autor: element.objeto.autor,
                        texto: element.objeto.texto,
                        fyh: element.objeto.fyh,
                        id: element.id
                      });
      });
      return otroArray;
    }

    
    async update(producto,id) {
      await this.query.doc(id).update(producto);
    }
  
    async deleteById(id) {
      await this.query.doc(id).delete();
      
    }
  
    async deleteAll() {
      await this.query.get().then(querySnapshot => {
        querySnapshot.docs.forEach(snapshot => {
            snapshot.ref.delete();
        })
    })
    }
  }

  export default ContenedorFirebase