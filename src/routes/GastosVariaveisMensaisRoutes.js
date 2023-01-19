const { Router } = require('express');
const router = Router();
const GastosVariaveisMensaisController = require('../app/controller/GastosVariaveisMensaisController');

router.get('/', GastosVariaveisMensaisController.index);
router.get('/:id', GastosVariaveisMensaisController.show);
router.get('/user/:usuario_id', GastosVariaveisMensaisController.showByUser);
router.delete('/:id', GastosVariaveisMensaisController.delete);
router.post('/', GastosVariaveisMensaisController.store);
router.put('/:id', GastosVariaveisMensaisController.update);

module.exports = router;
