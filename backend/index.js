//configuraciones generales
const  express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const {mongoose} = require('./database');
const {json} = require('express');

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Rutas
app.use('/api/v1/moviesDAW', require('./routes/movie.route'));
app.use('/', (req, res) =>
    res.send('Api funcionando en /api/v1/movies'));

//Setting Iniciar el servidor
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), ()=>{
    console.log('Server on port', app.get('port'));
})
