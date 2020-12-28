//aca vamos a crear toda la lógica de almacenamiento

//Primero creamos un mock

const list = [];


const { realpathSync } = require('fs');
const Model = require('./model');



function addMessage(message) {
	// list.push(message);
	const myMessage = new Model(message);
	myMessage.save();
}

function getMessage(filterUser) {
	return new Promise((resolve, reject) => {
		// return list;
			let filter = {};

			if(filterUser !== null) {
				filter = { user: filterUser };
			}
			Model.find(filter) //con esto MongoDB va a entender que quiero que solo me
			// traiga los users que solo coincidan con filterUser
				.populate('user')
				.exec((error, populated) => { //si no lo ejecuto no se va a mostrar la info populada
					if(error) {
						reject(error);
						return false;
					}

					resolve(populated);
				})
				// .catch(e => { //no necesitamos hacer un parseo de errores porque ya esta "incluido" en la promesa del populate
				// 	reject(e);
				// });

			// resolve(messages);
	})
}

async function updateText(id, message){
	const foundMessage = await Model.findOne({
		_id: id //Aca verificará que el id que esta en la DB coincida con el que ha venido desde la url
	});

	foundMessage.message = message;
	const newMessage = await foundMessage.save();
	return newMessage;
}

function removeMessage(id){
	return Model.deleteOne({
		_id: id,
	})
}

module.exports = {
	add: addMessage,
	list: getMessage,
	updateText: updateText,
	// get
	remove: removeMessage,
}
