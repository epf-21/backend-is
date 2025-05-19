const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();
const authController = require('../controllers/userController');


// Ruta para iniciar el flujo de OAuth de Google
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback de Google
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  userController.googleCallback
);

// Completar perfil de usuario (Google u otros métodos)
router.post('/complete-profile', userController.completeUserProfile);

// Verificar estado del perfil de un usuario
router.get('/check-profile/:id', userController.checkProfileStatus);

// Login con correo y contraseña
router.post('/login', userController.loginUser);

// Obtener perfil del usuario (protegido con JWT)
router.get('/profile', authenticateToken, userController.getUserProfile);

router.get("/check-profile/email/:email", userController.checkProfileByEmail);   //ssscsasascacscascsaacs

router.post("/register-google", userController.completeGoogleRegistration);      //sssxsxsxsx




module.exports = router;