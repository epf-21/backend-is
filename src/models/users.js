const { prisma } = require("../config/prisma");

class userModel {
  static async getUserData({ id }) {
    console.log(id)
    try {
      const usuario = await prisma.usuario.findUnique({
        where: {
          id: id,
        },
        select: {
          nombre: true,
          correo: true,
          telefono: true,
          Ciudad: {
            select: {
              nombre: true,
            }
          },
          Reserva: {
            select: {
              id: true,
              fecha_creacion: true,
              fecha_inicio: true,
              fecha_fin: true,
              fecha_expiracion: true,
              estado: true
            }
          }
        }
      })
      return usuario
    } catch (error) {
      console.error('La tabla no existe:', error)
      throw new Error('La tabla no existe')
    }
  }
}

module.exports = { userModel }