// habilitar nuevos tipos de variables ECMAScript 6
'use strict'
// importar el driver para conectar y manejar bases de datos
const mongoose    = require('mongoose')
// importar variable de aplicacion
const app  = require('./app')
// importar configuraciones
const config = require('./config') 

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
	if (err) {
		console.log(`Error al conectar a la base de datos: ${err}`)
		return;
	}
	console.log('Conexion exitosa a la base de datos')
	
	app.listen(config.port, () => {
		console.log(`API REST ejecutandose en http://localhost:${config.port}`)
	})
})

