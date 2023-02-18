import express from 'express';
import compression from 'compression'; //instalo con npm i compression
import winston from 'winston';

const app = express();
app.use(compression());// lo uso en mi server

const PUERTO = process.argv[2] || 8080;

let saludo = "hola mundo ";

const logger = winston.createLogger({
  level: 'warn',
  transports: [
    new winston.transports.Console({ level: 'verbose'}),
    new winston.transports.File({ filename: 'info.log', level: 'error'}),
  ]
});

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
    //git logger('info', `La suma es ${parseInt(a) +  parseInt(b)}`);
    logger.info(`La suma es ${parseInt(a) +  parseInt(b)}`);
    res.send(`La suma es ${parseInt(a) +  parseInt(b)}`);
  } else {
    //logger('error', "Los parametros no son validos");
    logger.error("Los numeros no son validos");
    res.send("Los numeros no son validos");
  }  
  }
);

app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
});