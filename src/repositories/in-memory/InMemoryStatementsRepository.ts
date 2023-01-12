import { StatementsProps } from '../../types';
import { StatementsRepository } from '../statementsRepository';

export class InMemoryStatementsRepository implements StatementsRepository {
  private items: StatementsProps[] = [];

  async create(clientId: number, total: number): Promise<StatementsProps> {
    const newStatement: StatementsProps = {
      client_id: clientId,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10),
      total,
    };

    this.items.push(newStatement);

    return newStatement;
  }

  async find(clientId: number): Promise<StatementsProps[]> {
    const statements =
      this.items.filter((obj) => obj.client_id === clientId) || [];

    return statements;
  }
}
