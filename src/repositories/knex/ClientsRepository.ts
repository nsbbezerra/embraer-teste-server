import { database } from '../../database/pg';
import { ClientsProps, ListClientsProps } from '../../types';
import { ClientsRepository } from '../clientsRepository';

export class KnexClientsRepository implements ClientsRepository {
  async create(client: ClientsProps): Promise<ClientsProps> {
    const [newClient] = await database<ListClientsProps>('clients')
      .insert({
        balance: client.balance,
        name: client.name,
      })
      .returning(['id', 'name', 'balance']);

    return newClient;
  }

  async findForBalance(id: number): Promise<{ balance: number } | null> {
    const clientBalance = await database<ListClientsProps>('clients')
      .where({ id })
      .first()
      .select('balance');

    return !clientBalance ? null : { balance: clientBalance.balance };
  }

  async updateBalance(id: number, total: number): Promise<void> {
    await database<ListClientsProps>('clients')
      .where({ id })
      .decrement('balance', total);
  }

  async findClient(name: string): Promise<ListClientsProps | null> {
    const client =
      (await database<ListClientsProps>('clients').where({ name }).first()) ||
      null;

    return client;
  }
}
