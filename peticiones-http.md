#Peticiones HTTP#

El protocolo HTTP es el protocolo de comunicacion que permite transmitir información entre cualquier elemento que esta en la web
servidores, maquinas, clientes, etc. Cualquier elemento que se comunique por internet se comunica con el protocolo HTTP.

Puntos clave a tener en cuenta:

* Métodos: qué queres hacer? El verbo que va a indicar la petición

	GET -> recoger info del servidor
	PUT -> reemplaza información en el servidor
	DELETE -> eliminar info del servidor
	POST -> añadir información al servidor
	PATCH -> queremos editar o actualizar una parte pequeña de la info
	OPTIONS -> pedir info sobre los metodos que se pueden utilizar

* Cabeceras: nos dan informacion contextual de la petición, Cómo quiero hacer la petición.

* Estado: cómo ha ido la operación?

es un número que indica lo que pasó con la petición:

	* 2XX: Todo ha ido bien.
	* 3XX: La petición se ha redirigido.
	* 4XX: Errores del cliente.
	* 5XX: Ha habido un error al procesar la petición.

* Cuerpo: la información que el servidor devuelve

El tipo de info que viene y cómo viene depende de las cabeceras

* Query: permiten añadir informacion extra a lo que queremos enviar al servidor.
Tambien se pueden utilizar para compartir datos con el frontend pero ojo! el usuario puede verla
estructura de la query http://url?clave=valor&otraClave=otroValor



