const pool = require("./src/config/db");

const createTables = async () => {
  try {
    // Dropar tabelas se existirem (para facilitar o desenvolvimento)
    await pool.query("DROP TABLE IF EXISTS produtos CASCADE");
    await pool.query("DROP TABLE IF EXISTS categorias CASCADE");

    // Criar tabela categorias
    await pool.query(`
      CREATE TABLE categorias (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100) NOT NULL UNIQUE
      );
    `);
    console.log("Tabela categorias criada com sucesso!");

    // Criar tabela produtos
    await pool.query(`
      CREATE TABLE produtos (
          id SERIAL PRIMARY KEY,
          nome VARCHAR(100) NOT NULL,
          preco DECIMAL(10,2) NOT NULL,
          estoque INTEGER NOT NULL DEFAULT 0,
          categoria_id INTEGER NOT NULL REFERENCES categorias(id)
      );
    `);
    console.log("Tabela produtos criada com sucesso!");

    // Inserir dados iniciais
    await pool.query(`
      INSERT INTO categorias (nome) VALUES
      (\'Informática\'),
      (\'Áudio\'),
      (\'Periféricos\');
    `);
    console.log("Categorias iniciais inseridas com sucesso!");

    await pool.query(`
      INSERT INTO produtos (nome, preco, estoque, categoria_id) VALUES
      (\'Notebook Gamer\', 5500.00, 8, (SELECT id FROM categorias WHERE nome = \'Informática\')),
      (\'Mouse Sem Fio\', 120.00, 30, (SELECT id FROM categorias WHERE nome = \'Periféricos\')),
      (\'Headset Bluetooth\', 280.50, 25, (SELECT id FROM categorias WHERE nome = \'Áudio\')),
      (\'Teclado Mecânico\', 450.00, 15, (SELECT id FROM categorias WHERE nome = \'Periféricos\'));
    `);
    console.log("Produtos iniciais inseridos com sucesso!");

    console.log("Banco de dados inicializado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
    process.exit(-1);
  }
};

createTables();
