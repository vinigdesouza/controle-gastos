const { Router } = require('express');
const ParcelasController = require('../app/controller/ParcelasController');
const router = Router();

router.put('/:id', ParcelasController.update)

module.exports = router;
