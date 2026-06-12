const express = require('express');
const app = express();

app.use(express.json());

// Rota de teste (Ponto de entrada)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API DevSecOps da UFLA rodando com sucesso!' });
});

// Exemplo de lógica de soma para testar qualidade/corretude
app.get('/soma', (req, res) => {
  const { a, b } = req.query;
  const resultado = Number(a) + Number(b);
  res.status(200).json({ resultado });
});

module.exports = app;