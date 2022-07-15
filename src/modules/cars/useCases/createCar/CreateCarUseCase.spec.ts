import { v4 as uuidv4 } from 'uuid';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

describe('CreateCarUseCase', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryinMemory: CarsRepositoryInMemory;

  beforeEach(() => {
    carsRepositoryinMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryinMemory);
  });

  it('should be able create a new car', async () => {
    const car = {
      name: 'Test car',
      description: 'Description of test car',
      daily_rate: 20,
      license_plate: 'test123',
      fine_amount: 50,
      brand: 'Ford',
    };

    await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
    });

    const carCreated = await carsRepositoryinMemory.findByName(car.name);

    expect(carCreated).toHaveProperty('id');
  });

  it('should not be able create an car with same license plate', () => {
    expect(async () => {
      const car = {
        name: 'Test car same license plate',
        description: 'Description of test car with same license plate',
        daily_rate: 20,
        license_plate: 'test123',
        fine_amount: 50,
        brand: 'Ford',
      };

      await createCarUseCase.execute({
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
      });

      await createCarUseCase.execute({
        name: car.name,
        description: car.description,
        daily_rate: car.daily_rate,
        license_plate: car.license_plate,
        fine_amount: car.fine_amount,
        brand: car.brand,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able create an new car with available status is true', async () => {
    const car = {
      name: 'Carro test with true available',
      description: 'Description of car with true available',
      daily_rate: 20,
      license_plate: 'test available true',
      fine_amount: 50,
      brand: 'Ford',
    };

    await createCarUseCase.execute({
      name: car.name,
      description: car.description,
      daily_rate: car.daily_rate,
      license_plate: car.license_plate,
      fine_amount: car.fine_amount,
      brand: car.brand,
    });

    const carCreated = await carsRepositoryinMemory.findByName(car.name);

    expect(carCreated.available).toEqual(true);
  });
});
