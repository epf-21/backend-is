const express = require('express');
const { PrismaClient } = require('@prisma/client');
const morgan = require("morgan");
const cors = require("cors");
const passport = require('./config/passport');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes');
const authRoutes = require('./routes/authRoutes');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware solo para este router
router.use(express.json());
router.use(morgan("dev"));
router.use(cors());
router.use(passport.initialize());

// Ruta principal del subrouter
router.get('/', (req, res) => {
  res.send('Login module running');
});

// Subrutas
router.use('/api', userRoutes);
router.use('/api', cityRoutes);
router.use('/api/auth', authRoutes);

// Exportar el router
module.exports = router;
