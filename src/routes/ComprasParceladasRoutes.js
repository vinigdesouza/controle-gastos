const { Router } = require('express');
const ComprasParceladasController = require('../app/controller/ComprasParceladasController');
const router = Router();

// router.get('/', ComprasParceladasController.index);
// router.get('/:id', ComprasParceladasController.show);
router.get('/usuario/:usuario_id', ComprasParceladasController.showByUser);
// router.delete('/:id', ComprasParceladasController.delete);
router.post('/', ComprasParceladasController.store);
// router.put('/:id', ComprasParceladasController.update);

module.exports = router;
