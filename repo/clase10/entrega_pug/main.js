const express = require('express');
//const { Router } = express;
const app = express();
const Metodos = require("./metodos.js")

let contenedor= new Metodos([])

//const rutaProductos = Router();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use('/static', express.static(__dirname + '/public'));

//Datos de prueba
contenedor.save({
    title: 'PC',
    price: '4000',
    thumbnail: 'image1'
});

//Endpoints
  
app.get('/productos', (peticion, respuesta) => {
    const listaProductos = contenedor.getAll();
    respuesta.render('lista',{
        productos: listaProductos
    })       
});

app.get('/', (peticion, respuesta) => {
    respuesta.render('formulario',{})       
});
  
app.post('/productos', (peticion, respuesta) => {
    const producto = peticion.body;
    contenedor.save(producto);
    respuesta.render('formulario',{})       
});
  
//app.use('/productos', rutaProductos);


const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando: ${server.address().port}`)
})

server.on('error', error=> console.log(`Error: ${error}`));
