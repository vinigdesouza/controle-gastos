const StatusPagamentoRepository = require('../repositories/StatusPagamentoRepository');

class StatusPagamentoController{
  async index(request, response){
    const statusPagamento = await StatusPagamentoRepository.findAll();
    return response.json(statusPagamento);
  }
}

module.exports = new StatusPagamentoController();
