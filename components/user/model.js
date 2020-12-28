const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//con esto le decimos a mongoose qué info vamos a almacenar
const mySchema = new Schema({
	name: String,
})

const Model = mongoose.model('User', mySchema);
module.exports = Model;