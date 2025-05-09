// test/pets.routes.test.js
import request from 'supertest';
import app from '../src/app.js';
import mongoose from 'mongoose';
import Pet from '../src/dao/models/Pet.js'; // Asegúrate de importar tu modelo
import fs from 'fs';

beforeAll(async () => {
  await mongoose.disconnect(); // 🔥 Evita conflicto
  await mongoose.connect('mongodb://localhost:27017/adoptme_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Opcional: limpia base de datos
  await mongoose.disconnect();
});

afterAll(async () => {
    // Aquí asegúrate de que cierras correctamente la conexión a la base de datos
    await dbConnection.close(); // Reemplaza dbConnection con el objeto que maneja la conexión
  });
  
beforeEach(async () => {
    await Pet.deleteMany({});
});

describe('Pet Routes', () => {

    it('Debería responder con status 200 y un array de mascotas', async () => {
        const res = await request(app).get('/api/pets');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.payload)).toBe(true); // Comprobar si el resultado es un array
    });

    it('Debería crear una mascota correctamente', async () => {
        const newPet = {
            name: 'Bobby',
            specie: 'Perro',
            birthDate: '2021-05-05T00:00:00.000Z',
        };

        const res = await request(app).post('/api/pets').send(newPet);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.payload.name).toBe(newPet.name);
        expect(res.body.payload.specie).toBe(newPet.specie);
        expect(res.body.payload.birthDate).toBe(newPet.birthDate);
    });

    it('Debería devolver error por valores incompletos al crear una mascota', async () => {
        const newPet = {
            name: 'Bobby',
            specie: 'Perro', // Falta el birthDate
        };

        const res = await request(app).post('/api/pets').send(newPet);
        expect(res.statusCode).toBe(400);
        expect(res.body.status).toBe('error');
        expect(res.body.error).toBe('Incomplete values');
    });

    it('Debería actualizar una mascota correctamente', async () => {
        const newPet = {
            name: 'Bobby',
            specie: 'Perro',
            birthDate: '2021-05-05',
        };

        const createdPet = await request(app).post('/api/pets').send(newPet);
        const petId = createdPet.body.payload._id;

        const updatedPet = {
            name: 'Bobby Jr.',
            specie: 'Perro',
            birthDate: '2021-05-05',
        };

        const res = await request(app).put(`/api/pets/${petId}`).send(updatedPet);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.message).toBe('pet updated');
    });

    it('Debería eliminar una mascota correctamente', async () => {
        const newPet = {
            name: 'Bobby',
            specie: 'Perro',
            birthDate: '2021-05-05',
        };

        const createdPet = await request(app).post('/api/pets').send(newPet);
        const petId = createdPet.body.payload._id;

        const res = await request(app).delete(`/api/pets/${petId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe('success');
        expect(res.body.message).toBe('pet deleted');
    });
});
