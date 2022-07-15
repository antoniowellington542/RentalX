import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import AppDataSource from '@shared/infra/typeorm';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<void> {
    const car = this.repository.create({
      name: data.name,
      description: data.description,
      daily_rate: data.daily_rate,
      license_plate: data.license_plate,
      fine_amount: data.fine_amount,
      brand: data.brand,
    });

    await this.repository.save(car);
  }
  async findByName(name: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { name } });
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }
}
