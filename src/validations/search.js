const { z } = require("zod");

const searchSchema = z.object({
  userId: z.number({
    required_error: "El id de usuario es obligatorio",
    invalid_type_error: "El id de usuario debe ser número"
  }),
  criterio: z.string().min(1, {
    message: "El criterio no puede estar vacio"
  })
})

function validateSearch(data) {
  return searchSchema.safeParse(data)
}

function validatePartialSearch(data) {
  return searchSchema.partial().safeParse(data)
}


module.exports = {
  validateSearch,
  validatePartialSearch
}