const db = require('../database/models');
const sequelize = db.sequelize;

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        res.render('moviesAdd');   
    },
    create: function (req, res) {
        Movies.create({
            title: req.body.title,
            rating: req.body.rating,
            length: req.body.length,
            awards: req.body.awards,
            release_date: req.body.release_date
        })
        .then(() => {
            res.redirect('/movies');
        })
        .catch( error => res.send(error))
    },
    edit: function(req, res) {
        let movieId = req.params.id;
        Movies.findByPk(movieId)
        .then((Movie) => {
            res.render('moviesEdit', { Movie })
        })
        .catch( error => res.send(error));
    },
    update: function (req,res) {
        let movieId = req.params.id;
        Movies.update({
            title: req.body.title,
            rating: req.body.rating,
            length: req.body.length,
            awards: req.body.awards,
            release_date: req.body.release_date
        },{
            where: {
                id:moviesId
            }
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch( error => res.send(error));
    },
    delete: function (req, res) {
        let movieId = req.params.id;
        Movies.findByPk(movieId)
        .then((Movie) => {
            res.render('moviesDelete', { Movie })
        })
        .catch( error => res.send(error));
    },
    destroy: function (req, res) {
        let movieId = req.params.id;
        Movies.destroy({
            where:{
                id:movieId
            },
            force: true
        })
        .then(() => {
            res.redirect('/movies')
        })
        .catch( error => res.send(error));
    }

}

module.exports = moviesController;