const express = require('express');
const router = express.Router();
const { validateUserSubscription, processPayment, processCoursePayment } = require('../controllers/paymentController');

// Ruta para validar el correo del usuario y la suscripción activa
router.post('/validateUserSubscription', validateUserSubscription);

// Ruta para procesar el pago
router.post('/processPayment', processPayment);

// Ruta para procesar el pago de un curso
router.post('/processCoursePayment', processCoursePayment);

module.exports = router;
