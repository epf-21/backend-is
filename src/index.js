require('./cronJobs/reservationCleanup');
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

const { carRouter } = require("./routes/cars");
const { airportRouter } = require("./routes/airports");
const { reservationRouter } = require("./routes/reservation");
const { searchRouter } = require("./routes/search");
const { userRouter } = require("./routes/users");
const loginRoutes = require('./login');
const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.disable("x-powered-by")

app.use('/api/cars', carRouter)
app.use('/api/airports', airportRouter)
app.use('/api/reservations', reservationRouter)
app.use('/api/search', searchRouter)
app.use('/api/users', userRouter)
app.use('/login', loginRoutes);

module.exports = app;

