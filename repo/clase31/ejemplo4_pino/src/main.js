import express from 'express';
import compression from 'compression'; //instalo con npm i compression
import logger from 'pino';

const app = express();
app.use(compression());// lo uso en mi server

const PUERTO = process.argv[2] || 8080;

let saludo = "hola mundo ";

const child = logger().child({ a: 'property'});
child.info('hola mundo');

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

app.get ('/sumar', (req, res) => {
  const {a,b}=req.query;
  if (Number(a)&&Number(b)){
    child.info(`La suma es ${parseInt(a) +  parseInt(b)}`);
    res.send(`La suma es ${parseInt(a) +  parseInt(b)}`);
  } else {
    child.error("Los numeros no son validos");
    res.send("Los numeros no son validos");
  }  
  }
);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});