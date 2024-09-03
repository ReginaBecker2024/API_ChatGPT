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
//mongoose.connect(process.env.MONGODB_URI, {
  mongoose.connect('mongodb+srv://dba:Thina2024@bookapi.5bj96.mongodb.net/?retryWrites=true&w=majority&appName=BookApi', {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão ao MongoDB:', err));

// Configurar rotas
app.use('/api', bookRoutes);

// Definir porta e iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});