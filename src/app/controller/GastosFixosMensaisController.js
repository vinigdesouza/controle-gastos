const GastosFixosMensaisRepository = require('../repositories/GastosFixosMensaisRepository');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class GastosFixosMensaisController {
  async index(request, response){
    const GastosFixosMensais = await GastosFixosMensaisRepository.findAll();
    return response.json(GastosFixosMensais);
  }

  async show(request, response){
    const { id } = request.params;

    if(!id){
      response.status(400).json({error: "O id deve ser enviado!"});
    }

    const gastoFixo = await GastosFixosMensaisRepository.findById(id);
    if(!gastoFixo){
      response.status(400).json({error: "Gasto não encontrado!"});
    }

    return response.json(gastoFixo);
  }

  async showByUser(request, response){
    const { usuario_id } = request.params;

    if(!usuario_id){
      response.status(400).json({error: "O id do usuario deve ser enviado!"});
    }

    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      response.status(400).json({error: "Usuário não existe!"});
    }

    const GastosFixosMensais = await GastosFixosMensaisRepository.findByUser(usuario_id);
    return response.json(GastosFixosMensais);
  }

  async store(request, response){
    const { 
      nome, valor, categoria_id, usuario_id
     } = request.body;

    if(!valor || !categoria_id || !usuario_id){
      response.status(400).json({error: "Os parametros nome, valor, usuario_id, categoria_id são obrigatorios!"});
    }
    const GastoFixo = await GastosFixosMensaisRepository.create({nome, valor, categoria_id, usuario_id});

    response.send(GastoFixo);
  }

  async update(request, response){
    const { id } = request.params;
    const { nome, valor, categoria_id, usuario_id, status, inativado_em } = request.body;

    if(!nome || !valor || !categoria_id || !usuario_id || (status != 1 && status != 0)){
      response.status(400).json({error: "Os parametros nome, valor, usuario_id, categoria_id, status, inativado_em são obrigatorios!"});
    }

    const buscaGastoFixo = await GastosFixosMensaisRepository.findById(id);
    if(!buscaGastoFixo){
      response.status(400).json({error: "Gasto não encontrado!"});
    }

    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      response.status(400).json({error: "Usuário não existe!"});
    }
    
    const updatedGasto = await GastosFixosMensaisRepository.update(id, {nome, valor, categoria_id, usuario_id, status, inativado_em});

    response.json(updatedGasto);
  }

  async delete(request, response){
    const { id } = request.params;
    if(!id){
      response.status(400).json({error: "O id deve ser enviado!"});
    }

    const gastoFixo = await GastosFixosMensaisRepository.findById(id);
    if(!gastoFixo){
      response.status(400).json({error: "Gasto não encontrado!"});
    }

    await GastosFixosMensaisRepository.delete(id);

    return response.sendStatus(204);
  }
}


module.exports = new GastosFixosMensaisController();
