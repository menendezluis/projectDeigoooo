
process.on('message', cant => {
    console.log (`llegamos a calcularrandoms ${cant}`)
    const numbers = {}
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000)
        if (!numbers[randomNumber]) {
            numbers[randomNumber] = 0
        }
        numbers[randomNumber]++
    }
    console.log(numbers);
    process.send(numbers);
})

process.send('listo')
