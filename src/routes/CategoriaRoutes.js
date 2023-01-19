const { Router } = require('express');
const CategoriaController = require('../app/controller/CategoriaController');
const routes = Router();

routes.get('/', CategoriaController.index);
routes.get('/:id', CategoriaController.show);
routes.delete('/:id', CategoriaController.delete);
routes.post('/', CategoriaController.store);
routes.put('/:id', CategoriaController.update);

module.exports = routes;
