// test/users.routes.test.js
import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import { generarCadenaAlfanumerica } from '../src/utils/rambon.js';

describe('GET /api/users', () => {
  it('Debería responder con status 200 y un array de usuarios', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.payload)).toBe(true);
  });

  it('Debería responder con status 200 y el usuario correspondiente al ID', async () => {
    const userId = '681c23ab789d400c7c332242'; // Asegúrate de que este ID exista en la base de datos o crear uno previamente

    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.payload).toHaveProperty('_id', userId);
  });

  it('Debería responder con status 201 al crear un usuario', async () => {
    const newUser = {
      first_name: generarCadenaAlfanumerica(4),
      last_name: generarCadenaAlfanumerica(4),
      email: `${generarCadenaAlfanumerica(5)}@gmail.com`,
      password: '123456',
      role: 'user',
      pets: [],
    };

    const res = await request(app).post('/api/users').send(newUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User created');
  });

  it('Debería responder con status 200 al actualizar un usuario', async () => {
    const userId = '681c23ab789d400c7c332242'; // Asegúrate de que este ID exista
    const updatedUser = {
      first_name: 'Juan',
      last_name: 'Gomez',
      email: 'juan.gomez@example.com',
      password: '654321',
    };

    const res = await request(app).put(`/api/users/${userId}`).send(updatedUser);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User updated');
  });

  it('Debería responder con status 200 al eliminar un usuario', async () => {
    const userId = '681c23ab789d400c7c332242'; // Asegúrate de que este ID exista

    const res = await request(app).delete(`/api/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted');
  });
 
});
afterAll(async () => {
    await mongoose.connection.close();
  });
  