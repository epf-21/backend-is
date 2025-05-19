const { prisma } = require("../config/prisma");

class AirportModel {
  static async getAll() {
    try {
      const airports = await prisma.aeropuerto.findMany({
        select: {
          id: true,
          nombre: true,
          latitud: true,
          longitud: true,
          Ciudad: {
            select: {
              nombre: true
            }
          }
        },
        orderBy: {
          nombre: 'asc'
        }
      })

      return airports.map(airport => ({
        nombre: airport.nombre,
        latitud: airport.latitud,
        longitud: airport.longitud,
        ciudad: airport.Ciudad
      }))
    } catch (error) {
      console.error('Error al obtener aeropuertos: ', error)
      throw new Error('Error al obtener aeropuertos')
    }
  }
}

module.exports = { AirportModel }

