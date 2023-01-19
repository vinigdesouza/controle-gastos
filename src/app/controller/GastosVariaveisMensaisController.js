const GastosVariaveisMensaisRepository = require('../repositories/GastosVariaveisMensaisRepository');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class GastosVariaveisMensaisController{
  async index(request, response){
    const gastos = await GastosVariaveisMensaisRepository.findAll();

    return response.json(gastos);
  }

  async showByUser(request, response){
    const { usuario_id } = request.params;
    const { mes } = request.query;
    
    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      return response.status(400).json({error: 'Usuário não encontrado!'});
    }

    const gastosFixosMes = await GastosVariaveisMensaisRepository.findByUserAndMonth(usuario_id, mes);

    return response.json(gastosFixosMes);

  }

  async show(request, response){
    const { id } = request.params;
    const gasto = await GastosVariaveisMensaisRepository.findById(id);
    if(!gasto){
      return response.status(400).json({error: 'Nenhuma compra com esse ID!'});
    }
    return response.json(gasto);
  }

  async store(request, response){
    const { nome, valor, categoria_id, data_compra, usuario_id, mes } = request.body;

    if(!nome || !valor || !categoria_id || !data_compra || !usuario_id || !mes){
      return response.status(400).json({error: 'Os parametros nome, valor, categoria_id, data_compra, usuario_id, mes são obrigatorios!'});
    }

    const gastoVariavel = await GastosVariaveisMensaisRepository.create({nome, valor, categoria_id, data_compra, usuario_id, mes});

    return response.json(gastoVariavel);
  }

  async update(request, response){
    const { id } = request.params;
    const { nome, valor, categoria_id, data_compra, usuario_id, mes } = request.body;

    if(!nome || !valor || !categoria_id || !data_compra || !usuario_id || !mes){
      return response.status(400).json({error: 'Os parametros nome, valor, categoria_id, data_compra, usuario_id, mes são obrigatorios!'});
    }

    const gasto = await GastosVariaveisMensaisRepository.findById(id);
    if(!gasto){
      return response.status(400).json({error: 'Nenhuma compra entrada com esse ID!'});
    }

    const compraAtualizada = await GastosVariaveisMensaisRepository.update(id, {nome, valor, categoria_id, data_compra, usuario_id, mes});

    return response.json(compraAtualizada)

  }

  async delete(request, response){
    const { id } = request.params;

    const deleteOp = await GastosVariaveisMensaisRepository.delete(id);

    return response.sendStatus(204);
  }
}


module.exports = new GastosVariaveisMensaisController();
