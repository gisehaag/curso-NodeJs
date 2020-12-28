// Capa de red
const express = require('express');
const multer = require('multer'); //multer se va encargar de la trasnmision de archivos, gestion de tipos, va a permitir guardar en disco el archivo etc
const config = require('../../config');
const response = require('../../network/response');
const controller = require('./controller');



// Para dar distintas respuestas en función del metodo que reciba:
const router = express.Router();

const upload = multer({
	dest: 'public/' + config.filesRoute + '/', //donde va a mandar los archivos
});

router.get('/', function(req, res) {
	const filterMessages = req.query.chat || null;

	controller.getMessages(filterMessages)
		.then((messageList) => {
			response.success(req, res, messageList, 200);
		})
		.catch(e => {
			response.error(req, res, 'Unexpected error', 500, e);
		})


	//asi lo hacíamos antes
	// console.log(req.body);
	// res.header({
	// 	"custom-header": "Nuestro valor personalizado",
	// })
	// //En lugar de hacer esto:
	// //res.status(201).send('Lista de mensajes: ' + req.body.text); //aca le estas mandando el body al cliente

	// response.success(req, res, 'Lista de mensajes');
})


router.post('/', upload.single('file'), function(req, res) { //añadimos multer como un middelware express (un punto donde va a pasar antes de entrar a la fc)
	// console.log(req.query); //me trae tambien los parametros que mando por query, poniendo http://localhost:3000/message?orderBy=ID&age=36

	console.log(req.file);

	controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
		.then((fullMessage) => {
			response.success(req, res, fullMessage, 201)
		})
		.catch(e => {
			response.error(req, res, 'Información inválida', 400, 'Error en el controller');
		});

	// Antes de agregar la promise, lo hacíamos así:
	// if(req.query.error == "ok") {
	// 	response.error(req, res, 'Error inesperado', 500, 'eso solo una simulación de los errores');
	// } else {
	// 	response.success(req, res, 'Creado correctamente', 201)
	// }
	console.log(req.headers.authorization);
	// res.status(201).send({"error": "", "message": "creado correctamente"});
})

//creamos una ruta para modificar mensajes:

router.patch('/:id', function(req, res) {
	// console.log(req.params.id);
	controller.updateMessage(req.params.id, req.body.message)
		.then((data) => {
			response.success(req, res, data, 200);
		})
		.catch(e => {
			response.error(req, res, 'Error interno', 500);
			// console.error(e);
		})
	// res.send('ok');
})

router.delete('/:id', function(req, res) {
	controller.deleteMessage(req.params.id)
		.then(() => {
			response.success(req, res, `El mensaje id: ${req.params.id} fue eliminado`, 200);
		})
		.catch(e => {
			response.error(req, res, 'Error interno', 500, e);
		})
})

// Aca exportamos el router para poderlo utilizar
module.exports = router;