const SalarioRepository = require('../repositories/SalarioRepository');

class SalarioController {
  async index(request, response) {
    const { orderBy } = request.query;
    const salarios = await SalarioRepository.findAll(orderBy);
    return response.json(salarios);
  }

  async show(request, response) {
    const { id } = request.params;
    const salario = await SalarioRepository.findById(id);

    if (!salario) {
      return response.status(404).json({ error: 'Salario não encontrado' });
    }

    response.json(salario);
  }

  async store(request, response) {
    const {
      valor, valor_liquido, status, usuario_id, ativo_em,
    } = request.body;

    if (!valor || !valor_liquido || !status || !usuario_id || !ativo_em) {
      return response.status(404).json({ error: 'Envie todos os dados' });
    }
    const salario = await SalarioRepository.create({
      valor, valor_liquido, status, usuario_id, ativo_em,
    });

    return response.json(salario);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      valor, valor_liquido, status, usuario_id, ativo_em, inativo_em,
    } = request.body;

    if (!valor || !valor_liquido || !usuario_id || !ativo_em || !inativo_em) {
      return response.status(404).json({ error: 'Envie todos os dados' });
    }

    const salarioExists = await SalarioRepository.findById(id);
    if (!salarioExists) {
      return response.status(404).json({ error: 'Salario não encontrado' });
    }

    const salarioAtualizado = await SalarioRepository.update(id, {
      valor, valor_liquido, status, usuario_id, ativo_em, inativo_em,
    });

    return response.json(salarioAtualizado);
  }

  async delete(request, response) {
    const { id } = request.params;
    const salario = await SalarioRepository.findById(id);

    if (!salario) {
      return response.status(404).json({ error: 'Salario não encontrado' });
    }

    await SalarioRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new SalarioController();
