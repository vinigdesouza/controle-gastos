const db = require('../../database');

class GastosVariaveisMensaisRepository{
  async findAll(){
    const rows = await db.query(`SELECT * FROM gastos_variaveis_mensal ORDER BY created_at ASC`);
    return rows;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM gastos_variaveis_mensal WHERE id = $1 ORDER BY created_at ASC`, [id]);
    return row;
  }

  async findByUserAndMonth(usuario_id, mes){
    const [rows] = await db.query(`SELECT SUM(valor) as valor FROM gastos_variaveis_mensal WHERE usuario_id = $1 AND TO_CHAR(mes, 'YYYY-MM') = $2`, [usuario_id, mes]);
    return rows;
  }

  async findByUser(usuario_id, mes){
    const rows = await db.query(`SELECT * FROM gastos_variaveis_mensal WHERE usuario_id = $1 AND TO_CHAR(mes, 'YYYY-MM') = $2`, [usuario_id, mes]);
    return rows;
  }
  
  async create({nome, valor, categoria_id, data_compra, usuario_id, mes}){
    const date = new Date();
    const [row] = await db.query(`INSERT INTO gastos_variaveis_mensal (nome, valor, categoria_id, data_compra, usuario_id, mes, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [nome, valor, categoria_id, data_compra, usuario_id, mes, date]);

    return row;
  }

  async update(id, {nome, valor, categoria_id, data_compra, usuario_id, mes}){
    const date = new Date();
    const [row]= await db.query(`UPDATE gastos_variaveis_mensal SET nome = $1, valor = $2, categoria_id = $3, data_compra = $4, usuario_id = $5, mes = $6, updated_at = $7 WHERE id = $8 RETURNING *`, [nome, valor, categoria_id, data_compra, usuario_id, mes, date, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`DELETE FROM gastos_variaveis_mensal WHERE id = $1`, [id]);

    return deleteOp;
  }
}

module.exports = new GastosVariaveisMensaisRepository();
