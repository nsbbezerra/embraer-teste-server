import { NextFunction, Request, Response } from 'express';
import { KnexStatementsRepository } from '../../repositories/knex/StatementsRepository';
import { findStatements } from '../../services/StatementsServices';

export const FindClientStatements = async (
  request: Request<{ clientId: number }>,
  response: Response,
  next: NextFunction
) => {
  const { clientId } = request.params;

  try {
    const statements = await findStatements({
      clientId,
      repository: new KnexStatementsRepository(),
    });

    return response.status(200).json(statements);
  } catch (error) {
    next(error);
  }
};
