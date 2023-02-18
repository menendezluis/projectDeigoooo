import express from 'express';
import cluster from 'cluster';
import { cpus } from 'os';

const PUERTO = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == 'CLUSTER';

function isPrime(num){
    for ( let i = 2; i < num; i++ ) {
        if (num % i === 0 )return false;
        return num > 1;
    }
}

if (modoCluster && cluster.isPrimary){
    const numCPUs = cpus().length
    console.log(`Numero de procesadores: ${numCPUs}`);
    console.log(`PID Master: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();        
    }

    cluster.on('exit', worker => {
        console.log('Worker ', worker.process.pid, ' murio', new Date().toDateString());
        cluster.fork();
    })
} else {

    const app = express();

    app.get ('/', (req, res) => {

        const { max } = req.query
        const primes = [];
        const maxNumber = max ? Number(max) : 1000

        for (let i = 0; i < maxNumber; i++) {
            if (isPrime(i)) primes.push(i);            
        }

        res.json(primes);

        }
      );
      
      app.listen(PUERTO, () => {
        console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
        console.log(`PID WORKER ${process.pid}`);
      });
}

