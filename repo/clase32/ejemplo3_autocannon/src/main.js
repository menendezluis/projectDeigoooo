//curl -X GET "http://localhost:8080/newUser?username=diego&password=caca"  => curl simula ser un navegador"
//artillery quick -c 10 -n 50 "http://localhost:8080/auth-bloq?username=diego&password=caca" > resultado_bloq.txt => hace 10 arrivos con 50 get c/u
//node --prof src/main.js => arrancamos en modo profiler (genera un archivo con los logs)


import express from 'express';
import crypto from 'crypto';

const PUERTO = parseInt(process.argv[2]) || 8080;

const users = {}

const app = express();

app.use(express.static('public'));

app.get ('/getUsers', (req, res) => {

    res.json({ users });

    }
);

app.get ('/newUser', (req, res) => {
    let username = req.query.username ? req.query.username : "";
    const password = req.query.password ? req.query.password : "";

    username = username.trim().replace(/[!@#$%^&*]/g,"");//trim es para eliminar los espacios y el replace para reemplazar

    if (!username || !password || users[username]) {
        return res.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    users[username] = {salt, hash};

    res.status(200).send('Usuario creado');

});
      
app.get('/auth-bloq', (req, res) => {
    let username = req.query.username ? req.query.username : "";
    const password = req.query.password ? req.query.password : "";

    username = username.replace(/[!@#$%^&*]/g,"");//trim es para eliminar los espacios y el replace para reemplazar

    if (!username || !password || !users[username]) {
        res.sendStatus(401);
    }

    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    if (crypto.timingSafeEqual(hash, encryptHash)){
        res.status(200).send('Usuario creado con auth bloqueante');
    } else {
        res.sendStatus(401);
    }

});

app.get('/auth-nobloq', (req, res) => {
    let username = req.query.username ? req.query.username : "";
    const password = req.query.password ? req.query.password : "";

    username = username.replace(/[!@#$%^&*]/g,"");//trim es para eliminar los espacios y el replace para reemplazar

    if (!username || !password || !users[username]) {
        res.sendStatus(401);
    }

    crypto.pbkdf2(password, users[username].salt, 10000, 512, "sha512",(err,hash) => {
        if (users[username].hash.toString() === hash.toString()){
            res.status(200).send('Usuario creado con auth NO bloqueante');
        } else {
            res.sendStatus(401);
        }
    });
});

const server = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
    console.log(`PID ${process.pid}`);
});

server.on('error', (error) => console.log(`Error en servidor: ${error}`));

