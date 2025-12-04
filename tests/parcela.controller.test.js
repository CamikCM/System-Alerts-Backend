// tests/parcela.controller.test.js

// Mock del servicio de Parcela
jest.mock('../src/services/parcela.service', () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const ParcelaService = require('../src/services/parcela.service');
const ParcelaController = require('../src/controllers/parcela.controller');

// Helper para simular res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  res.send = jest.fn(() => res);
  return res;
};

describe('ParcelaController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getParcelas debe devolver lista de parcelas en JSON', async () => {
    const fakeParcelas = [
      { id: 1, nombre: 'Parcela Norte', cultivo_principal: 'Papa' },
    ];

    ParcelaService.getAll.mockResolvedValue(fakeParcelas);

    const req = {};
    const res = mockResponse();
    const next = jest.fn();

    await ParcelaController.getParcelas(req, res, next);

    expect(ParcelaService.getAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(fakeParcelas);
    expect(next).not.toHaveBeenCalled();
  });

  test('getParcelaById debe devolver 404 si no existe', async () => {
    ParcelaService.getById.mockResolvedValue(null);

    const req = { params: { id: 99 } };
    const res = mockResponse();
    const next = jest.fn();

    await ParcelaController.getParcelaById(req, res, next);

    expect(ParcelaService.getById).toHaveBeenCalledWith(99);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Parcela no encontrada',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('createParcela debe devolver 201 y la nueva parcela', async () => {
    const body = {
      nombre: 'Parcela Sur',
      ubicacion: 'Zona baja',
      cultivo_principal: 'Maíz',
      area_ha: 1.8,
      campesino_id: 2,
    };
    const fakeCreated = { id: 2, ...body };

    ParcelaService.create.mockResolvedValue(fakeCreated);

    const req = { body };
    const res = mockResponse();
    const next = jest.fn();

    await ParcelaController.createParcela(req, res, next);

    expect(ParcelaService.create).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(fakeCreated);
    expect(next).not.toHaveBeenCalled();
  });

  test('updateParcela debe devolver 404 si el service no encuentra el registro', async () => {
    ParcelaService.update.mockResolvedValue(null);

    const req = {
      params: { id: 1 },
      body: {
        nombre: 'X',
        ubicacion: 'Y',
        cultivo_principal: 'Z',
        area_ha: 1,
        campesino_id: 2,
      },
    };
    const res = mockResponse();
    const next = jest.fn();

    await ParcelaController.updateParcela(req, res, next);

    expect(ParcelaService.update).toHaveBeenCalledWith(1, req.body);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Parcela no encontrada',
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('deleteParcela debe devolver 204 si se elimina correctamente', async () => {
    ParcelaService.remove.mockResolvedValue();

    const req = { params: { id: 1 } };
    const res = mockResponse();
    const next = jest.fn();

    await ParcelaController.deleteParcela(req, res, next);

    expect(ParcelaService.remove).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
