// tests/campesino.service.test.js

// 1. Mock del modelo (no queremos pegar a la BD)
jest.mock('../src/models/campesino.models', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const CampesinoModel = require('../src/models/campesino.models');
const CampesinoService = require('../src/services/campesino.service');

describe('CampesinoService', () => {
  beforeEach(() => {
    // Limpia los mocks antes de cada test
    jest.clearAllMocks();
  });

  test('getAll debe devolver lista de campesinos desde el modelo', async () => {
    const fakeCampesinos = [
      { id: 1, nombre: 'Juan Pérez', telefono: '+59170000001' },
      { id: 2, nombre: 'María López', telefono: '+59170000002' },
    ];

    CampesinoModel.findAll.mockResolvedValue(fakeCampesinos);

    const result = await CampesinoService.getAll();

    expect(CampesinoModel.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeCampesinos);
  });

  test('getById debe devolver un campesino cuando existe', async () => {
    const fakeCampesino = {
      id: 1,
      nombre: 'Juan Pérez',
      telefono: '+59170000001',
    };

    CampesinoModel.findById.mockResolvedValue(fakeCampesino);

    const result = await CampesinoService.getById(1);

    expect(CampesinoModel.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(fakeCampesino);
  });

  test('create debe llamar al modelo con los datos correctos', async () => {
    const data = {
      nombre: 'Nuevo Campesino',
      telefono: '+59170000003',
      comunidad_id: 1,
    };

    const fakeCreated = { id: 3, ...data };

    CampesinoModel.create.mockResolvedValue(fakeCreated);

    const result = await CampesinoService.create(data);

    expect(CampesinoModel.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(fakeCreated);
  });

  test('update debe llamar al modelo con id y datos correctos', async () => {
    const id = 1;
    const data = {
      nombre: 'Campesino Actualizado',
      telefono: '+59170000001',
      comunidad_id: 2,
    };

    const fakeUpdated = { id, ...data };

    CampesinoModel.update.mockResolvedValue(fakeUpdated);

    const result = await CampesinoService.update(id, data);

    expect(CampesinoModel.update).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(fakeUpdated);
  });

  test('remove debe llamar al modelo con el id correcto', async () => {
    const id = 1;

    CampesinoModel.remove.mockResolvedValue();

    await CampesinoService.remove(id);

    expect(CampesinoModel.remove).toHaveBeenCalledWith(id);
  });
});
