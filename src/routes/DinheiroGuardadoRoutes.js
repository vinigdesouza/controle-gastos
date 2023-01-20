const { Router } = require('express');
const DinheiroGuardadoController = require('../app/controller/DinheiroGuardadoController');
const router = Router();

router.get('/', DinheiroGuardadoController.index);
router.get('/:id', DinheiroGuardadoController.show);
router.get('/mes/:mes', DinheiroGuardadoController.showByMonth);
router.delete('/:id', DinheiroGuardadoController.delete);
router.post('/', DinheiroGuardadoController.store);
router.put('/:id', DinheiroGuardadoController.update);

module.exports = router;
