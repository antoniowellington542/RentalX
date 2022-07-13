/* eslint-disable max-classes-per-file */
import { v4 as uuidv4 } from 'uuid';

import { AppError } from '@shared/errors/AppError';

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

class Car {
  id?: string;
  name: string;
  description: string;
  daily_rate: string;
  license_plate: string;
  fine_amount: number;
  brand: string;
  available: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }

    this.available = true;
  }
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByName(name: string): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

const carsRepository: Car[] = [];
class CreateCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<void> {
    const carLicensePlateAlreadyExists =
      await this.carsRepository.findByLicensePlate(license_plate);

    if (carLicensePlateAlreadyExists) {
      throw new AppError('Car with license plate already exists');
    }

    this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });
  }
}

class CarsRepositoryInMemory implements ICarsRepository {
  private repository: Car[];

  constructor() {
    this.repository = carsRepository;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
    });
    await this.repository.push(car);
  }

  async findByName(name: string): Promise<Car> {
    return this.repository.find((car) => car.name === name);
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.repository.find((car) => car.license_plate === license_plate);
  }
}

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
