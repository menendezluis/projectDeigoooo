import passport from 'passport';

import { Router } from 'express'

import bCrypt from 'bcrypt';
import { modeloUsuario } from '../../models/usuario.js';
import session from 'express-session'

import path from 'path'
import { Strategy } from 'passport-local';
import { config } from 'process';

//funcion para encriptar password

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};

const isValidPassword = (password, usuario) => {
    return bCrypt.compareSync(password, usuario.password);
};

passport.use('register', new Strategy({
    passReqToCallback: true
  }, (req, username, password, done) => {

    modeloUsuario.findOne({'username': username}, (err, usuario)=>{
        if (err) {
            return done(err,false);
        }

        if (usuario){
            return done(err,false);
        }

        const nuevoUsuario = {
            username: username,
            password: createHash(password),
            email: username,
        }

        modeloUsuario.create(nuevoUsuario, (err, usuarioCreado)=>{
            if (err){
                return done(err,false);
            }
            console.log('usuario registrado');
            return done(null,usuarioCreado);
        })
    })
  })
);
  
passport.use('login', new Strategy((username, password, done) => {

    modeloUsuario.findOne({ username: username}, (err,usuario)=> {
        if (err){
            return done(null,false);
        }

        if(!usuario){
            return done(null,false);
        };

        if (!isValidPassword(password, usuario)){
            return done(null,false);
        }

        console.log('Login realizado con exito');
        return done(null, usuario);
    });

}));


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((_id, done) => {
    modeloUsuario.findById(_id, done);
});

const authWebRouter = new Router()

authWebRouter.use(session({
    secret: 'misecreto123',
    cooki: {
        maxAge: 600000
    },
    resave: false,
    saveUninitialized: false,
    rolling: true,
}));

authWebRouter.use(passport.initialize());
authWebRouter.use(passport.session());

authWebRouter.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/login.html'))
    }
})

authWebRouter.post('/login', passport.authenticate('login',
    {
        successRedirect: '/',
        failureRedirect: '/faillogin'
    }
));

authWebRouter.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        res.sendFile(path.join(process.cwd(), '/views/register.html'))
    }
})

authWebRouter.post('/register', passport.authenticate('register',
    {
        successRedirect: '/',
        failureRedirect: '/failregister'
    }
));


authWebRouter.get('/faillogin', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/login-error.html'))
})

authWebRouter.get('/failregister', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/register-error.html'))
})

authWebRouter.get('/logout', (req, res) => {
    const username = req.user?.username ?? 'visitante'
    req.logout()
    res.render(path.join(process.cwd(), '/views/pages/logout.ejs'), { username })
})

export default authWebRouter