CREATE DATABASE controlegastos;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS status_pagamento (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  descricao VARCHAR(45) NOT NULL,
  created_at DATE NOT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX idx_status_pagamento ON status_pagamento(id);

CREATE TABLE IF NOT EXISTS status (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  descricao VARCHAR(45) NOT NULL,
  created_at DATE NOT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX idx_status ON status(id);
CREATE INDEX descricaox_status ON status(descricao);

CREATE TABLE IF NOT EXISTS usuario (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR(300) NOT NULL,
  email VARCHAR(150) NOT NULL,
  username VARCHAR(200) NOT NULL,
  senha VARCHAR(500) NULL DEFAULT NULL,
  dt_nascimento DATE NULL DEFAULT NULL,
  cpf VARCHAR(15) NULL DEFAULT NULL,
  status INT NULL DEFAULT 1,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX idx_usuario ON usuario(id);

CREATE TABLE IF NOT EXISTS categoria (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(500) NULL DEFAULT NULL,
  created_at DATE NOT NULL,
  PRIMARY KEY (id)
);
CREATE INDEX idx_categoria ON categoria(id);
CREATE INDEX nomex_categoria ON categoria(nome);

CREATE TABLE IF NOT EXISTS salario (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  valor DECIMAL(10,2) NOT NULL,
  valor_liquido DECIMAL(10,2) NOT NULL,
  created_at DATE NOT NULL,
  status INT NOT NULL DEFAULT 1,
  ativo_em DATE NOT NULL,
  inativo_em DATE NOT NULL,
  usuario_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_usuarioId
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE INDEX fk_usuarioId_idx ON usuario(id);

CREATE TABLE IF NOT EXISTS dinheiro_guardado (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  valor DECIMAL(10,2) NOT NULL,
  competencia DATE NOT NULL,
  valor_total DECIMAL(10,2) NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  usuario_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_usuarioId
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE INDEX fk_usuarioId ON dinheiro_guardado(usuario_id);

CREATE TABLE IF NOT EXISTS gasto_mensal_total (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  valor_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  valor_total_parcelas DECIMAL(10,2) NOT NULL DEFAULT 0,
  valor_total_variaveis DECIMAL(10,2) NOT NULL DEFAULT 0,
  valor_total_fixos DECIMAL(10,2) NOT NULL,
  competencia DATE NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  outros_valores DECIMAL(10,2) NULL DEFAULT 0,
  salario_id UUID NOT NULL,
  usuairio_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_salarioId
    FOREIGN KEY (salario_id)
    REFERENCES salario (id)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT,
  CONSTRAINT fk_usuarioId
    FOREIGN KEY (usuairio_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE INDEX fk_salarioId_idxgmt ON gasto_mensal_total(usuairio_id);

CREATE TABLE IF NOT EXISTS gastos_variaveis_mensal (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  valor DECIMAL(10,2) NOT NULL DEFAULT 0,
  categoria_id UUID NULL DEFAULT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  data_compra DATE NOT NULL,
  usuario_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_categoriaId
    FOREIGN KEY (categoria_id)
    REFERENCES categoria (id)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT,
  CONSTRAINT fk_usuarioId
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE INDEX fk_categoriaId_idxgvm ON gastos_variaveis_mensal(categoria_id);
CREATE INDEX fk_usuario_idxgvm ON gastos_variaveis_mensal(usuario_id);

CREATE TABLE IF NOT EXISTS gastos_fixos_mensal (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  valor DECIMAL(10,2) NOT NULL DEFAULT 0,
  categoria_id UUID NULL DEFAULT NULL,
  ativo_em DATE NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  inativado_em DATE NULL DEFAULT NULL,
  status INT NOT NULL DEFAULT 1,
  usuario_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_categoriaId
    FOREIGN KEY (categoria_id)
    REFERENCES categoria (id)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT,
  CONSTRAINT fk_usuarioId
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE INDEX fk_categoriaId_idxgfm ON gastos_fixos_mensal(categoria_id);
CREATE INDEX fk_usuario_idxgfm ON gastos_fixos_mensal(usuario_id);

CREATE TABLE IF NOT EXISTS compras_paceladas (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  valor DECIMAL(10,2) NOT NULL DEFAULT 0,
  qtda_parcelas INT NOT NULL DEFAULT 1,
  categoria_id UUID NULL DEFAULT NULL,
  data_compra DATE NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  pag_feito_em DATE NULL DEFAULT NULL,
  usuario_id UUID NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_categoriaiD
    FOREIGN KEY (categoria_id)
    REFERENCES categoria (id)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT,
  CONSTRAINT fk_usuarioId
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);
CREATE INDEX fk_categoriaId_idxcp ON compras_paceladas(categoria_id);
CREATE INDEX fk_usuario_idxcp ON compras_paceladas(usuario_id);

CREATE TABLE IF NOT EXISTS parcelas (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  id_compras_parceladas UUID NOT NULL,
  valor_parcela DECIMAL(10,2) NOT NULL DEFAULT 0,
  data_cobranca DATE NOT NULL,
  num_parcela INT NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_idComprasParceladas
    FOREIGN KEY (id_compras_parceladas)
    REFERENCES compras_paceladas (id)
    ON DELETE NO ACTION
    ON UPDATE RESTRICT
);
CREATE INDEX fk_idComprasParceladas_idx ON parcelas(id_compras_parceladas);
