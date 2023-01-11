import { database } from '../../database/pg';
import { StatementsProps } from '../../types';
import { StatementsRepository } from '../statementsRepository';

export class KnexStatementsRepository implements StatementsRepository {
  async create(clientId: number, total: number): Promise<StatementsProps> {
    const [newStatement] = await database<StatementsProps>('statements')
      .insert({
        client_id: clientId,
        total,
      })
      .returning('*');

    return newStatement;
  }

  async find(clientId: number): Promise<StatementsProps[]> {
    const statements = await database<StatementsProps>('statements')
      .where({ client_id: clientId })
      .orderBy('createdAt', 'desc');

    return statements;
  }
}
