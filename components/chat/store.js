const { rejects } = require('assert');
const { resolve } = require('path');
const Model = require('./model');

function addChat(chat) {
	const myUser = new Model(chat);
	return myUser.save();
}

function listChats(userId) {
	return new Promise((resolve, reject) => {
		let filter = {};

		if (userId !== null) {
			filter = {
				users: userId
			};
		}

		Model.find(filter) //con esto MongoDB va a entender que quiero que solo me
			// traiga los users que solo coincidan con filterUser
			.populate('users')
			.exec((error, populated) => { //si no lo ejecuto no se va a mostrar la info populada
				if (error) {
					reject(error);
					return false;
				}

				resolve(populated);
			})
	})

}


module.exports = {
	add: addChat,
	list: listChats,
}