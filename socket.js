// este archivo va a inicializar el socket.io, generar una instancia y poderla compartir

const socketIO = require('socket.io');
const socket = {}; //creamos un objeto ya que se va a guardar como referencia

function connect(server) {
	socket.io = socketIO(server); //estamos inicializando io dentro de la variable socket
}

module.exports = {
	connect,
	socket,
}