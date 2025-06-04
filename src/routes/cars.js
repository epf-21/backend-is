const Router = require("express");
const { CarController } = require("../controllers/cars");

const carRouter = Router()
carRouter.get('/', CarController.getAll)
carRouter.get('/most-rented', CarController.getMostRented)
carRouter.get('/:id/host', CarController.getHostOfCarro)
carRouter.get('/:id', CarController.getByIdCar)

module.exports = { carRouter }