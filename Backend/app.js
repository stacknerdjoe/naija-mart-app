const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
require('./db');
const userRouter = require('./routes/user');
const { errorHandler } = require('./middlewares/error');
const cors = require('cors');
const { handleNotFound } = require('./utilities/helper');

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));
app.use('/api/user', userRouter);

app.use('/*', handleNotFound);

app.use(errorHandler);

app.get ('/about', (req, res) => {
    res.send("<h1> Hej, This is Harry from Backend ABOUT <h1>");
});


app.listen (8002, () => {
    console.log("the port is listenning on port 8002");
});
