const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/tddd27_backend")
.then(() => {
    console.log('database is connected!')
})
.catch((ex) => {
    console.log('database connection is a negative!', ex);
})
