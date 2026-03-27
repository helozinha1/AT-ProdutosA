const categoriaModel = require("../models/categoriaModel");

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriaModel.getAll();
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getCategoriaById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await categoriaModel.getById(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ mensagem: `Categoria ${id} não encontrada` });
    }
  } catch (error) {
    console.error(`Erro ao buscar categoria ${id}:`, error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const createCategoria = async (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ mensagem: "O nome da categoria é obrigatório" });
  }
  try {
    const novaCategoria = await categoriaModel.create(nome);
    res.status(201).json(novaCategoria);
  } catch (error) {
    console.error("Erro ao criar categoria:", error);
    if (error.code === "23505") {
      return res.status(409).json({ mensagem: "Categoria com este nome já existe" });
    }
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ mensagem: "O nome da categoria é obrigatório" });
  }
  try {
    const categoriaAtualizada = await categoriaModel.update(id, nome);
    if (categoriaAtualizada) {
      res.status(200).json(categoriaAtualizada);
    } else {
      res.status(404).json({ mensagem: `Categoria ${id} não encontrada` });
    }
  } catch (error) {
    console.error(`Erro ao atualizar categoria ${id}:`, error);
    if (error.code === "23505") {
      return res.status(409).json({ mensagem: "Categoria com este nome já existe" });
    }
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const produtosAssociados = await categoriaModel.countProdutosAssociados(id);
    if (produtosAssociados > 0) {
      return res.status(409).json({
        mensagem: `Não é possível remover a categoria ${id} pois existem produtos associados a ela.`,
      });
    }

    const categoriaRemovida = await categoriaModel.remove(id);
    if (categoriaRemovida) {
      res.status(200).json({ mensagem: `Categoria ${id} removida com sucesso` });
    } else {
      res.status(404).json({ mensagem: `Categoria ${id} não encontrada` });
    }
  } catch (error) {
    console.error(`Erro ao remover categoria ${id}:`, error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
