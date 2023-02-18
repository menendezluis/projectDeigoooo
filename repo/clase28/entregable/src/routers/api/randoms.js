import { Router } from 'express'
import { calcular } from '../../api/randoms.js'

const randomsApiRouter = new Router()

randomsApiRouter.get('/api/randoms', async (req, res) => {
    //Obtener cantidad por query params
    let cantidad= parseInt(req.query.cant);

    if (isNaN(cantidad)){
        cantidad = 100000000;
    }

    const result = await calcular(cantidad);

    res.json({
        resultado: result
    });
    //llamar la funcion del api, mandar la cantidad y recibir el resultado
    // res.json(result)
})

export default randomsApiRouter