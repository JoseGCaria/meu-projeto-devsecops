const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Servidor da PoC rodando na porta ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`==================================================`);
});