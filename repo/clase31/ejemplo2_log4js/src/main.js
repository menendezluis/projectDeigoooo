import express from 'express';
import compression from 'compression'; //instalo con npm i compression
import log4js from 'log4js';

const app = express();
app.use(compression());// lo uso en mi server

const PUERTO = process.argv[2] || 8080;

let saludo = "hola mundo ";

/* log4js.configure({
    appenders:{
        miLoggerConsole: { type: "console" },
        miLoggerFile1: { type: 'file', filename: 'logs/app.log' },
        miLoggerFile2: { type: 'file', filename: 'logs/app2.log' }
    },
    categories:{
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        consola: { appenders: ["miLoggerConsole"], level: "debug" },
        archivo1: { appenders: ["miLoggerFile1"], level: "warn" },
        archivo2: { appenders: ["miLoggerFile2"], level: "info" },
        todos: { appenders: ["miLoggerConsole", "miLoggerFile1"], level: "error" }
    }
}) */

log4js.configure({
    appenders:{
        consola: { type: "console"},
        archivo: { type: "file", filename: 'logs/errores.log' },
        loggerConsola: { type: "logLevelFilter", appender: "consola", level: "trace"},
        loggerArchivo: { type: "logLevelFilter", appender: "archivo", level: "trace"}
    },
    categories:{
        default: { appenders: ['loggerConsola'], level: 'all' },       
        custom: { appenders: ['loggerConsola', 'loggerArchivo'], level: 'all'} 
    }

})

const logger = log4js.getLogger("default");
logger.trace("Trace");
logger.debug("Debug");
logger.info("Info");
logger.warn("Warn");
logger.error("Error");

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