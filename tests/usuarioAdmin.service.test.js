// tests/usuarioAdmin.service.test.js

// Mock del modelo UsuarioAdmin
jest.mock('../src/models/usuarioAdmin.models', () => ({
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const UsuarioAdminModel = require('../src/models/usuarioAdmin.models');
const UsuarioAdminService = require('../src/services/usuarioAdmin.service');

describe('UsuarioAdminService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll debe devolver lista de usuarios admin desde el modelo', async () => {
    const fakeAdmins = [
      {
        id: 1,
        nombre: 'Admin',
        email: 'admin@test.com',
        rol: 'ADMIN',
        activo: true,
      },
    ];

    UsuarioAdminModel.findAll.mockResolvedValue(fakeAdmins);

    const result = await UsuarioAdminService.getAll();

    expect(UsuarioAdminModel.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeAdmins);
  });

  test('create debe llamar al modelo con los datos correctos', async () => {
    const data = {
      nombre: 'Admin Nuevo',
      email: 'nuevo@test.com',
      password: 'secreto',
      rol: 'ADMIN',
    };

    const fakeCreated = {
      id: 2,
      nombre: 'Admin Nuevo',
      email: 'nuevo@test.com',
      rol: 'ADMIN',
      activo: true,
    };

    UsuarioAdminModel.create.mockResolvedValue(fakeCreated);

    const result = await UsuarioAdminService.create(data);

    expect(UsuarioAdminModel.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(fakeCreated);
  });

  test('update debe llamar al modelo con id y datos correctos', async () => {
    const id = 1;
    const data = {
      nombre: 'Admin Mod',
      email: 'admin@test.com',
      rol: 'SUPER_ADMIN',
      activo: true,
    };

    const fakeUpdated = { id, ...data };

    UsuarioAdminModel.update.mockResolvedValue(fakeUpdated);

    const result = await UsuarioAdminService.update(id, data);

    expect(UsuarioAdminModel.update).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(fakeUpdated);
  });

  test('remove debe llamar al modelo con el id correcto', async () => {
    const id = 1;

    UsuarioAdminModel.remove.mockResolvedValue();

    await UsuarioAdminService.remove(id);

    expect(UsuarioAdminModel.remove).toHaveBeenCalledWith(id);
  });
});
