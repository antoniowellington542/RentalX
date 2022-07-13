/* eslint-disable max-classes-per-file */
import { v4 as uuidv4 } from 'uuid';

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByName(name: string): Promise<Car>;
}

class Car {
  id?: string;
  name: string;
  description: string;
  daily_rate: string;
  license_plate: string;
  fine_amount: number;
  brand: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
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
      name: 'Carro teste',
      description: 'Descrição do carro de teste',
      daily_rate: 20,
      license_plate: 'teste123',
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
});
