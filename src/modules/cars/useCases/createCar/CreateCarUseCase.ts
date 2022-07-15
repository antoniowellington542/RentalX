import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
  }: IRequest): Promise<void> {
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

export { CreateCarUseCase };
