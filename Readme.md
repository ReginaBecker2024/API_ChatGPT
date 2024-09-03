# MasterClass Papito
## https://www.youtube.com/watch?v=FI65wNBKQkE&t=2136s

# Chat GPT
## https://chatgpt.com/

Crie uma API RESTful em Node.js para um sistema de cadastro de livros. A API deve incluir as seguintes funcionalidades:

1. **Cadastro de livros**: Permita que os usuários cadastrem livros informando título, autor, editora, ano de publicação e número de páginas. Todos os campos são obrigatórios.
2. **Listagem de livros**: Implemente um endpoint para listar todos os livros cadastrados, retornando todas as informações dos livros.
3. **Consulta de livro por ID**: Crie um endpoint que permita consultar um livro específico usando seu ID.
4. **Remoção de livro**: Implemente um endpoint para deletar um livro do sistema utilizando seu ID.
5. **Banco de Dados**: Utilize o MongoDB como banco de dados.

# **Requisitos técnicos:**

- Utilize Express.js para gerenciar as rotas da API.
- Use Mongoose para a modelagem dos dados e integração com o MongoDB.
- Inclua tratamento de erros e validações adequadas para todos os endpoints.
- Adicione comentários no código para explicar as principais partes da implementação.

Vamos criar uma API RESTful em Node.js para um sistema de cadastro de livros. A API vai utilizar o Express.js para o gerenciamento das rotas e o Mongoose para a integração com o MongoDB. Aqui está o passo a passo para implementar os requisitos técnicos mencionados:

# Estrutura do Projeto
bash
Copiar código
book-api/
│
├── models/
│   └── book.js
├── routes/
│   └── books.js
├── app.js
├── package.json
└── .env
Passo 1: Inicialização do Projeto
Crie o diretório do projeto e inicialize um novo projeto Node.js:

bash
Copiar código
mkdir book-api
cd book-api
npm init -y
Instale as dependências necessárias:

bash
Copiar código
npm install express mongoose body-parser dotenv
Crie um arquivo .env para armazenar a URL de conexão do MongoDB:

bash
Copiar código
MONGODB_URI=mongodb://localhost:27017/bookdb
Passo 2: Configuração do Servidor e Conexão com o MongoDB
Crie o arquivo app.js para configurar o servidor Express e conectar-se ao MongoDB:

js
Copiar código
// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/books');

// Carregar variáveis de ambiente
dotenv.config();

// Configurações do servidor
const app = express();
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão ao MongoDB:', err));

// Configurar rotas
app.use('/books', bookRoutes);

// Definir porta e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
Passo 3: Modelagem dos Dados com Mongoose
Crie o arquivo models/book.js para definir o esquema do livro:

js
Copiar código
// models/book.js
const mongoose = require('mongoose');

// Definir o esquema do livro
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  year: { type: Number, required: true },
  pages: { type: Number, required: true },
});

// Criar o modelo do livro
const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
Passo 4: Implementação das Rotas
Crie o arquivo routes/books.js para definir os endpoints da API:

js
Copiar código
// routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Cadastro de livro
router.post('/', async (req, res) => {
  try {
    const { title, author, publisher, year, pages } = req.body;
    const newBook = new Book({ title, author, publisher, year, pages });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listagem de livros
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Consulta de livro por ID
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remoção de livro
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }
    res.status(200).json({ message: 'Livro removido com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
Considerações Finais
Validações: A validação dos dados é feita pelo Mongoose com o uso dos tipos e a propriedade required no esquema.
Tratamento de erros: As respostas incluem mensagens de erro apropriadas e códigos de status HTTP para indicar sucesso ou falha.
Segurança: Em um ambiente de produção, considere adicionar autenticação, autorização e proteção contra ataques comuns como injeção de SQL.
Agora, você pode rodar o servidor com node app.js e testar os endpoints usando ferramentas como Postman ou cURL.


# Faça uma massa de testes no formato JSON para eu testar no Postman
O ChatGPT disse:
ChatGPT
Claro! Vou fornecer alguns exemplos de dados em formato JSON que você pode usar para testar a API com o Postman. Estes exemplos cobrem os principais endpoints da API: cadastro, listagem, consulta e remoção de livros.

## 1. Cadastro de Livros
Endpoint: POST /books

Exemplo de Requisição:

json
Copiar código
{
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "publisher": "HarperCollins",
  "year": 1954,
  "pages": 1216
}
Exemplo de Resposta (Sucesso):

json
Copiar código
{
  "_id": "60c72b2f9b1e8b001f6475e0",
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "publisher": "HarperCollins",
  "year": 1954,
  "pages": 1216,
  "__v": 0
}

## 2. Listagem de Livros
Endpoint: GET /books

Exemplo de Resposta (Sucesso):

json
Copiar código
[
  {
    "_id": "60c72b2f9b1e8b001f6475e0",
    "title": "O Senhor dos Anéis",
    "author": "J.R.R. Tolkien",
    "publisher": "HarperCollins",
    "year": 1954,
    "pages": 1216,
    "__v": 0
  },
  {
    "_id": "60c72b2f9b1e8b001f6475e1",
    "title": "1984",
    "author": "George Orwell",
    "publisher": "Secker & Warburg",
    "year": 1949,
    "pages": 328,
    "__v": 0
  }
]

## 3. Consulta de Livro por ID
Endpoint: GET /books/:id

Exemplo de Requisição:

bash
Copiar código
GET /books/60c72b2f9b1e8b001f6475e0
Exemplo de Resposta (Sucesso):

json
Copiar código
{
  "_id": "60c72b2f9b1e8b001f6475e0",
  "title": "O Senhor dos Anéis",
  "author": "J.R.R. Tolkien",
  "publisher": "HarperCollins",
  "year": 1954,
  "pages": 1216,
  "__v": 0
}
Exemplo de Resposta (Livro não encontrado):

json
Copiar código
{
  "error": "Livro não encontrado"
}

## 4. Remoção de Livro
Endpoint: DELETE /books/:id

Exemplo de Requisição:

bash
Copiar código
DELETE /books/60c72b2f9b1e8b001f6475e0
Exemplo de Resposta (Sucesso):

json
Copiar código
{
  "message": "Livro removido com sucesso"
}
Exemplo de Resposta (Livro não encontrado):

json
Copiar código
{
  "error": "Livro não encontrado"
}

## Instruções para o Postman
Cadastro de Livro:

Selecione o método POST.
URL: http://localhost:3000/books (ajuste a porta conforme sua configuração).
No corpo da requisição, escolha o formato raw e selecione JSON. Cole o JSON de exemplo.
Listagem de Livros:

Selecione o método GET.
URL: http://localhost:3000/books.
Consulta de Livro por ID:

Selecione o método GET.
URL: http://localhost:3000/books/<ID> (substitua <ID> pelo ID real do livro).
Remoção de Livro:

Selecione o método DELETE.
URL: http://localhost:3000/books/<ID> (substitua <ID> pelo ID real do livro).
Esses exemplos devem cobrir as principais funcionalidades da sua API e ajudá-lo a testar se tudo está funcionando conforme o esperado.

# Mongo Configurações
## https://cloud.mongodb.com/v2/66d70d08cb629f68da4d13f0#/overview?automateSecurity=true&connectCluster=BookApi

User:dba
Senha:Thina2024