import options from "./options.js";
import knex from "knex";

const connection = knex(options);

connection('autos').orderBy('id', 'asc')
.then((autos) => {
  autos.forEach((auto) => {
    console.log(`Id: ${auto.id}, Nombre: ${auto.nombre}, Precio: ${auto.precio}`);
  });
})
.finally(() => {
  connection.destroy();
});
