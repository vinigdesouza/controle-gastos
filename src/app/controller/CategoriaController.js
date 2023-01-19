const CategoriaRepository = require('../repositories/CategoriaRepository');

class CategoriaController{
  async index(request, response){
    const categoria = await CategoriaRepository.findAll();
    return response.json(categoria);
  }

  async show(request, response){
    const { id } = request.params;

    const categoria = await CategoriaRepository.findById(id);
    if(!categoria){
      return response.status(400).json({error: `Categoria não encontrada.`});
    }

    return response.json(categoria);
  }

  async store(request, response){
    const { nome, descricao } = request.body;

    if(!nome || !descricao){
      return response.status(400).json({error: `Os parametros nome, descricao são obrigatorios!`});
    }
    const categoria = await CategoriaRepository.create({nome, descricao});

    return response.json(categoria);
  }

  async update(request, response){
    const { id } = request.params; 
    const { nome, descricao } = request.body;

    if(!nome || !descricao){
      return response.status(400).json({error: `Os parametros nome, descricao são obrigatorios!`});
    }

    const buscaCategoria = await CategoriaRepository.findById(id);
    if(!buscaCategoria){
      return response.status(400).json({error: `Categoria não encontrada.`});
    }

    const categoriaAtualizada = await CategoriaRepository.update(id, {nome, descricao});

    return response.json(categoriaAtualizada);
  }

  async delete(request, response){
    const { id } = request.params;

    await CategoriaRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new CategoriaController();
