import { fork } from 'child_process'
import path from 'path'


function calcular(cant) {
    
    return new Promise((resolve, reject) => {
        //hacemos fork del script

        const hijo = fork('./scripts/calcularRandoms.js');

        hijo.on('message', param => {
            
            if (param == 'listo'){

                hijo.send(cant);

            } else {
                resolve(param)
            }
        })
        //Enviamos un parametro conteniendo la cantidad una vez el script este listo
        //escuchamos el script y al terminar mandamos el mensaje por medio de resolve(mensaje)
    })
}

export { calcular }