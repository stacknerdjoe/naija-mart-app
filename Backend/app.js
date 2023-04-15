const express = require('express');
require('./db');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json()); 
app.use('/api/user', userRouter);



app.get ('/about', (req, res) => {
    res.send("<h1> Hej, This is Harry from Backend ABOUT <h1>");
});


app.listen (8002, () => {
    console.log("the port is listenning on port 8002");
});
