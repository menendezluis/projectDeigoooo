import { Router } from 'express'

import path from 'path'

const authWebRouter = new Router()

authWebRouter.get('/', (req, res) => {
    //res.redirect('/home');
     if (req.session.nombre){
        res.redirect('/home');
    }else {
        res.redirect('/login');
    } 
    //Si la sesion no existe, redirigir a login, sino redirigir a home
    
})

authWebRouter.get('/login', (req, res) => {
    //Si ya existe una sesion, redirigir al home
    res.sendFile(process.cwd() + '/views/login.html')
})

authWebRouter.get('/logout', (req, res) => {
    //Obtener el nombre del usuario
    const nombre = req.session.nombre
    //Eliminar la sesion con destroy
    if (!nombre) {
        console.log('usuario ya habia sido eliminado');
        return res.redirect('/home');        
    }
    
    req.session.destroy();
    res.render(process.cwd() + '/views/pages/logout.ejs', { nombre: `${nombre}`});

})


authWebRouter.post('/login', (req, res) => {
    console.log(req.body);
    //Guardar el nombre que viene en el body en la sesion.
    req.session.nombre= req.body.nombre;
    res.redirect('/home')
})



export default authWebRouter