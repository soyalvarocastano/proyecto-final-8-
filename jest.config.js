// jest.config.js
export default {
    testEnvironment: 'node',
    transform: {},
    globals: {
      'jest': 'jest',  // Esto debería resolver el problema de jest no definido
    },
    testTimeout: 30000,        // Aumenta el tiempo máximo de espera a 30 segundos para cada prueba
  };
  