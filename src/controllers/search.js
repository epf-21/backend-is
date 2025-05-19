const { searchModel } = require("../models/search");
const { validateSearch } = require("../validations/search");

class searchController {
  static async createSearch(req, res) {
    try {
      const parseResult = validateSearch(req.body)

      if (!parseResult.success) {
        return res.status(400).json({ error: JSON.parse(parseResult.error.message) })
      }

      const { userId, criterio } = parseResult.data

      const newSearch = await searchModel.createSearch({ userId, criterio })
      res.status(201).json(newSearch)
    } catch (error) {
      console.error("Error al guardar la busqueda: ", error)

      if (error instanceof Error) {
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: "Error interno del servidor" })
      }

    }
  }

  static async getSearchByUserId(req, res) {
    try {
      const { id } = req.params

      if (isNaN(Number(id))) {
        return res.status(400).json({ error: "El id del usuario debe ser un numero" })
      }

      const searchs = await searchModel.getSearchByUserId({ userId: Number(id) });
      res.status(200).json(searchs)

    } catch (error) {
      console.error("Error al obtener las busquedas: ", error)
      res.status(500).json({ error: "Error interno del servidor" })
    }
  }

  static async deleteSearchById(req, res) {
    try {
      const { id } = req.params

      if (isNaN(Number(id))) {
        return res.status(400).json({ error: "El id de la busqueda debe ser un numero" })
      }

      const deletedSearch = await searchModel.deleteSearchById({ id: Number(id) })

      if (!deletedSearch) {
        return res.status(404).json({ error: "No se encontro la busqueda" })
      }

      res.status(200).json({ message: "Busqueda eliminada correctamente" })
    } catch (error) {
      console.error("Error al eliminar la busqueda: ", error)

      res.status(500).json({ error: "Error interno del servidor" })
    }
  }

  static async saveSearch(req, res) {
    const { criterio, id_usuario } = req.body;

    if (!criterio || !id_usuario) {
      return res.status(400).json({ error: 'Faltan datos: criterio o id_usuario' });
    }

    try {
      const existing = await prisma.busqueda.findFirst({
        where: {
          criterio: criterio.trim(),
          id_usuario
        }
      })

      if (existing) {
        const updated = await prisma.busqueda.update({
          where: { id: existing.id },
          data: { fecha_creacion: new Date() }
        });
        return res.status(200).json(updated);
      }

      const newSearch = await prisma.busqueda.create({
        data: {
          criterio: criterio.trim(),
          id_usuario
        }
      });

      res.status(201).json(newSearch);
    } catch (error) {
      res.status(500).json({ error: 'Error al guardar búsqueda' });
    }
  };

  //GET /search-history/:userId
  static async getUserSearchesD(req, res) {
    const { userId } = req.params;

    try {
      const searches = await prisma.busqueda.findMany({
        where: { id_usuario: parseInt(userId) },
        orderBy: { fecha_creacion: 'desc' }
      });

      res.status(200).json(searches);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener búsquedas' });
    }
  }

  // DELETE /search-history/:id
  static async deleteSearchByIdD(req, res) {
    const { id } = req.params;

    try {
      await prisma.busqueda.delete({
        where: { id: parseInt(id) }
      });

      res.status(200).json({ message: 'Búsqueda eliminada' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar búsqueda' });
    }
  };

  // GET /all
  static async getAllSearchesD(req, res) {
    try {
      const allSearches = await prisma.busqueda.findMany();
      res.status(200).json(allSearches);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener todas las búsquedas' });
    }
  };
}

module.exports = { searchController }