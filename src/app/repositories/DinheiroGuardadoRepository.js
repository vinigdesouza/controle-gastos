const db = require('../../database');

class DinheiroGuardadoRepository{
  async findAll(){
    const rows = await db.query(`SELECT * FROM dinheiro_guardado ORDER BY created_at`);
    return rows;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM dinheiro_guardado WHERE id = $1`, [id]);
    return row;
  }

  async findByMonth(mes){
    const [row] = await db.query(`SELECT * FROM dinheiro_guardado WHERE TO_CHAR(competencia, 'YYYY-MM') = $1`, [mes]);
    return row;
  }

  async create({valor, competencia, valor_total, usuario_id}){
    const date = new Date();
    const [row] = await db.query(`INSERT INTO dinheiro_guardado (valor, competencia, valor_total, usuario_id, created_at) VALUES($1, $2, $3, $4, $5) RETURNING *`, [valor, competencia, valor_total, usuario_id, date]);
    return row;
  }

  async update(id, {valor, competencia, valor_total, usuario_id}){
    const date = new Date();
    const [row] = await db.query(`UPDATE dinheiro_guardado SET valor = $1, competencia = $2, valor_total = $3, usuario_id = $4, updated_at = $5 WHERE id = $6 RETURNING *`, [valor, competencia, valor_total, usuario_id, date, id]);
    return row;
  }

  async delete(id){
    const row = await db.query(`DELETE FROM dinheiro_guardado  WHERE id = $1`, [id]);
    return row;
  }
}

module.exports = new DinheiroGuardadoRepository();
