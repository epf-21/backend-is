const cron = require('node-cron');

const { ReservationModel } = require('../models/reservation');
//'*/5 * * * *' cada 5 mint
cron.schedule('*/30 * * * *', async () => {
  try {
    const count = await ReservationModel.cancelExpiredReservations();
    console.log(`Reservas canceladas automáticamente: ${count}`);
  } catch (error) {
    console.error('Error al cancelar reservas expiradas:', error);
  }
});