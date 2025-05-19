const Router = require("express");
const { CarController } = require("../controllers/cars");

const carRouter = Router()

carRouter.get('/most-rented', CarController.getMostRented)
module.exports = { carRouter }