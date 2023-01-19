const db = require('../../database/index')

class UsuarioRepository {
  async findAll(orderBy = 'ASC'){
    const direction = orderBy.toUpperCase() == 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM usuario ORDER BY created_at ${direction}`);

    return rows;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM usuario WHERE id = $1`, 
    [id]);

    return row;
  }

  async create({nome, email, username, senha, dt_nascimento, cpf, status}){
    let date = new Date();
    const [row] = await db.query(`INSERT INTO usuario (nome, email, username, senha, dt_nascimento, cpf, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, 
    [nome, email, username, senha, dt_nascimento, cpf, status, date]);

    return row;
  }

  async update(id, {nome, email, username, senha, dt_nascimento, cpf, status}){
    let date = new Date();
    const [row] = await db.query(`UPDATE usuario SET nome = $1, email = $2, username = $3, senha = $4, dt_nascimento = $5, cpf = $6, status = $7, updated_at = $8 WHERE id = $9 RETURNING *`, 
    [nome, email, username, senha, dt_nascimento, cpf, status, date, id]);

    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`DELETE FROM usuario WHERE id = $1`, [id]);

    return deleteOp;
  }
}

module.exports = new UsuarioRepository();