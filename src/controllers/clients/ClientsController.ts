import { Request, Response, NextFunction } from 'express';
import { proccessToStoreClient } from '../../repositories/knex/ClientsRepository';
import { storeClient } from '../../services/ClientServices';
import { ClientsProps } from '../../types';

async function FindForBalance(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const balance = 0;
    return response.status(200).json(balance);
  } catch (error) {
    next(error);
  }
}

async function StoreClient(
  request: Request<{}, {}, { name: string; balance: number }>,
  response: Response,
  next: NextFunction
) {
  const { name, balance } = request.body;
  try {
    const client = await storeClient({
      client: { name, balance },
      repository: proccessToStoreClient,
    });

    if (!client) {
      throw new Error('This client has already been registered');
    }

    return response
      .status(201)
      .json({ message: 'Registration successfully complete', client });
  } catch (error) {
    next(error);
  }
}

export { FindForBalance, StoreClient };
