const GastosFixosMensaisRepository = require('../repositories/GastosFixosMensaisRepository');
const GastosMensalTotalRepository = require('../repositories/GastosMensalTotalRepository');
const GastosVariaveisMensaisRepository = require('../repositories/GastosVariaveisMensaisRepository');
const ComprasParceladasRepository = require('../repositories/ComprasParceladasRepository');
const UsuarioRepository = require('../repositories/UsuarioRepository');
const DinheiroGuardadoRepository = require('../repositories/DinheiroGuardadoRepository');
const SalarioRepository = require('../repositories/SalarioRepository');

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
    const { usuario_id, mes, outros_valores } = request.body;

    const buscaUser = await UsuarioRepository.findById(usuario_id);
    if(!buscaUser){
      return response.status(400).json({error: 'Usuário não encontrado!'});
    }

    const parcelas = await ComprasParceladasRepository.findByUserAndMonth(mes, usuario_id);
    const variaveis = await GastosVariaveisMensaisRepository.findByUserAndMonth(usuario_id, mes);
    const fixos = await GastosFixosMensaisRepository.findSumByUser(usuario_id);

    const valorTotalParcelas = Number(parcelas.valor); 
    const valorTotalVariaveis = Number(variaveis.valor);
    const valorTotalFixos = Number(fixos.valor);

    const valorTotal = (valorTotalParcelas + valorTotalVariaveis + valorTotalFixos);
    
    const dinheiroGuardado = await DinheiroGuardadoRepository.findLast(usuario_id);

    const salarioAtual = await SalarioRepository.findAtivoByUser(usuario_id);
    const salario = Number(salarioAtual.valor_liquido);
    const salario_id = salarioAtual.id;

    const sobraMes = (salario - valorTotal);

    const dinheiroGuardadoTotal = (Number(dinheiroGuardado.valor_total) + sobraMes);

    const GastoMensalTotal = await GastosMensalTotalRepository.create(valorTotal, valorTotalParcelas, valorTotalVariaveis, valorTotalFixos, salario_id, {mes, outros_valores, usuario_id});

    const NewDinheiroGuardado = await DinheiroGuardadoRepository.createByMonth(sobraMes, dinheiroGuardadoTotal, mes,usuario_id);

    return response.json({GastoMensalTotal, NewDinheiroGuardado});

  }

  async update() {

  }

  async delete() {

  }
}

module.exports = new GastosMensalTotalController();
