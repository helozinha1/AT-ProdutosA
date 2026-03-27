const pool = require("../config/db");

const getAll = async () => {
  const result = await pool.query("SELECT * FROM categorias ORDER BY nome");
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [id]);
  return result.rows[0];
};

const create = async (nome) => {
  const result = await pool.query(
    "INSERT INTO categorias (nome) VALUES ($1) RETURNING *",
    [nome]
  );
  return result.rows[0];
};

const update = async (id, nome) => {
  const result = await pool.query(
    "UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *",
    [nome, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query("DELETE FROM categorias WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
};

const countProdutosAssociados = async (id) => {
  const result = await pool.query(
    "SELECT COUNT(*) FROM produtos WHERE categoria_id = $1",
    [id]
  );
  return parseInt(result.rows[0].count);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  countProdutosAssociados,
};
