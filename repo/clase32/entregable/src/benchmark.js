import autocannon from 'autocannon';
import { PassThrough } from 'stream';

function run (url){
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon ({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst, {outputStream})

    outputStream.on('data', data => buf.push(data))
    inst.on('done', function (){
        process.stdout.write(Buffer.concat(buf))
    })
}
console.log('Corriendo todo el Benchmark en paralelo')

run('http://localhost:8080/info')
run('http://localhost:8080/sumar?a=5&b=100')