const db = require('../../database/index');

class StatusPagamentoRepository{
  async findByDescricao(descricao){
    const [row] = db.query(`SELECT * FROM status_pagamento WHERE descricao = $1`, [descricao]);

    return row;
  }
}


module.exports = new StatusPagamentoRepository();
