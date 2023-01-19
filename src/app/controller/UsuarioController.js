const UsuarioRepository = require('../repositories/UsuarioRepository');

class UsuarioController {
  async index(request, response) {
    const { orderBy } = request.query;
    const salarios = await UsuarioRepository.findAll(orderBy);
    return response.json(salarios);
  }

  async show(request, response) {
    const { id } = request.params;
    const salario = await UsuarioRepository.findById(id);

    if (!salario) {
      return response.status(404).json({ error: 'Usuario não encontrado' });
    }

    response.json(salario);
  }

  async store(request, response) {
    const {
      nome, email, username, senha, dt_nascimento, cpf, status
    } = request.body;

    if (!nome || !email || !username || !dt_nascimento || !cpf || (status != 1 && status != 0)) {
      return response.status(404).json({ error: 'Envie todos os dados' });
    }
    const salario = await UsuarioRepository.create({
      nome, email, username, senha, dt_nascimento, cpf, status
    });

    return response.json(salario);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      nome, email, username, senha, dt_nascimento, cpf, status
    } = request.body;

    if (!nome || !email || !username || !dt_nascimento || !cpf || (status != 1 && status != 0)) {
      return response.status(404).json({ error: 'Envie todos os dados' });
    }

    const salarioExists = await UsuarioRepository.findById(id);
    if (!salarioExists) {
      return response.status(404).json({ error: 'Usuario não encontrado' });
    }

    const salarioAtualizado = await UsuarioRepository.update(id, {
      nome, email, username, senha, dt_nascimento, cpf, status
    });

    return response.json(salarioAtualizado);
  }

  async delete(request, response) {
    const { id } = request.params;
    const salario = await UsuarioRepository.findById(id);

    if (!salario) {
      return response.status(404).json({ error: 'Salario não encontrado' });
    }

    await UsuarioRepository.delete(id);

    return response.sendStatus(204);
  }
}

module.exports = new UsuarioController();
