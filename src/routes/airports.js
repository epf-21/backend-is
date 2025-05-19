const Router = require("express");
const { AirportController } = require("../controllers/airports");

const airportRouter = Router()

airportRouter.get('/', AirportController.getAll)

module.exports = { airportRouter }