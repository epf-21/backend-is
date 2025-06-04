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
const OrdenPagoRoutes = require('./routes/paymentOrderRoutes');
const garantiaRouter = require('./routes/garantias');
const authRoutes = require('./routes/authRoutes');

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))
app.disable("x-powered-by")

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRouter)
app.use('/api/airports', airportRouter)
app.use('/api/reservations', reservationRouter)
app.use('/api/search', searchRouter)
app.use('/api/users', userRouter)
app.use('/login', loginRoutes);
app.use('/api', OrdenPagoRoutes);
app.use('/api/garantias', garantiaRouter);

app.listen()
module.exports = app;

/**const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
**/

