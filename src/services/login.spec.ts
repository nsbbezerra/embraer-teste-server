import { InMemoryClientsRepository } from '../repositories/in-memory/InMemoryClientsRepository';
import { login } from './LoginService';

describe('Login Tests', () => {
  it('should be able to login', async () => {
    const client = login({
      name: 'John Doe',
      repository: new InMemoryClientsRepository(),
    });

    expect(client).resolves.toHaveProperty('name');
  });

  it('should be not able to login', async () => {
    const client = login({
      name: 'John Doe Doe',
      repository: new InMemoryClientsRepository(),
    });

    expect(client).rejects.toThrow();
  });
});
