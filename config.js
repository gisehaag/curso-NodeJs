//esto tendría de ver cómo moverlo para pasarlo como variable de entorno o algo asi más secreto
// const dBPass = 'Djb4TMo6rQK72GsC';
// const dBName = 'cursoNodeDB';
// const uri = `mongodb+srv://db_user_cursonode:${dBPass}@cluster0.avdkt.mongodb.net/${dBName}?retryWrites=true&w=majority`;


const config = {
	dbUrl: process.env.DB_URL || 'mongodb+srv://db_user_cursonode:Djb4TMo6rQK72GsC@cluster0.avdkt.mongodb.net/cursoNodeDB?retryWrites=true&w=majority',
	port: process.env.PORT || 3000,
	host: process.env.HOST || 'http://localhost',
	publicRoute: process.env.PUBLIC_ROUTE || '/app',
	filesRoute: process.env.FILES_ROUTE || 'files',
};

module.exports = config;