const pool = require("../config/db");

const getAll = async () => {
  const result = await pool.query(
    `SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON p.categoria_id = c.id
     ORDER BY p.nome`
  );
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query(
    `SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON p.categoria_id = c.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
};

const getByCategoriaId = async (categoriaId) => {
  const result = await pool.query(
    `SELECT p.id, p.nome, p.preco, p.estoque, c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON p.categoria_id = c.id
     WHERE p.categoria_id = $1
     ORDER BY p.nome`,
    [categoriaId]
  );
  return result.rows;
};

const create = async (nome, preco, estoque, categoria_id) => {
  const result = await pool.query(
    "INSERT INTO produtos (nome, preco, estoque, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [nome, preco, estoque, categoria_id]
  );
  return result.rows[0];
};

const update = async (id, nome, preco, estoque, categoria_id) => {
  const result = await pool.query(
    "UPDATE produtos SET nome = $1, preco = $2, estoque = $3, categoria_id = $4 WHERE id = $5 RETURNING *",
    [nome, preco, estoque, categoria_id, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query("DELETE FROM produtos WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

module.exports = {
  getAll,
  getById,
  getByCategoriaId,
  create,
  update,
  remove,
};
