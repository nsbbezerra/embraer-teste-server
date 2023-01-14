import { clientMock } from '../../mocks/clients';
import { ClientsProps, ListClientsProps } from '../../types';
import { ClientsRepository } from '../clientsRepository';

export class InMemoryClientsRepository implements ClientsRepository {
  private items: ListClientsProps[] = clientMock;

  async create(client: ClientsProps): Promise<ListClientsProps> {
    const newClient: ListClientsProps = {
      balance: client.balance,
      name: client.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: Math.floor(Math.random() * 10),
    };
    this.items.push(newClient);

    return newClient;
  }

  async findForBalance(id: number): Promise<{ balance: number } | null> {
    const clientBalance = this.items.find((obj) => obj.id === Number(id));

    return !clientBalance ? null : { balance: clientBalance.balance };
  }

  async updateBalance(id: number, total: number): Promise<{ balance: number }> {
    const client = this.items.find((obj) => obj.id === id);
    if (client) {
      client.balance = client?.balance - total;
    }
    return { balance: client?.balance || 0 };
  }

  async findClient(name: string): Promise<ListClientsProps | null> {
    const client = this.items.find((obj) => obj.name === name) || null;

    return client;
  }
}
