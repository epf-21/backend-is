const { AirportModel } = require("../models/airports");

class AirportController {
  static async getAll(req, res) {
    try {
      const airports = await AirportModel.getAll()
      res.status(200).json(airports)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener aeropuertos' })
    }
  }
}

module.exports = { AirportController }