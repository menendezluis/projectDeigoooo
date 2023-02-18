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

    res.sendStatus(200);

});
      
app.get('/auth-bloq', (req, res) => {
    let username = req.query.username ? req.query.username : "";
    const password = req.query.password ? req.query.password : "";

    username = username.replace(/[!@#$%^&*]/g,"");//trim es para eliminar los espacios y el replace para reemplazar

    if (!username || !password || !users[username]) {
        process.exit(1);
    }

    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    if (crypto.timingSafeEqual(hash, encryptHash)){
        res.sendStatus(200);
    } else {
        process.exit(1);
    }

});

app.get('/auth-nobloq', (req, res) => {
    let username = req.query.username ? req.query.username : "";
    const password = req.query.password ? req.query.password : "";

    username = username.replace(/[!@#$%^&*]/g,"");//trim es para eliminar los espacios y el replace para reemplazar

    if (!username || !password || !users[username]) {
        process.exit(1);
    }

    crypto.pbkdf2(password, users[username].salt, 10000, 512, "sha512",(err,hash) => {
        if (users[username].hash.toString() === hash.toString()){
            res.sendStatus(200);
        } else {
            process.exit(1);
        }
    });
});

const server = app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en el puerto: ${PUERTO}`);
    console.log(`PID ${process.pid}`);
});

server.on('error', (error) => console.log(`Error en servidor: ${error}`));

