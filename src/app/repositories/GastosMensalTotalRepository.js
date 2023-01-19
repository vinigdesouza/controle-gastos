const db = require('../../database/index')

class GastosMensalTotalRepository {
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM gasto_mensal_total ORDER BY created_at ${direction}`);

    return rows;
  }
}

module.exports = new GastosMensalTotalRepository();
