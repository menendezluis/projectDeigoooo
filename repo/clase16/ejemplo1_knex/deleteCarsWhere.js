import options from "./options.js";
import knex from "knex";

const connection = knex(options);

connection('autos').where('precio','<=',38000).del()
.then(() => console.log('registros eliminados con exito'))
.catch(err => console.error(err))
.finally(() => {connection.destroy()});
  