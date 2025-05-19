const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        
        // Buscar si el usuario ya existe por correo o google_id
        const existingUser = await prisma.usuario.findFirst({
          where: {
            OR: [
              { correo: email },
              { google_id: profile.id }
            ]
          },
          include: {
            roles: {
              include: {
                rol: true
              }
            }
          }
        });

        if (existingUser) {
          // Si el usuario existe pero no tiene google_id, actualizar ese campo
          if (!existingUser.google_id) {
            await prisma.usuario.update({
              where: { id: existingUser.id },
              data: { google_id: profile.id }
            });
          }
          
          // Verificar si el perfil está completo
          if (!existingUser.perfil_completo) {
            // El usuario existe pero su perfil está incompleto
            return done(null, {
              isNewUser: false,
              isIncomplete: true,
              id: existingUser.id,
              correo: existingUser.correo,
              nombre: existingUser.nombre,
              foto: existingUser.foto
            });
          }
          
          // Extraer roles para el token JWT
          const roles = existingUser.roles.map(userRole => userRole.rol.rol);
          
          // Usuario ya existe y su perfil está completo
          return done(null, {
            isNewUser: false,
            isIncomplete: false,
            id: existingUser.id,
            correo: existingUser.correo,
            nombre: existingUser.nombre,
            roles: roles
          });
        }

        // Es un usuario nuevo, lo creamos con datos parciales
        const newUser = await prisma.usuario.create({
          data: {
            google_id: profile.id,
            correo: email,
            nombre: profile.displayName,
            foto: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
            perfil_completo: false
          }
        });

        // Retornamos el nuevo usuario con flag de incompleto
        return done(null, {
          isNewUser: true,
          isIncomplete: true,
          id: newUser.id,
          correo: newUser.correo,
          nombre: newUser.nombre,
          foto: newUser.foto
        });
      } catch (error) {
        console.error('Error en estrategia Google:', error);
        return done(error);
      }
    }
  )
);

module.exports = passport;