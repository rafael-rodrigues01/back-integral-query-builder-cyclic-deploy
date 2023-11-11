const knex = require('../conexao');

const listarProdutos = async (req, res) => {
  const { usuario } = req;
  const { categoria } = req.query;

  try {
    let condicao = {
      usuario_id: usuario.id,
    };

    if (categoria) {
      condicao.categoria = categoria;
    }

    const produtos = await knex('produtos').where(condicao);

    return res.status(200).json(produtos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const obterProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    // const query = `select * from produtos where usuario_id = $1 and id = $2`;
    // const { rows, rowCount } = await conexao.query(query, [usuario.id, id]);

    const result = await knex('produtos').where({ usuario_id: usuario.id, id });

    if (result.length === 0) {
      return res.status(404).json('Produto não encontrado');
    }

    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const cadastrarProduto = async (req, res) => {
  const { usuario } = req;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  if (!nome) {
    return res.status(404).json('O campo nome é obrigatório');
  }

  if (!estoque) {
    return res.status(404).json('O campo estoque é obrigatório');
  }

  if (!preco) {
    return res.status(404).json('O campo preco é obrigatório');
  }

  if (!descricao) {
    return res.status(404).json('O campo descricao é obrigatório');
  }

  try {
    const produtosData = {
      usuario_id: usuario.id,
      ...req.body,
    };

    const produto = await knex('produtos').insert(produtosData);

    if (produto.rowCount === 0) {
      return res.status(400).json('O produto não foi cadastrado');
    }

    return res.status(200).json('O produto foi cadastrado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;
  const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

  if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
    return res
      .status(404)
      .json('Informe ao menos um campo para atualizaçao do produto');
  }

  try {
    const result = await knex('produtos').where({ usuario_id: usuario.id, id });

    if (result.length === 0) {
      return res.status(404).json('Produto não encontrado');
    }

    const body = {};

    if (nome) {
      body.nome = nome;
    }

    if (estoque) {
      body.estoque = estoque;
    }

    if (categoria) {
      body.categoria = categoria;
    }

    if (descricao) {
      body.descricao = descricao;
    }

    if (preco) {
      body.preco = preco;
    }

    if (imagem) {
      body.imagem = imagem;
    }

    const produtoAtualizado = await knex('produtos')
      .update(body)
      .where({ usuario_id: usuario.id, id });

    if (produtoAtualizado === 0) {
      return res.status(400).json('O produto não foi atualizado');
    }

    return res.status(200).json('produto foi atualizado com sucesso.');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const excluirProduto = async (req, res) => {
  const { usuario } = req;
  const { id } = req.params;

  try {
    const rowCount = await knex('produtos').where({
      usuario_id: usuario.id,
      id,
    });

    if (rowCount.length === 0) {
      return res.status(404).json('Produto não encontrado');
    }

    const produtoExcluido = await knex('produtos').del().where({ id });

    if (produtoExcluido === 0) {
      return res.status(400).json('O produto não foi excluido');
    }

    return res.status(200).json('Produto excluido com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarProdutos,
  obterProduto,
  cadastrarProduto,
  atualizarProduto,
  excluirProduto,
};
