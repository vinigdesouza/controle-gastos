const ComprasParceladasRepository = require('../repositories/ComprasParceladasRepository');
const ParcelasRepository = require('../repositories/ParcelasRepository');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class ComprasParceladasController{
  async index(request, response){}

  async show(request, response){}

  async showByUser(request, response){
    const { usuario_id } = request.params;
    const { competencia } = request.query;
    
    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      return response.status(400).json({error: 'Usuário não encontrado!'});
    }

    const parcelasUsuario = await ComprasParceladasRepository.findByUser(usuario_id, competencia);

    return response.json(parcelasUsuario);
  }

  async store(request, response){
    const { nome, valor, qtda_parcelas, categoria_id, data_compra, competencia, usuario_id, status_id } = request.body;
    const valor_parcela = (valor / qtda_parcelas);

    if(!nome || !valor || !qtda_parcelas || !categoria_id || !data_compra || !usuario_id){
      response.status(400).json({error: `Os parametros valor, qtda_parcelas, categoria_id, data_compra, usuario_id são obrigatorios!`});
    }

    const idComprasParceladas = await ComprasParceladasRepository.create({nome, valor, qtda_parcelas, categoria_id, data_compra, usuario_id, status_id});
    
    const id_compras_parceladas = idComprasParceladas.id
    const parcelas = await ParcelasRepository.createAllParcelas({id_compras_parceladas, valor_parcela, competencia, status_id, qtda_parcelas});

    return response.json(parcelas);
  }

  async update(request, response){}

  async delete(request, response){}
  
}

module.exports = new ComprasParceladasController();
