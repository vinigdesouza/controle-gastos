const ComprasParceladasRepository = require('../repositories/ComprasParceladasRepository');
const ParcelasRepository = require('../repositories/ParcelasRepository');


class ParcelasController{
  async store(request, response){
    const { id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id } = request.body;

    if(!id_compras_parceladas || !valor_parcela || !competencia || !num_parcela || !status_id){
      return response.status(400).json({error: `Os parametros id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id são obrigatórios!`});
    }

    const parcelasCriadas = await ParcelasRepository.create({id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id});

    return response.json(parcelasCriadas);
  }

  async update(request, response){
    const { id } = request.params;
    const { id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id } = request.body;

    if(!id_compras_parceladas || !valor_parcela || !competencia || !num_parcela || !status_id){
      return response.status(400).json({error: `Os parametros id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id são obrigatórios!`});
    }

    const compraParcelada = await ComprasParceladasRepository.findbyId(id_compras_parceladas);
    if(!compraParcelada){
      return response.status(400).json({error: `Compra parcelada não encontrada!`});
    }

    const parcelaAtualizada = await ParcelasRepository.update(id, {id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id});

    return response.json(parcelaAtualizada);
  }
}

module.exports = new ParcelasController();
