import { InMemoryClientsRepository } from '../repositories/in-memory/InMemoryClientsRepository';
import { createClient } from './CreateClientServices';

describe('Clients Tests', () => {
  it('should be able to create a new client', async () => {
    const client = createClient({
      client: { name: 'Natanael', balance: 4000 },
      repository: new InMemoryClientsRepository(),
    });

    expect(client).resolves.toHaveProperty('id');
  });

  it('should be not able to create a new client', async () => {
    const client = createClient({
      client: { name: 'Natanael', balance: 4000 },
      repository: new InMemoryClientsRepository(),
    });

    expect(client).rejects.toThrow();
  });
});
