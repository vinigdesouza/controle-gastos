const { Router } = require('express');
const StatusPagamentoController = require('../app/controller/StatusPagamentoController');
const router = Router();

router.get('/', StatusPagamentoController.index);

module.exports = router;
