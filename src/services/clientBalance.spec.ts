import { InMemoryClientsRepository } from '../repositories/in-memory/InMemoryClientsRepository';
import {
  findForBalance,
  updateBalance,
  validateBalanceForWithdraw,
} from './ClientBalanceService';

describe('Client Balance Tests', () => {
  it('should be able to get a client balance', async () => {
    const balance = findForBalance({
      id: 1,
      repository: new InMemoryClientsRepository(),
    });

    expect(balance).resolves.toHaveProperty('balance');
  });

  it('should be not able to get a invalid client balance', async () => {
    const balance = findForBalance({
      id: 100,
      repository: new InMemoryClientsRepository(),
    });

    expect(balance).resolves.toBeNull();
  });

  it('should be able to update client balance value', async () => {
    expect(
      updateBalance({
        id: 1,
        total: 4000,
        repository: new InMemoryClientsRepository(),
      })
    ).resolves.toHaveProperty('balance');
  });

  it('should be have balance of withdraw', async () => {
    const response = validateBalanceForWithdraw({
      id: 1,
      total: 100,
      repository: new InMemoryClientsRepository(),
    });

    expect(response).resolves.toHaveProperty('balance');
  });

  it('should be not have balance of withdraw', async () => {
    const response = validateBalanceForWithdraw({
      id: 1,
      total: 100000,
      repository: new InMemoryClientsRepository(),
    });

    expect(response).rejects.toThrow();
  });
});
