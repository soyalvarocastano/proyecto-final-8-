import mongoose from 'mongoose';
import Users from '../src/dao/Users.dao.js';

let userDao;

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://danielvillajuan:qpCcWENKy5dp6gRi@coderback.dkldvkl.mongodb.net/?retryWrites=true&w=majority&appName=Coderback');
  console.log('✅ Base de datos conectada');
  userDao = new Users();
});

afterAll(async () => {
  await mongoose.connection.close();
  console.log('❌ Conexión cerrada');
});

describe('🧪 Test del User DAO', () => {
  test('Debe retornar un array de usuarios', async () => {
    const result = await userDao.get();
    expect(Array.isArray(result)).toBe(true);
  });

  test('Debe retornar un usuario por email', async () => {
    const email = 'Brenda30@hotmail.com';
    const result = await userDao.getBy({ email });

    expect(result).toBeDefined();
    expect(result.first_name).toBe('Lavonne');
    expect(result.last_name).toBe('Armstrong');
  });

  test('Debe guardar un nuevo usuario', async () => {
    const mockUser = {
      first_name: 'Test',
      last_name: 'User',
      email: 'testuser@example.com',
      password: 'hashedPassword123'
    };
    const result = await userDao.save(mockUser);

    expect(result).toBeDefined();
    expect(result.email).toBe(mockUser.email);
  });

  test('Debe actualizar un usuario existente', async () => {
    const user = await userDao.getBy({ email: 'testuser@example.com' });
    const updated = await userDao.update(user._id, { first_name: 'UpdatedName' });

    const fetched = await userDao.getBy({ email: 'testuser@example.com' });
    expect(fetched.first_name).toBe('UpdatedName');
  });

  test('Debe eliminar un usuario', async () => {
    const user = await userDao.getBy({ email: 'testuser@example.com' });
    await userDao.delete(user._id);

    const deleted = await userDao.getBy({ email: 'testuser@example.com' });
    expect(deleted).toBeNull();
  });
});
