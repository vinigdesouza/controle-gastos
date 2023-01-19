const { Router } = require('express');
const SalarioController = require('../app/controller/SalarioController');
const router = Router();

//ROTAS SALARIO
router.get('/', SalarioController.index);
router.get('/:id', SalarioController.show);
router.delete('/:id', SalarioController.delete);
router.post('/', SalarioController.store);
router.put('/:id', SalarioController.update);

module.exports = router;
