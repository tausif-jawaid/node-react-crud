require('dotenv').config();
const express = require('express');
const workoutRoutes = require('./routes/workouts')
//const mongoose = require('mongoose');
const fs = require('fs');
const cors = require('cors')

// express app
// Server js file using express framework (commit this on backend branch)
const app = express();
app.use(express.json())
app.use(cors())

//middlewere
app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

app.use('/api/workouts',workoutRoutes);

//conncet with db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         app.listen(process.env.PORT, () => {
//             console.log(' connected to DB listening on port',process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

// listen for requests

const server = app.listen(process.env.PORT, () =>{
    console.log(' connected to DB listening on port',process.env.PORT)
})

