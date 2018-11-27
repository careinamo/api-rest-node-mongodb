'use strict'
const Asignatura = require('../models/asignatura')
function getAsignaturas(req, res)
{
	Asignatura.find({}, (err, asignaturas) => {
		if (err) return res.status(500).send({message: `Error de consulta: ${err}`})
		if (!asignaturas) return res.status(404).send({message: `No existen asignaturas`})
		res.status(200).send({ asignaturas : asignaturas })		
	})	
}
function getAsignatura(req, res)
{
	let asignaturaId = req.params.asignaturaId
	Asignatura.findById(asignaturaId, (err, asignatura) => {
		if (err) return res.status(500).send({message: `Error de consulta: ${err}`})
		if (!asignatura) return res.status(404).send({message: `El asignatura no existe`})
		res.status(200).send({ asignatura : asignatura })			
	})
}
function saveAsignatura(req, res)
{
	console.log('POST /api/asignatura')
	console.log(req.body)
	let asignatura         = new Asignatura()
	asignatura.nombre	= req.body.nombre;
	asignatura.descripcion	= req.body.descripcion;
	asignatura.creditos	= req.body.creditos;
	asignatura.categoria	= req.body.categoria;
	asignatura.save((err, asignaturaStored) => {
		if (err) res.status(500).send({message: `Error de inserción: ${err}`})
		res.status(200).send({asignatura: asignaturaStored})
	})
}
function updateAsignatura(req, res)
{
	let asignaturaId = req.params.asignaturaId
	let params    = req.body
	Asignatura.findByIdAndUpdate(asignaturaId, params, (err, currentAsignatura) => {
		if (err) return res.status(500).send({message: `Error de actualización: ${err}`})
		Asignatura.findById(asignaturaId, (err, asignaturaUpdated) => {
			if (err) return res.status(500).send({message: `Error de consulta: ${err}`})
			res.status(200).send({ asignatura : asignaturaUpdated })			
		})
	})		
}
function deleteAsignatura(req, res)
{
	let asignaturaId = req.params.asignaturaId
	Asignatura.findById(asignaturaId, (err, asignatura) => {
		if (err) return res.status(500).send({message: `Error de eliminación: ${err}`})		
		asignatura.remove(err => {
			if (err) return res.status(500).send({message: `Error de eliminación: ${err}`})
			res.status(200).send({message: `Asignatura eliminado con éxito`})
		})		
	})		
}
module.exports = {
	getAsignaturas,
	getAsignatura,
	saveAsignatura,
	updateAsignatura,
	deleteAsignatura	
}