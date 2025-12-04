// tests/parcela.service.test.js

// Mock del modelo de Parcela
jest.mock('../src/models/parcela.models', () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const ParcelaModel = require('../src/models/parcela.models');
const ParcelaService = require('../src/services/parcela.service');

describe('ParcelaService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAll debe devolver lista de parcelas desde el modelo', async () => {
    const fakeParcelas = [
      {
        id: 1,
        nombre: 'Parcela Norte',
        cultivo_principal: 'Papa',
        area_ha: 2.5,
      },
    ];

    ParcelaModel.findAll.mockResolvedValue(fakeParcelas);

    const result = await ParcelaService.getAll();

    expect(ParcelaModel.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeParcelas);
  });

  test('getById debe devolver una parcela cuando existe', async () => {
    const fakeParcela = {
      id: 1,
      nombre: 'Parcela Norte',
      cultivo_principal: 'Papa',
      area_ha: 2.5,
    };

    ParcelaModel.findById.mockResolvedValue(fakeParcela);

    const result = await ParcelaService.getById(1);

    expect(ParcelaModel.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(fakeParcela);
  });

  test('create debe llamar al modelo con los datos correctos', async () => {
    const data = {
      nombre: 'Parcela Sur',
      ubicacion: 'Zona baja',
      cultivo_principal: 'Maíz',
      area_ha: 1.8,
      campesino_id: 2,
    };

    const fakeCreated = { id: 2, ...data };

    ParcelaModel.create.mockResolvedValue(fakeCreated);

    const result = await ParcelaService.create(data);

    expect(ParcelaModel.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(fakeCreated);
  });

  test('update debe llamar al modelo con id y datos correctos', async () => {
    const id = 1;
    const data = {
      nombre: 'Parcela Norte Actualizada',
      ubicacion: 'Ribera del río',
      cultivo_principal: 'Trigo',
      area_ha: 3.0,
      campesino_id: 2,
    };

    const fakeUpdated = { id, ...data };

    ParcelaModel.update.mockResolvedValue(fakeUpdated);

    const result = await ParcelaService.update(id, data);

    expect(ParcelaModel.update).toHaveBeenCalledWith(id, data);
    expect(result).toEqual(fakeUpdated);
  });

  test('remove debe llamar al modelo con el id correcto', async () => {
    const id = 1;

    ParcelaModel.remove.mockResolvedValue();

    await ParcelaService.remove(id);

    expect(ParcelaModel.remove).toHaveBeenCalledWith(id);
  });
});
