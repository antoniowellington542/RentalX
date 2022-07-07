import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const token = await authenticateUseCase.execute({ email, password });
      return response.status(200).json(token);
    } catch (err) {
      return response.status(404).json({
        error: err.message,
      });
    }
  }
}

export { AuthenticateController };
