const Router = require("express");
const { ReservationController } = require("../controllers/reservation");

const reservationRouter = Router()

reservationRouter.post('/', ReservationController.createReservation)
reservationRouter.patch('/:id/state', ReservationController.updateReservationState)
reservationRouter.delete('/:id', ReservationController.deleteReservation)

module.exports = { reservationRouter }