//configuraciones generales
const express = require('express');
const movieCtrl = require('../controllers/movie.controller');
const router = express.Router();

//Rutas
//ruta para obtener todas las películas
router.get('/', movieCtrl.getMovies);
//ruta para obtener una película por su id
router.get('/movie/:id', movieCtrl.getMovie);
//ruta para crear una nueva película
router.post('/', movieCtrl.addMovie);
//ruta para actualizar una película por su id
router.put('/:id', movieCtrl.updateMovie);
//ruta para eliminar una película por su id
router.delete('/:id', movieCtrl.deleteMovie);

module.exports = router;