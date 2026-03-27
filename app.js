require("dotenv").config();
const express = require("express");
const pool = require("./src/config/db"); // Importa a conexão com o banco de dados

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE: permite ler JSON no body das requisições
app.use(express.json());

// Importa as rotas
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const produtoRoutes = require("./src/routes/produtoRoutes");

// Usa as rotas
app.use("/api/categorias", categoriaRoutes);
app.use("/api/produtos", produtoRoutes);

// Rota de teste simples
app.get("/", (req, res) => {
  res.send("API REST com Node.js e PostgreSQL está funcionando!");
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 Acesse http://localhost:${PORT}/api/produtos`);
  console.log(`📋 Acesse http://localhost:${PORT}/api/categorias`);
});

module.exports = app;