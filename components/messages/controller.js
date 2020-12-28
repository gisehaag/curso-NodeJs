//este va a ser el archivo que se encarga de definir todo lo que sucede creando las funciones necesarias

const { resolve } = require('path');
const { config } = require('../../config');
const { socket } = require('../../socket'); //es muy genio visual porque ya me lo trajo ;)
const store = require('./store');

function addMessage(chat, user, message, file) {
	return new Promise((resolve, reject) => {
		if(!chat || !user || !message) {
			console.error('[messageController] No hay chat, usuari@ o mensaje');
			return Promise.reject('Invalid data');
		}

		let fileUrl = '';
		if(file) {
			fileUrl = config.host + ':' + config.port + config.publicRoute + '/' + config.filesRoute + '/' + file.filename;
		}

		const fullMessage = {
			chat: chat,
			user: user,
			message: message,
			date: new Date,
			file: fileUrl,
		};

		store.add(fullMessage);

		socket.io.emit('message', fullMessage);


		resolve(fullMessage);
	})
}


function getMessages(filterUser) {
	return new Promise((resolve, reject) => {
		resolve(store.list(filterUser));
	})
}

function updateMessage(id, newMessage) {
	return new Promise(async (resolve, reject) => {
		console.log(id, newMessage);
		if(!id || !newMessage) {
			reject('Invalid data');
			return false;
		}
		const result = await store.updateText(id, newMessage);
		resolve(result);
	})
}

function deleteMessage(id) {
	return new Promise((resolve, reject) => {
		if(!id) {
			reject('Id inválido');
			return false;
		}
		store.remove(id)
				.then(resolve())
				.catch(e => {
					reject(e)
				})

	})
}
module.exports = {
	addMessage,
	getMessages,
	updateMessage,
	deleteMessage,
};
