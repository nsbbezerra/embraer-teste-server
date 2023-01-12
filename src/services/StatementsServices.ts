import { StatementsRepository } from '../repositories/statementsRepository';
import { StatementsProps } from '../types';

interface CreateStatementRequest {
  clientId: number;
  total: number;
  repository: StatementsRepository;
}

interface FindStatementsRequest {
  clientId: number;
  repository: StatementsRepository;
}

type Response = StatementsProps[];

/**
 * @param clientId number
 * @param total number
 * @param repository type StatementsRepository
 */

export const createStatement = async ({
  clientId,
  total,
  repository,
}: CreateStatementRequest): Promise<void> => {
  await repository.create(clientId, total);
};

/**
 * @param clientId number
 * @param repository type StatementsRepository
 * @returns an array `[{ id: number, client_id: number, total: number, createdAt: Date, updatedAt: Date }]`
 */

export const findStatements = async ({
  clientId,
  repository,
}: FindStatementsRequest): Promise<Response> => {
  const statements = await repository.find(clientId);

  return statements;
};
