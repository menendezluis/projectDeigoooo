const express = require("express");
const Procesos = require("./procesos.js");

const procesos = new Procesos("productos.txt");
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.send(`<div style="border:black 1px solid; color:red;"> <h1 style="text-align: center">SOY DIEGO RAMIREZ Y ESTE ES MI BACK</h1> </div>`);
});

app.get("/productos", (req, res) => {    
    const todos = async () => {
        const arrayCompleto = await procesos.getAll();
        let formato= ``;
        arrayCompleto.map(
            item=>(formato +=   `<table style="border:black 1px solid;">
                                <tr>
                                  <td style="border:black 1px solid;"><h3>ID: ${item.id}</h3></td> 
                                  <td style="border:black 1px solid;"><h3 style= "width:200px;">Nombre: ${item.title}</h3></td> 
                                  <td style="border:black 1px solid;"><h3>Precio: ${item.price}</h3></td> 
                                  <td style="border:black 1px solid;"><img style="padding:10px" height="80px" width="100px" src="${item.thumbnail}"></td>
                                </tr>
                                </table>`)
        );
        res.send(`<h1>la lista de productos es la siguiente:</h1> ${formato}`);
    };
  todos();  
});

app.get("/productoRandom", (req, res) => {
  const random = async () => {
    const arrayCompleto = await procesos.getAll();
    let cualqueira=Math.floor(Math.random()*arrayCompleto.length);
    const producto= await procesos.getById(cualqueira + 1);
    let formato=  `<div style="border:black 1px solid; color: red; text-align: center; height: auto; width: 500px">
                  <h2>Nombre: ${producto[0].title}</h2> 
                  <h3>Precio: ${producto[0].price}</h3> 
                  <img style="margin: 10px"height="250px" src="${producto[0].thumbnail}">
                  </div>`;
    
    res.send(`
              <h1>Su producto random es la siguiente:</h1>
              ${formato}
    `);
  }
  random();
});

const connectionServer = app.listen(PORT, () => {
  console.log(
    `Aplicacion escuchando en el puerto ${connectionServer.address().port}`
  );
});

connectionServer.on("error", (error) =>
  console.log(`Ha ocurrido un error: ${error}`)
);
