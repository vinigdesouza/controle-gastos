const { Router } = require('express');
const GastosFixosMensaisController = require('../app/controller/GastosFixosMensaisController');
const router = Router();

router.get('/', GastosFixosMensaisController.index);
router.get('/:id', GastosFixosMensaisController.show);
router.get('/user/:usuario_id', GastosFixosMensaisController.showByUser);
router.delete('/:id', GastosFixosMensaisController.delete);
router.post('/', GastosFixosMensaisController.store);
router.put('/:id', GastosFixosMensaisController.update);

module.exports = router;
