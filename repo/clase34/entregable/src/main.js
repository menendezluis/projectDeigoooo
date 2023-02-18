import express from 'express';
import compression from 'compression'; //instalo con npm i compression

const app = express();
app.use(compression());// lo uso en mi server

const PUERTO = process.argv[2] || 8080;

let saludo = "hola mundo ";

app.get ('/', (req, res) => {
  res.send('el /index es mas interesante'); 
  }
);

app.get ('/index', (req, res) => {
    const nombre = req.query.nombre ? req.query.nombre : "Usuario"; 
    res.send (`Hola ${nombre} que gusto que estes por aca`); //repeat x cantidad de veces
  }
);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});