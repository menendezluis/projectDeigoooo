import { Router } from 'express'
import { webAuth } from '../../auth/index.js'

import path from 'path'

const productosWebRouter = new Router()

productosWebRouter.get('/', (req, res) => {
    res.redirect('/home')
})

productosWebRouter.get('/home', webAuth, (req, res) => {
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), {
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value,
        contador: req.user.contador
    })
})

productosWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})



productosWebRouter.get('/info', (req, res) => {
    //To Do calcular datos y mandar a la plantilla
     let memoria= '';
    for(const [key,value] of Object.entries(process.memoryUsage())){
        memoria= `Memory usage by ${key}, ${value/1000000}MB `;
    } 

    res.render(path.join(process.cwd(), '/views/pages/info.ejs'), {specs: [{
        title: 'Argumentos de entrada',
        value: 'este no se a que hace referencia',
        title: 'Process id',
        value: process.pid,
        title: 'Nombre de la plataforma',
        value: process.platform,
        title: 'Version de Node',
        value: process.version,
        title: 'Memoria total reservada',
        value: `${memoria}`,
        title: 'Path de ejecucion',
        value: process.execPath,
        title: 'Carpeta del proyecto',
        value: process.cwd()


    }]})
})

export default productosWebRouter