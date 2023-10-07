const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

// express app
const app = express();

// routes setup
const studentRoutes = require('./routes/student')

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/student', studentRoutes)

// connect to db    
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on', process.env.PORT)
        });
    })
    .catch((error) => {
        console.log(error);
    })  

