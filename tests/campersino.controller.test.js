// tests/campesino.controller.test.js

// 1. Mock del servicio
jest.mock('../src/services/campesino.service', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const CampesinoService = require('../src/services/campesino.service');
const CampesinoController = require('../src/controllers/campesino.controller');

// Helpers sencillos para simular req/res/next
const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.send = jest.fn(() => res);
  return res;
};

describe('CampesinoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getCampesinos debe devolver lista de campesinos en JSON', async () => {
    const fakeCampesinos = [
      { id: 1, nombre: 'Juan', telefono: '+59170000001' },
    ];

    CampesinoService.getAll.mockResolvedValue(fakeCampesinos);

    const req = {};
    const res = mockResponse();
    const next = jest.fn();

    await CampesinoController.getCampesinos(req, res, next);

    expect(CampesinoService.getAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(fakeCampesinos);
    expect(next).not.toHaveBeenCalled();
  });

  test('getCampesinoById debe devolver 404 si no existe', async () => {
    CampesinoService.getById.mockResolvedValue(null);

    const req = { params: { id: 99 } };
    const res = mockResponse();
    const next = jest.fn();

    await CampesinoController.getCampesinoById(req, res, next);

    expect(CampesinoService.getById).toHaveBeenCalledWith(99);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Campesino no encontrado',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('createCampesino debe devolver 201 y el nuevo campesino', async () => {
    const body = {
      nombre: 'Nuevo',
      telefono: '+59170000004',
      comunidad_id: 1,
    };
    const fakeCreated = { id: 5, ...body };

    CampesinoService.create.mockResolvedValue(fakeCreated);

    const req = { body };
    const res = mockResponse();
    const next = jest.fn();

    await CampesinoController.createCampesino(req, res, next);

    expect(CampesinoService.create).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeCreated);
    expect(next).not.toHaveBeenCalled();
  });

  test('updateCampesino debe devolver 404 si el service no encuentra el registro', async () => {
    CampesinoService.update.mockResolvedValue(null);

    const req = {
      params: { id: 1 },
      body: { nombre: 'X', telefono: 'Y', comunidad_id: null },
    };
    const res = mockResponse();
    const next = jest.fn();

    await CampesinoController.updateCampesino(req, res, next);

    expect(CampesinoService.update).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Campesino no encontrado',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('deleteCampesino debe devolver 204 si se elimina correctamente', async () => {
    CampesinoService.remove.mockResolvedValue();

    const req = { params: { id: 1 } };
    const res = mockResponse();
    const next = jest.fn();

    await CampesinoController.deleteCampesino(req, res, next);

    expect(CampesinoService.remove).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
