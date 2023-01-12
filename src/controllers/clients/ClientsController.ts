import { Request, Response, NextFunction } from 'express';
import { KnexClientsRepository } from '../../repositories/knex/ClientsRepository';
import { findForBalance } from '../../services/ClientBalanceService';
import { createClient } from '../../services/CreateClientServices';

export const FindForBalance = async (
  request: Request<{ id: number }, {}, {}>,
  response: Response,
  next: NextFunction
) => {
  const { id } = request.params;

  try {
    const balance = await findForBalance({
      id,
      repository: new KnexClientsRepository(),
    });

    return response.status(200).json(balance);
  } catch (error) {
    next(error);
  }
};

export const StoreClient = async (
  request: Request<{}, {}, { name: string; balance: number }>,
  response: Response,
  next: NextFunction
) => {
  const { name, balance } = request.body;

  try {
    const client = await createClient({
      client: { name, balance },
      repository: new KnexClientsRepository(),
    });

    return response
      .status(201)
      .json({ message: 'Your account has been created successfully', client });
  } catch (error) {
    next(error);
  }
};
