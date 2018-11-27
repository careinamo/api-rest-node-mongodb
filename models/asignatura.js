'use strict'

const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const AsignaturaSchema = Schema ({
	nombre        : String,
	descripcion     : String,
	creditos       : { type : Number, default : 0 },
	categoria    : { type : String, enum : ['Ciencias','Humanidades', 'Artes', 'Ingenieria'] },
})
module.exports = mongoose.model('Asignatura', AsignaturaSchema)