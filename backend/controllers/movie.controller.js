const Movie = require('../models/movies.model')
const  movieCtrl = {};
// Funciones CRUD para las películas
// Obtener todas las películas
movieCtrl.getMovies = async (req, res) =>{
    const movies = await Movie.find()
        .then((data)=> res.status(200).json({status:data}))
        .catch((err)=>res.status(400).json({status:err}));
};
// Obtener una película por su id
movieCtrl.getMovie = async (req, res) =>{
    const movie = await Movie.findById(req.param.id)
        .then(()=>{
            if(data!=null)
                res.status(200).json({status:data});
            else
                res.status(404).json({status:'Movie not found'});
        })
        .catch((err)=>res.status(400).json({status:err}));
}
movieCtrl.deleteMovie = async (req, res) =>{
    await Movie.findByIdAndDelete(req.params.id)
        .then((data)=>{
            if (data)res.status(200).json({status:'Movie deleted Successfully'});
            else res.status(404).json({status:'Movie not found'});
        })
        .catch((err)=>res.status(400).json({status:err}));
}

// Crear una nueva película
movieCtrl.addMovie = async (req, res) => {
    const movie = Movie(req.body);
    await movie.save()
        .then((data) => res.status(201).json({status: 'Movie created Successfully'}))
        .catch((err) => res.status(400).json({status: err}));
};
// Actualizar una película por su id
movieCtrl.updateMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate(
        req.params.id,
        {$set:movie},
        {new:true})
        .then((data)=>{
            if(data)res.status(200).json({status:'Movie updated Successfully'})
            else res.status(404).json({status:'Movie not found'});
        })
        .catch((err)=>rest.status(400).json({status:err}));
}


module.exports = movieCtrl;