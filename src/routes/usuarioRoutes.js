const { Router } = require('express');
const UsuarioController = require('../app/controller/UsuarioController');
const router = Router();

//ROTAS SALARIO
router.get('/', UsuarioController.index);
router.get('/:id', UsuarioController.show);
router.delete('/:id', UsuarioController.delete);
router.post('/', UsuarioController.store);
router.put('/:id', UsuarioController.update);

module.exports = router;
