const db = require('../../database');

class ParcelasRepository{
  async create({id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id}){
    const date = new Date();
    const [rows] = db.query(`INSERT INTO parcelas (id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id, date]);

    return rows;
  }

  async createAllParcelas({id_compras_parceladas, valor_parcela, competencia, status_id, qtda_parcelas}){

    const mes_parcela = competencia;

    const dateArr = mes_parcela.split('-');
    const[year,month,day] = dateArr.map(Number);
    const dateInit = new Date(year,month-1,day);

    let parcelas = [];
    for (let num_parcela = 1; num_parcela <= qtda_parcelas; num_parcela++) {
      let date = new Date();
      const [rows] = await db.query(`INSERT INTO parcelas (id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [id_compras_parceladas, valor_parcela, dateInit, num_parcela, status_id, date]);
      
      parcelas.push(rows)

      dateInit.setMonth(dateInit.getMonth()+1)
      dateInit.getDate();
      dateInit.getMonth()+1;
      dateInit.getFullYear();

    }

    return parcelas;
  }

  async update(id, {id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id}){
     const date = new Date();
     const [row] = db.query(`UPDATE parcelas SET id_compras_parceladas = $1, valor_parcela = $2, competencia = $3, num_parcela = $4, status_id = $5, updated_at = $6 WHERE id = $7 RETURNING *`, [id_compras_parceladas, valor_parcela, competencia, num_parcela, status_id, date, id]);

     return row;
  }
}


module.exports = new ParcelasRepository();
