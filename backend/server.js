const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);



// express app
const app = express();

// routes setup
const departmentRoutes = require('./routes/departmentRoute')

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/department', departmentRoutes)

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

