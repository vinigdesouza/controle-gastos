const db = require('../../database');

class ComprasParceladasRepository{
  async findByUser(usuario_id, competencia){
    const status_id = 'a57b57e9-5e9a-4eab-9723-9db3c15338f0';
    const rows = await db.query(`SELECT cp.nome, cp.valor as valor_total, p.valor_parcela, p.num_parcela as parcela_atual, cp.qtda_parcelas FROM compras_parceladas cp JOIN parcelas p ON p.id_compras_parceladas = cp.id WHERE TO_CHAR(p.competencia, 'YYYY-MM') = $1 AND cp.usuario_id = $2 AND p.status_id = $3`, [competencia, usuario_id, status_id]);
    return rows;
  }

  async findByUserAndMonth(mes, usuario_id){
    const status_id = 'a57b57e9-5e9a-4eab-9723-9db3c15338f0';

    console.log(mes, usuario_id, status_id)
    const [row] = await db.query(`SELECT SUM(p.valor_parcela) as valor FROM compras_parceladas cp JOIN parcelas p ON p.id_compras_parceladas = cp.id WHERE TO_CHAR(p.competencia, 'YYYY-MM') = $1 AND cp.usuario_id = $2 AND p.status_id = $3`, [mes, usuario_id, status_id]);
    return row;
  }

  async create({nome, valor, qtda_parcelas, categoria_id, data_compra, usuario_id, status_id}){
    const date = new Date();
    const [rows] = await db.query(`INSERT INTO compras_parceladas (nome, valor, qtda_parcelas, categoria_id, data_compra, usuario_id, status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`, [nome, valor, qtda_parcelas, categoria_id, data_compra, usuario_id, status_id, date]);

    return rows;
  }

  async createAllParcelas({id_compras_parceladas, valor_parcela, competencia, status_id, qtda_parcelas}){

    let mes_parcela = competencia;
    let parcelas = [];
    for (let num_parcela = 1; num_parcela <= qtda_parcelas; num_parcela++) {
      let date = new Date();
      const rows = await db.query(`INSERT INTO parcelas (id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id, date]);

      mes_parcela = new Date(date.setMonth(date.getMonth() + 1));
      console.log(rows);
      parcelas.push(rows)
    }

    return parcelas;
  }
}

module.exports = new ComprasParceladasRepository();

