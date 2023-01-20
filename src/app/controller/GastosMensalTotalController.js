const GastosFixosMensaisRepository = require('../repositories/GastosFixosMensaisRepository');
const GastosMensalTotalRepository = require('../repositories/GastosMensalTotalRepository');
const GastosVariaveisMensaisRepository = require('../repositories/GastosVariaveisMensaisRepository');
const ComprasParceladasRepository = require('../repositories/ComprasParceladasRepository');
const UsuarioRepository = require('../repositories/UsuarioRepository');

class GastosMensalTotalController{
  async index(request, response) {
    const { orderBy } = request.query;
    const gastoMensalTotal = await GastosMensalTotalRepository.findAll(orderBy);

    response.send(gastoMensalTotal);
  }

  async show(request, response) {

  }

  async showByUserAteAgora(request, response){
    const { usuario_id } = request.params;
    const { mes } = request.query;

    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      return response.status(400).json({error: 'Usuário não encontrado!'});
    }

    const parcelas = await ComprasParceladasRepository.findByUserAndMonth(mes, usuario_id);
    const variaveis = await GastosVariaveisMensaisRepository.findByUserAndMonth(usuario_id, mes);
    const fixos = await GastosFixosMensaisRepository.findSumByUser(usuario_id);

    let valorGastoAteMomento = (Number(parcelas.valor) + Number(variaveis.valor) + Number(fixos.valor));

    valorGastoAteMomento = valorGastoAteMomento.toLocaleString('pt-br', {minimumFractionDigits: 2});
    const gastosParcelados = Number(parcelas.valor).toLocaleString('pt-br', {minimumFractionDigits: 2});
    const gastosVariaveis = Number(variaveis.valor).toLocaleString('pt-br', {minimumFractionDigits: 2});
    const gastosFixos = Number(fixos.valor).toLocaleString('pt-br', {minimumFractionDigits: 2});

    return response.json({gastosFixos, gastosParcelados, gastosVariaveis, valorGastoAteMomento})

  }

  async store(request, response) {
    const { 
      valor_total, valor_total_parcelas, valor_total_variaveis, valor_total_fixos, competencia, outros_valores, salario_id, usuario_id
     } = request.body;

  }

  async update() {

  }

  async delete() {

  }
}

module.exports = new GastosMensalTotalController();
