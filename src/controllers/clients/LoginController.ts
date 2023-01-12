import { NextFunction, Request, Response } from 'express';
import { KnexClientsRepository } from '../../repositories/knex/ClientsRepository';
import { login } from '../../services/LoginService';

export const ProcessLogin = async (
  request: Request<{}, {}, { name: string }>,
  response: Response,
  next: NextFunction
) => {
  const { name } = request.body;

  try {
    const client = await login({
      name,
      repository: new KnexClientsRepository(),
    });

    return response.status(200).json(client);
  } catch (error) {
    next(error);
  }
};
