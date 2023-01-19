const db = require('../../database/index')

class SalarioRepository {
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM salario ORDER BY ativo_em ${direction}`);

    return rows;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM salario WHERE id = $1`, 
    [id]);

    return row;
  }

  async create({valor, valor_liquido, status, usuario_id, ativo_em}){
    let date = new Date();
    const [row] = await db.query(`INSERT INTO salario (valor, valor_liquido, status, usuario_id, created_at, ativo_em) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, 
    [valor, valor_liquido, status, usuario_id, date, ativo_em]);

    return row;
  }

  async update(id, {valor, valor_liquido, status, usuario_id, ativo_em, inativo_em}){
    const [row] = await db.query(`UPDATE salario SET valor = $1, valor_liquido = $2, status = $3, usuario_id = $4, ativo_em = $5, inativo_em = $6 WHERE id = $7 RETURNING *`, 
    [valor, valor_liquido, status, usuario_id, ativo_em, inativo_em, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`DELETE FROM salario WHERE id = $1`, [id]);

    return deleteOp;
  }
}

module.exports = new SalarioRepository();