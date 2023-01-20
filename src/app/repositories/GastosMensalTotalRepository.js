const db = require('../../database/index')

class GastosMensalTotalRepository {
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM gasto_mensal_total ORDER BY created_at ${direction}`);

    return rows;
  }

  async findByMonth(month){
    const rows = await db.query(`SELECT * FROM gasto_mensal_total WHERE TO_CHAR(mes, 'YYYY-MM') = $1`, [month]);

    return rows;
  }

  async create(valor_total, valor_total_parcelas, valor_total_variaveis, valor_total_fixos, salario_id, {mes, outros_valores, usuario_id}){
    const date = new Date();
    const [row] = await db.query(`INSERT INTO gasto_mensal_total (valor_total, valor_total_parcelas, valor_total_variaveis, valor_total_fixos, mes, outros_valores, salario_id, usuario_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [valor_total, valor_total_parcelas, valor_total_variaveis, valor_total_fixos, mes+`-10`, outros_valores, salario_id, usuario_id, date]);

    return row;
  }
}

module.exports = new GastosMensalTotalRepository();
