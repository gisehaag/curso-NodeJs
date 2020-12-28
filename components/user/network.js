// Esta es la Capa de red
const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');

// Para dar distintas respuestas en función del metodo que reciba:
const router = express.Router();


router.get('/', function(req, res) {
	controller.getUsers()
		.then(getUsers => {
			response.success(req, res, getUsers, 200);
		})
		.catch(e => {
			response.error(req, res, 'Internal error', 500, e);
		})
})

router.post('/', function(req, res) {
	controller.addUser(req.body.name)
		.then(data =>{
			response.success(req, res, data, 201)
		})
		.catch(e => {
			response.error(req, res, 'Internal error', 500, e);
		})
})

module.exports = router;