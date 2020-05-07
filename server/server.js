const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const api = require('./routes/api');
const authRouter = require('./routes/auth');
const gameRouter = require('./routes/game');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use('/api', api);

// Auth page
app.use('/api', authRouter);

// Game part
app.use('/api/games', gameRouter);

app.get('/', function(req, res) {
    res.send('It works !');
})

app.use((req, res, next) => {
    const error = new Error('Not found !');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    });
});

app.listen(PORT, function() {
    console.log('Server Running on localhost:' + PORT);
})