import mongoose from 'mongoose';
import Pets from '../src/dao/Pets.dao.js';
import { expect } from 'chai';

let petsDao;

beforeAll(async () => {
  await mongoose.connect(
    'mongodb+srv://danielvillajuan:qpCcWENKy5dp6gRi@coderback.dkldvkl.mongodb.net/?retryWrites=true&w=majority&appName=Coderback',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('✅ Base de datos conectada');
  petsDao = new Pets();
}, 20000); // ⏱ Timeout extendido a 20 segundos

afterAll(async () => {
  await mongoose.connection.close();
  console.log('❌ Conexión cerrada');
}, 10000);

// -------------------- TEST SUITE --------------------

describe('🧪 Test del Pets DAO', () => {
  it('Debe retornar un array de mascotas', async () => {
    const result = await petsDao.get();
    expect(Array.isArray(result)).to.be.true;
  });

  it('Debe retornar una mascota por nombre', async () => {
    const name = 'firulai'; // Ajusta al dato que tengas en tu DB
    const result = await petsDao.getBy({ name });
    expect(result).to.have.property('name', 'firulai');
  });

  it('Debe guardar una nueva mascota', async () => {
    const newPet = {
      name: 'rocky_test',
      specie: 'perro',
      birthDate: new Date(),
    };

    const result = await petsDao.save(newPet);
    expect(result).to.have.property('_id');
    expect(result.name).to.equal('rocky_test');
  });

  it('Debe actualizar una mascota existente', async () => {
    const pet = await petsDao.getBy({ name: 'rocky_test' });
    const updated = await petsDao.update(pet._id, { name: 'rocky_modificado' });
    expect(updated).to.not.be.null;
  });

  it('Debe eliminar una mascota', async () => {
    const pet = await petsDao.getBy({ name: 'rocky_modificado' });
    const deleted = await petsDao.delete(pet._id);
    expect(deleted).to.not.be.null;
    expect(deleted.name).to.equal('rocky_modificado');
  });
});
