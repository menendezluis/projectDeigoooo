import express from 'express';
import compression from 'compression'; //instalo con npm i compression
import log4js from 'log4js';
import cluster from 'cluster';
import os from 'os';

const numProcesadores = os.cpus().length;

const app = express();
app.use(compression());// lo uso en mi server

const PUERTO = process.argv[2] || 8080;

let saludo = "hola mundo ";

log4js.configure({
    appenders:{
        miLoggerConsole: { type: "console" },
        miLoggerFile1: { type: 'file', filename: 'logs/info.log' },
        miLoggerFile2: { type: 'file', filename: 'logs/error.log' },
        miLoggerFile3: { type: 'file', filename: 'logs/warn.log' }
    },
    categories:{
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        consola: { appenders: ["miLoggerConsole"], level: "debug" },
        archivo1: { appenders: ["miLoggerFile1"], level: "info" },
        archivo2: { appenders: ["miLoggerFile2"], level: "error" },
        archivo3: { appenders: ["miLoggerFile3"], level: "warn" },
        todos: { appenders: ["miLoggerConsole", "miLoggerFile1"], level: "info" }
    }
})

const logger = log4js.getLogger("todos");
const error = log4js.getLogger("archivo2");
const warn = log4js.getLogger("archivo3"); 

if (cluster.isPrimary && process.argv[3]== 'CLUSTER') {
    console.log(`Nuevo master: ${process.pid} corriendo, con ${numProcesadores} workers`);
  
    for (let i = 0 ; i < numProcesadores ; i++) {
      cluster.fork(); // node server.js //modo-worker
    }
  
    cluster.on('exit', (worker) => {
      console.log(`El worker ${worker.process.pid} ha muerto`);
      cluster.fork(); // node server.js //modo-worker
    }); 
  
  } else {

        app.get ('/info', (req, res) => {
            logger.info(`endpoint correcto en el PID ${process.pid}`);
            res.send (saludo.repeat(1000)); //repeat x cantidad de veces 
        }
        );

        app.get ('/sumar', (req, res) => {
            const {a,b}=req.query;
            if (Number(a)&&Number(b)){
            logger.info(`La suma es ${parseInt(a) +  parseInt(b)}`);
            res.send(`La suma es ${parseInt(a) +  parseInt(b)}`);
            } else {
            error.error("Los numeros no son validos");
            res.send("Los numeros no son validos");
            }    
            }
        )

        app.get('/randoms', (req, res) => {
            res.send(`Servidor express en Puerto: ${PUERTO}, Workers: ${numProcesadores}, PID: ${process.pid} - ${(new Date()).toLocaleString()}`);
        });

        app.get('/datos', (req, res) => {
            res.send(`Servidor express en Puerto: ${PUERTO}, Workers: ${numProcesadores}, PID: ${process.pid} - ${(new Date()).toLocaleString()}`);
        }); 

        app.listen(PUERTO, () => {
        console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
        });

}