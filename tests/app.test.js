const request = require('supertest');
const app = require('../src/app');

describe('Testando os Endpoints da API', () => {
  it('Deve retornar 200 na rota raiz', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe('API DevSecOps rodando com sucesso!');
  });

  it('Deve somar dois números corretamente', async () => {
    const res = await request(app).get('/soma?a=5&b=10');
    expect(res.statusCode).toEqual(200);
    expect(res.body.resultado).toBe(15);
  });
});