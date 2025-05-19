const { CarModel } = require("../models/cars");

class CarController {

  static async getAll(req, res) {
    try {
      const cars = await CarModel.getAll()
      res.status(200).json(cars)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener autos' })
    }
  }

  static async getMostRented(req, res) {
    try {
      const cars = await CarModel.getMostRented();
      res.status(200).json(cars)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener autos más alquilados' })
    }
  }

}

module.exports = { CarController }