const Contenedor = require("./ramirezDiegoFernando.js")

let contenedor= new Contenedor("productos.txt")

let producto1 ={
    title:"Papitas",
    price:100,
    thumbnail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"
}
let producto2 ={
    title:"zanahoria",
    price:300,
    thumbnail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"

}
let producto3 ={
    title:"Tomates",
    price:200,
    thumbnail:"https://www.comedera.com/wp-content/uploads/2022/04/Papas-rusticas-shutterstock_2022241940.jpg"
}

metodos=async()=>{
    //await contenedor.deleteAll()
    console.log( await contenedor.save(producto1))
    console.log( await contenedor.save(producto2))
    console.log( await contenedor.save(producto3))
    //await contenedor.deleteById(5)
    console.log( await contenedor.getAll())    
    //console.log(await contenedor.geById(8))
}
metodos()