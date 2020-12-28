// Va a tener toda la info para gestionar la conexion a la DB

const db = require('mongoose');

db.Promise = global.Promise; // le decimos a mongoose, que cuando quiera utilizar promesas utilice la clase global Promise

async function connect(url) {

	await db.connect(url, {
		useNewUrlParser: true, //con esto nos aseguramos que no hayan problemas de compatibilidad en caso de que el servidor sea más nuevo
		useUnifiedTopology: true,
	});

	console.log('[db] Conectada con éxito');
}

module.exports = connect;

