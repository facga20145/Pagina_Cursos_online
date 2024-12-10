const express = require('express');
const router = express.Router();
const { validateUserSubscription, processPayment } = require('../controllers/paymentController');

// Ruta para validar el correo del usuario y la suscripción activa
router.post('/validateUserSubscription', validateUserSubscription);

// Ruta para procesar el pago
router.post('/processPayment', processPayment);

module.exports = router;
