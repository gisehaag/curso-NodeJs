//Vamos a utilizar el módulo express https://expressjs.com/es/4x/api.html

// sintaxis ES6
// import express from 'express';

const express = require('express');
const app = express(); // con eso inicializamos express

const server = require('http').Server(app);
const config = require('./config');
const cors = require('cors');


// Para trabajar con el body agregamos una extension de express
const bodyParser = require('body-parser');
const socket = require('./socket');
const db = require('./db');
// const router = require('./components/messages/network');

//con esto ya nos traemos el router de message
const router = require('./network/routes');

db(config.dbUrl);


// app.use('/', (req, res) => {
// 	res.send('hola!');
// } )

app.use(cors()); // con esto ya tendríamos nuestro modulo listo

app.use(bodyParser.json());
// Antes usabamos app.use(router);
//el enrrutador debe ir al final de los uses:

/* No es que tenga que ir al final de todo, sino que son middlewares que express usa en orden,
si pone el router antes de parsear entonces irá a las rutas primero y todavía no tendrá definido
el body. Pero en alguno casos hay middlewares que van después de las rutas como los middlewares
que manejan errores, en ese caso primero entran a las rutas y si hay errores entonces entran al
siguiente middleware. */

socket.connect(server); //con esto ya tenemos nuestro servidor de socket conectado
router(app); // sería equivalente a router(express())

//servir archivos estaáticos: html, css, etc

app.use(config.publicRoute, express.static('public')) //en la carpeta public vuelco toda la info de nuestra app




// Hay que asignar donde la funcion va a escuchar:
server.listen(config.port, () => {
	console.log('la aplicación está escuchando en '+ config.host +':' +config.port);
});