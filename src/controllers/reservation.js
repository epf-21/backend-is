const { validatePartialReservation, validateReservation } = require("../validations/reservation");
const { ReservationModel } = require("../models/reservation");

class ReservationController {
  static async createReservation(req, res) {
    try {
      const parseResult = validateReservation(req.body)

      if (!parseResult.success) {
        return res.status(400).json({ error: JSON.parse(parseResult.error.message) })
      }

      const { userId, carId, starDate, endDate, estado } = parseResult.data

      const newReservation = await ReservationModel.createReservation({ userId, carId, starDate, endDate, estado })
      res.status(201).json(newReservation)

    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    }
  }

  static async updateReservationState(req, res) {
    try {
      const { id } = req.params

      const result = validatePartialReservation(req.body)

      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const { estado } = result.data

      const updatedReservation = await ReservationModel.updateReservationState({
        id: Number(id),
        estado: estado
      })

      res.status(200).json(updatedReservation)
    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    }
  }

  static async deleteReservation(req, res) {
    const { id } = req.params
    try {
      const deletedReservation = await ReservationModel.deleteReservation({ id: Number(id) })

      if (!deletedReservation) {
        return res.status(404).json({ error: 'Reserva no encontrada' })
      }
      res.status(200).json({ message: 'Reserva eliminada correctamente' })

    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'Error interno del servidor' })
      }
    }
  }
}

module.exports = { ReservationController }