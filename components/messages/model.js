
/*Bases de datos, vamos a usar una base de datos NO relacional
en este caso MongoDB

db_user_cursoNode
Djb4TMo6rQK72GsC

MongoDB no tiene esquemas pero no es una buena práctica trabajar sin esquemas
porque no sabemos que info va a haber en la DB, queremos saber qué alacenamos,
cómo acceder a eso y porqué lo almacenamos así.
Por eso vamos a usar una libreria llamada mongoose, tambien va a validar los datos

*/

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

//con esto le decimos a mongoose qué info vamos a almacenar
const mySchema = new Schema({
	chat: {
		type: Schema.ObjectId,
		ref: 'Chat',
	},
	user: { //con esto ya relacionamos las dos entradas de messages y users
		type: Schema.ObjectId,
		ref: 'User',
	},
	message: {
		type: String,
		required: true,
	},
	date: Date,
	file: String,
})

const Model = mongoose.model('Message', mySchema);
module.exports = Model;

//con esto definimos el modelo de la base de datos