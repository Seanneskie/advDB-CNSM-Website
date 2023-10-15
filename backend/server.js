const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('PORT:', process.env.PORT);



// express app
const app = express();

// routes setup
const departmentRoutes = require('./routes/departmentRoute')
const organizationRoutes = require('./routes/organizationRoute')
const classRoutes = require('./routes/classRoute')
const courseRoutes = require('./routes/courseRoute')
const studentRoutes = require('./routes/studentRoute')
const eventRoutes = require('./routes/eventRoute')
const fineRoutes  = require('./routes/fineRoute')
const attendanceRoutes = require('./routes/attendanceRoute')
const collectionRoutes =  require('./routes/collectionRoute')
const votingRoutes = require('./routes/votingRoute')
const voteRoutes = require('./routes/voteRoute')
const projectProposalRoutes = require('./routes/projectproposalRoute')

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/department', departmentRoutes)
app.use('/api/org', organizationRoutes)
app.use('/api/class',classRoutes)
app.use('/api/course', courseRoutes)
app.use('/api/student', studentRoutes)
app.use('/api/event', eventRoutes)
app.use('/api/fine', fineRoutes)
app.use('/api/attendance', attendanceRoutes)
app.use('/api/collection', collectionRoutes)
app.use('/api/voting', votingRoutes)
app.use('/api/vote', voteRoutes)
app.use('/api/proposal', projectProposalRoutes)


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

