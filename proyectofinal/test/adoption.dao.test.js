import mongoose from 'mongoose';
import { expect } from 'chai';
import Adoption from '../src/dao/Adoption';

let adoptionDao;

beforeAll(async () => {
  await mongoose.connect(
    'mongodb+srv://danielvillajuan:qpCcWENKy5dp6gRi@coderback.dkldvkl.mongodb.net/?retryWrites=true&w=majority&appName=Coderback',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log('✅ Base de datos conectada');
  adoptionDao = new Adoption();
}, 20000); // Timeout extendido a 20s

afterAll(async () => {
  await mongoose.connection.close();
  console.log('❌ Conexión cerrada');
}, 10000);

describe('🧪 Test del Adoption DAO', () => {
  it('Debe retornar un array de adopciones', async () => {
    const result = await adoptionDao.get();
    expect(Array.isArray(result)).to.be.true;
  });
  it('Debe guardar una nueva adopción', async () => {
    const newAdoption = { petName: 'firulais', adopterName: 'Carlos Pérez' };
    const result = await adoptionDao.save(newAdoption);
  
    expect(result).to.have.property('_id');  // Aseguramos que el ID está presente.
    expect(result.petName).to.equal('firulais');  // Verificamos que el nombre de la mascota se guardó correctamente.
    expect(result.adopterName).to.equal('Carlos Pérez'); // Verificamos que el adoptante se guardó correctamente.
  });
  

  it('Debe retornar una adopción por nombre del adoptante', async () => {
    const result = await adoptionDao.getBy({ adopterName: 'Carlos Pérez' });
    expect(result).to.not.be.null;
    expect(result.petName).to.equal('firulais'); // Verificamos que el nombre de la mascota es el correcto.
  });

  it('Debe actualizar una adopción existente', async () => {
    const adoption = await adoptionDao.getBy({ adopterName: 'Carlos Pérez' });
    const updated = await adoptionDao.update(adoption._id, {
      adopterName: 'Ana Gómez',
    });
    expect(updated).to.not.be.null;
    expect(updated.adopterName).to.equal('Ana Gómez'); // Aseguramos que el adoptante fue actualizado correctamente.
  });

  it('Debe eliminar una adopción', async () => {
    const adoption = await adoptionDao.getBy({ adopterName: 'Ana Gómez' });
    const deleted = await adoptionDao.delete(adoption._id);
    expect(deleted).to.not.be.null;
    expect(deleted.adopterName).to.equal('Ana Gómez'); // Comprobamos que el adoptante fue el que se eliminó.
  });
});
