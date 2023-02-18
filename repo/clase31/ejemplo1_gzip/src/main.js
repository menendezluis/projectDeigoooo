import express from 'express';
import compression from 'compression'; //instalo con npm i compression

const app = express();
app.use(compression());// lo uso en mi server

const PUERTO = process.argv[2] || 8080;

let saludo = "hola mundo ";

app.get ('/', (req, res) => {
  res.send('hola mundo'); 
  }
);

app.get ('/saludozip', (req, res) => {
  res.send (saludo.repeat(1000)); //repeat x cantidad de veces
  }
);

app.get ('/saludo', (req, res) => {
  
  res.send(saludo);
  }
);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});