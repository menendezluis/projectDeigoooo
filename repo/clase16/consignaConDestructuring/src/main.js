//Servidor************
import express from 'express';
//const express = require('express');
import moment from 'moment';
//const moment = require('moment');
const aplicacion = express();
import http from "http";
//const { Server: HttpServer } = require('http');
import { Server } from "socket.io";
//const { Server: IOServer } = require('socket.io');
import { Contenedor } from "./contenedor/contenedorSql.js";
//const Contenedor = require('./contenedor/contenedorSql');
import { options } from "./connection/options.js";
//const options = require('./connection/options');
import script from "./index.js";
//const script = require('./index');

const port = 8080;
const publicRoot = './public';

//Lineas para usar json
aplicacion.use(express.json());
aplicacion.use(express.urlencoded({ extended: true }));

//socket IO  Server Http
//const httpServer = new HttpServer(aplicacion);
//const io = new IOServer(httpServer);
const httpServer = http.createServer(aplicacion);
const io = new Server(httpServer);

//***** Hacemos la carpeta public visible
aplicacion.use(express.static(publicRoot));
//****************

const productos = new Contenedor(options.mysql, 'productos');
const mensajes = new Contenedor(options.sqlite3, 'mensajes');

//Endpoints***

aplicacion.get('/', (peticion, respuesta) => {
  respuesta.send('index.html', { root: publicRoot });
});

//***********


//Servidor************
const servidor = httpServer.listen(port, () => {
  console.log(`Servidor escuchando: ${servidor.address().port}`);
});

servidor.on('error', error => console.log(`Error: ${error}`));
//****************


//Sockets************
io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado!');

  const listaProductos = await productos.getAll();
  socket.emit('nueva-conexion', listaProductos);

  socket.on("new-product", (data) => {
    productos.save(data);
    io.sockets.emit('producto', data);
  });

  //Para enviar todos los mensajes en la primera conexion
  const listaMensajes = await mensajes.getAll();
  socket.emit('messages', listaMensajes);

  //Evento para recibir nuevos mensajes
  socket.on('new-message', async data => {
    data.time = moment(new Date()).format('DD/MM/YYYY hh:mm:ss');
    await mensajes.save(data);
    const listaMensajes = await mensajes.getAll();
    io.sockets.emit('messages', listaMensajes);
  });
});
//****************