const produtoModel = require("../models/produtoModel");
const categoriaModel = require("../models/categoriaModel"); // Precisamos para validar a categoria

const getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.getAll();
    res.status(200).json(produtos);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await produtoModel.getById(id);
    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ mensagem: `Produto ${id} não encontrado` });
    }
  } catch (error) {
    console.error(`Erro ao buscar produto ${id}:`, error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const getProdutosByCategoria = async (req, res) => {
  const { categoriaId } = req.params;
  try {
    const produtos = await produtoModel.getByCategoriaId(categoriaId);
    if (produtos.length > 0) {
      res.status(200).json(produtos);
    } else {
      res.status(404).json({ mensagem: `Nenhum produto encontrado para a categoria ${categoriaId}` });
    }
  } catch (error) {
    console.error(`Erro ao buscar produtos da categoria ${categoriaId}:`, error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const createProduto = async (req, res) => {
  const { nome, preco, estoque, categoria_id } = req.body;

  if (!nome || !preco || !estoque || !categoria_id) {
    return res.status(400).json({
      mensagem: "Campos obrigatórios: nome, preco, estoque, categoria_id",
    });
  }
  if (parseFloat(preco) <= 0) {
    return res.status(400).json({ mensagem: "Preço deve ser maior que zero" });
  }
  if (parseInt(estoque) < 0) {
    return res.status(400).json({ mensagem: "Estoque não pode ser negativo" });
  }

  try {
    const categoriaExists = await categoriaModel.getById(categoria_id);
    if (!categoriaExists) {
      return res.status(404).json({ mensagem: `Categoria ${categoria_id} não encontrada` });
    }

    const novoProduto = await produtoModel.create(nome, parseFloat(preco), parseInt(estoque), categoria_id);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, preco, estoque, categoria_id } = req.body;

  if (!nome || !preco || !estoque || !categoria_id) {
    return res.status(400).json({
      mensagem: "Campos obrigatórios: nome, preco, estoque, categoria_id",
    });
  }
  if (parseFloat(preco) <= 0) {
    return res.status(400).json({ mensagem: "Preço deve ser maior que zero" });
  }
  if (parseInt(estoque) < 0) {
    return res.status(400).json({ mensagem: "Estoque não pode ser negativo" });
  }

  try {
    const categoriaExists = await categoriaModel.getById(categoria_id);
    if (!categoriaExists) {
      return res.status(404).json({ mensagem: `Categoria ${categoria_id} não encontrada` });
    }

    const produtoAtualizado = await produtoModel.update(id, nome, parseFloat(preco), parseInt(estoque), categoria_id);
    if (produtoAtualizado) {
      res.status(200).json(produtoAtualizado);
    } else {
      res.status(404).json({ mensagem: `Produto ${id} não encontrado` });
    }
  } catch (error) {
    console.error(`Erro ao atualizar produto ${id}:`, error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoRemovido = await produtoModel.remove(id);
    if (produtoRemovido) {
      res.status(200).json({ mensagem: `Produto ${id} removido com sucesso` });
    } else {
      res.status(404).json({ mensagem: `Produto ${id} não encontrado` });
    }
  } catch (error) {
    console.error(`Erro ao remover produto ${id}:`, error);
    res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  getProdutosByCategoria,
  createProduto,
  updateProduto,
  deleteProduto,
};
