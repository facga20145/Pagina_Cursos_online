const express = require("express");
const router = express.Router();
const scholarshipController = require("../controllers/scholarshipController");

// Ruta para agregar una nueva solicitud de beca
router.post("/add-scholarship-request", scholarshipController.addScholarshipRequest);

module.exports = router;
