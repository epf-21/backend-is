const { prisma } = require("../config/prisma");

class searchModel {
  static async createSearch({ userId, criterio }) {
    return await prisma.busqueda.create({
      data: {
        id_usuario: userId,
        criterio: criterio,
      },
    })
  }

  static async getSearchByUserId({ userId }) {
    return await prisma.busqueda.findMany({
      where: {
        id_usuario: userId,
      },
      orderBy: {
        fecha_creacion: "desc"
      }
    })
  }

  static async deleteSearchById({ id }) {
    return await prisma.busqueda.delete({
      where: {
        id: id,
      }
    })
  }
}

module.exports = { searchModel }