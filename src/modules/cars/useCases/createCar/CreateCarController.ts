import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, daily_rate, fine_amount, license_plate, brand } =
      request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);

    try {
      await createCarUseCase.execute({
        name,
        description,
        daily_rate,
        fine_amount,
        license_plate,
        brand,
      });
      return response.status(201).send();
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}

export { CreateCarController };
