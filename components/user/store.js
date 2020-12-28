const Model = require('./model');

function addUser(user){
	const myUser = new Model(user);
	return myUser.save();
}

async function getUsers() {
		const getUsers = await Model.find();
		return getUsers;

}


module.exports = {
	add: addUser,
	list: getUsers,
}