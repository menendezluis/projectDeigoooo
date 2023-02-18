import mongoose from 'mongoose';
import config from '../config.js';

await mongoose.set('strictQuery', true);
await mongoose.connect(config.mongodb.url);

export class ContenedorMongo {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  async save(objeto) {

    let doc = await this.coleccion.create(objeto);

    doc.id = doc._id;

    return doc.id;

  }

  async getById(id) {

    const doc = await this.coleccion.findOne({ '_id': id });
    if (doc){
      doc.id = doc._id;
      return doc;
    }
    return null;

  }

  async update(producto) {

    await this.coleccion.updateOne({'_id': producto._id}, { $set: { ...producto } });

  }

  async getAll() {

    let docs = await this.coleccion.find({});

      docs = docs.map((item) => {

        let obj = {
                  autor: item.autor,
                  texto: item.texto,
                  fyh: item.fyh,
                  id: item._id
                  }
      
      item._id = item.id;

      return obj;
    });
    
    return docs;
  
  }

  async deleteById(id) {

    await this.coleccion.deleteOne({ '_id': id });

  }

  async deleteAll() {

    const doc = await this.coleccion.delete();
  
  }
}

export default ContenedorMongo