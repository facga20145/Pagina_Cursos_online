const express = require('express');
const router = express.Router();
const { validateUserSubscription } = require('../controllers/paymentController');

// Ruta para validar el correo del usuario y la suscripción activa
router.post('/validateUserSubscription', validateUserSubscription);

module.exports = router;
