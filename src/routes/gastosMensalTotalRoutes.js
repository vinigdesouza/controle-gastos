const { Router } = require('express');
const GastosMensalTotalController = require('../app/controller/GastosMensalTotalController');
const router = Router();

router.get('/', GastosMensalTotalController.index);
router.get('/:id', GastosMensalTotalController.show);
router.get('/user/gasto-momento/:usuario_id', GastosMensalTotalController.showByUserAteAgora);
router.delete('/:id', GastosMensalTotalController.delete);
router.post('/', GastosMensalTotalController.store);
router.put('/:id', GastosMensalTotalController.update);

module.exports = router;
