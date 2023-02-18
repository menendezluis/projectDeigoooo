import * as dotenv from 'dotenv'; 

dotenv.config();

let productosApi;
let mensajesApi;

console.log(`en index.js ${process.env.DB}`);

switch (process.env.DB) {
  
  case 'mongodb':
  
    const { default: ContenedorMongo } = await import('./contenedores/contenedorMongo.js');

    productosApi = new ContenedorMongo(
                  'productos', {
                    title: { type: String, require: true },
                    price: { type: String, require: true },
                    thumbnail: { type: String, require: true }
                  });
                  
    mensajesApi = new ContenedorMongo(
                  'mensajes', {
                    autor: { type: {}, require: true },
                    texto: { type: String, require: true },
                    fyh: { type: String }
                  });

    console.log('estamos en mongodb');
  break;
  
  case 'fs':

    const { default: ContenedorMemoria } = await import('./contenedores/ContenedorMemoria.js');
    
    productosApi = new ContenedorMemoria();
    mensajesApi = new ContenedorMemoria();
  
    console.log('estamos en fs');
  break;

  case 'firebase':
      
    const { default: ContenedorFirebase } = await import('./contenedores/ContenedorFirebase.js');     

    productosApi = new ContenedorFirebase('productos');
    mensajesApi = new ContenedorFirebase('mensajes');

    console.log('estamos en firebase');
  break;

  default:
    /*
    const { default: ProductosDaoMemoria } = await import('./productos/productosDaoMemoria.js');
    const { default: CarritosDaoMemoria } = await import('./carritos/carritosDaoMemoria.js');

    productos = new ProductosDaoMemoria();
    carritos = new CarritosDaoMemoria();
    */
    console.log('estamos en memoria');
  break;
}

export { productosApi, mensajesApi }