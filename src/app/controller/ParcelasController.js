const ParcelasRepository = require('../repositories/ParcelasRepository');


class ParcelasController{
  async store(request, response){
    const { id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id } = request.body;

    if(!id_compras_parceladas || !valor_parcela || !competencia || !num_parcela || !created_at || !status_id){
      return response.status(400).json({error: `Os parametros id_compras_parceladas, valor_parcela, competencia, num_parcela, created_at, status_id são obrigatórios!`});
    }

    const parcelasCriadas = await ParcelasRepository.create({id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id});

    return response.json(parcelasCriadas);
  }
}

module.exports = new ParcelasController();
