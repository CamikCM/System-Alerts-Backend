// tests/usuarioAdmin.controller.test.js

// Mock del servicio UsuarioAdmin
jest.mock('../src/services/usuarioAdmin.service', () => ({
  getAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const UsuarioAdminService = require('../src/services/usuarioAdmin.service');
const UsuarioAdminController = require('../src/controllers/usuarioAdmin.controller');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.send = jest.fn(() => res);
  return res;
};

describe('UsuarioAdminController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getUsuariosAdmin debe devolver lista de admins en JSON', async () => {
    const fakeAdmins = [
      {
        id: 1,
        nombre: 'Admin',
        email: 'admin@test.com',
        rol: 'ADMIN',
        activo: true,
      },
    ];

    UsuarioAdminService.getAll.mockResolvedValue(fakeAdmins);

    const req = {};
    const res = mockResponse();
    const next = jest.fn();

    await UsuarioAdminController.getUsuariosAdmin(req, res, next);

    expect(UsuarioAdminService.getAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(fakeAdmins);
    expect(next).not.toHaveBeenCalled();
  });

  test('createUsuarioAdmin debe devolver 201 y el nuevo admin', async () => {
    const body = {
      nombre: 'Nuevo Admin',
      email: 'nuevo@test.com',
      password: '123456',
      rol: 'ADMIN',
    };

    const fakeCreated = {
      id: 2,
      nombre: 'Nuevo Admin',
      email: 'nuevo@test.com',
      rol: 'ADMIN',
      activo: true,
    };

    UsuarioAdminService.create.mockResolvedValue(fakeCreated);

    const req = { body };
    const res = mockResponse();
    const next = jest.fn();

    await UsuarioAdminController.createUsuarioAdmin(req, res, next);

    expect(UsuarioAdminService.create).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeCreated);
    expect(next).not.toHaveBeenCalled();
  });

  test('updateUsuarioAdmin debe devolver 404 si el service no encuentra el usuario', async () => {
    UsuarioAdminService.update.mockResolvedValue(null);

    const req = {
      params: { id: 1 },
      body: {
        nombre: 'X',
        email: 'x@test.com',
        rol: 'ADMIN',
        activo: true,
      },
    };
    const res = mockResponse();
    const next = jest.fn();

    await UsuarioAdminController.updateUsuarioAdmin(req, res, next);

    expect(UsuarioAdminService.update).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Usuario no encontrado',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('deleteUsuarioAdmin debe devolver 204 si se elimina correctamente', async () => {
    UsuarioAdminService.remove.mockResolvedValue();

    const req = { params: { id: 1 } };
    const res = mockResponse();
    const next = jest.fn();

    await UsuarioAdminController.deleteUsuarioAdmin(req, res, next);

    expect(UsuarioAdminService.remove).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
