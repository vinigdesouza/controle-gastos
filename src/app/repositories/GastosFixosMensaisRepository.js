const db = require('../../database');

class GastosFixosMensaisRepository {
  async findAll(){
    const rows = await db.query(`SELECT * FROM gastos_fixos_mensal WHERE status = 1`);
    return rows;
  }

  async findSumByUser(usuario_id){
    const [row] = await db.query(`SELECT SUM(valor) as valor FROM gastos_fixos_mensal WHERE usuario_id = $1 AND status = $2 AND inativado_em IS NULL`, [usuario_id, 1]);
    return row;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM gastos_fixos_mensal WHERE id = $1`, [id]);
    return [row];
  }

  async findByUser(usuario_id){
    const rows = await db.query(`SELECT * FROM gastos_fixos_mensal WHERE usuario_id = $1`, [usuario_id]);
    return rows;
  }

  async create({nome, valor, categoria_id, usuario_id}){
    const date = new Date();
    const [row] = await db.query(`INSERT INTO gastos_fixos_mensal (nome, valor, categoria_id, ativo_em, created_at, status, usuario_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [nome, valor, categoria_id, date, date, 1, usuario_id]);

    return row;
  }

  async update(id, {nome, valor, categoria_id, usuario_id, status, inativado_em}){
    const date = new Date();
    const [row] = await db.query(`UPDATE gastos_fixos_mensal SET nome = $1, valor = $2, categoria_id = $3, status = $4, usuario_id = $5, updated_at = $6, inativado_em = $7 WHERE id = $8 RETURNING *`, [nome, valor, categoria_id, status, usuario_id, date, inativado_em, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`DELETE FROM gastos_fixos_mensal WHERE id = $1`, [id]);

    return deleteOp;
  }
}

module.exports = new GastosFixosMensaisRepository();
