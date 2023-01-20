const DinheiroGuardadoRepository = require('../repositories/DinheiroGuardadoRepository');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class DinheiroGuardadoController{
  async index(request, response){
    const dinheiroGuardado = await DinheiroGuardadoRepository.findAll();
    return response.json(dinheiroGuardado);
  }

  async show(request, response){
    const { id } = request.params;

    const dinheiroGuardado = await DinheiroGuardadoRepository.findById(id);
    return response.json(dinheiroGuardado);
  }

  async showByMonth(request, response){
    const { mes } = request.params;

    const dinheiroGuardado = await DinheiroGuardadoRepository.findByMonth(mes);
    return response.json(dinheiroGuardado);
  }

  async showByUser(request, response){
    const { usuario_id } = request.params;

    const dinheiroGuardado = await DinheiroGuardadoRepository.findByUser(usuario_id);
    return response.json(dinheiroGuardado);
  }

  async store(request, response){
    const { valor, competencia, valor_total, usuario_id } = request.body;

    if(!valor || !competencia || !valor_total || !usuario_id){
      return response.status(400).json({error: `Os parametros valor, competencia, valor_total, usuario_id são obrigatorios`});
    }

    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      return response.status(400).json({error: `O usuario não existe.`});
    }

    const dinheiroGuardado = await DinheiroGuardadoRepository.create({valor, competencia, valor_total, usuario_id});

    return response.json(dinheiroGuardado);
  }

  async update(request, response){
    const { id } = request.params;
    const { valor, competencia, valor_total, usuario_id } = request.body;

    if(!valor || !competencia || !valor_total || !usuario_id){
      return response.status(400).json({error: `Os parametros valor, competencia, valor_total, usuario_id são obrigatorios`});
    }

    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      return response.status(400).json({error: `O usuario não existe.`});
    }

    const dinheiroGuardado = await DinheiroGuardadoRepository.update(id, {valor, competencia, valor_total, usuario_id});
    return response.json(dinheiroGuardado);
  }

  async delete(request, response){
    const { id } = request.params;

    await DinheiroGuardadoRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new DinheiroGuardadoController();
