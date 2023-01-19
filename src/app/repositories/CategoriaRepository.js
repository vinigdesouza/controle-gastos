const db = require('../../database');

class CategoriaRepository{
  async findAll(){
    const rows = await db.query(`SELECT * FROM categoria`);
    return rows;
  }

  async findById(id){
    const [row] = await db.query(`SELECT * FROM categoria WHERE id = $1`, [id]);
    return row;
  }

  async create({nome, descricao}){
    const date = new Date();
    const [row] = await db.query(`INSERT INTO categoria (nome, descricao, created_at) VALUES ($1, $2, $3) RETURNING *`, [nome, descricao, date]);
    return row;
  }

  async update(id, {nome, descricao}){
    const [row] = await db.query(`UPDATE categoria SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *`, [nome, descricao, id]);
    return row;
  }

  async delete(id){
    const deleteOp = await db.query(`DELETE FROM categoria WHERE id = $1`, [id]);
    return deleteOp;
  }
}

module.exports = new CategoriaRepository();
