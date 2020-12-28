const statusMessages = {
	'200': 'Done',
	'201': 'Created',
	'400': 'Invalid format',
	'500': 'Internal error'
}


exports.success = function(req, res, message, status) {
	let statusCode = status;
	let statusMessage = message;

	if( !status ) {
		status = 200;
	}

	if( !message ) {
		statusMessage = statusMessages[status]
	}

	res.status(statusCode).send({
		error: '',
		body: statusMessage,
	});
}

exports.error = function(req, res, message, status, details) {
	let statusCode = status;
	let statusMessage = message;

	if( !status ) {
		status = 500;
	}

	if( !message ) {
		statusMessage = statusMessages[status]
	}

	console.error('[Response Error: ]' + details); //acá podrías informar el verdadero error que ocurrió sin mostrarlo al usuario
	res.status(statusCode).send({
		error: statusMessage, //y al usuario le pasas el error que no de tanta info, ya que puede resultar inseguro,
		//es muy importante no mandar informacion confidencial de los errores al cliente.
		body: '',
	});
}