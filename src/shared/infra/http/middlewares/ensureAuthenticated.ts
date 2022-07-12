import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token is missing!', 401);
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub: user_id } = verify(token, '108a58283c968268aba24c951b7fec44');
    const userRepository = new UsersRepository();
    const user = await userRepository.findById(user_id as string);

    if (!user) {
      throw new AppError('User not found', 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
