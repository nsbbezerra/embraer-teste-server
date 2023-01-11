import { InMemoryStatementsRepository } from '../repositories/in-memory/InMemoryStatementsRepository';
import { createStatement } from './CreateStatementService';

describe('Create Statements Tests', () => {
  it('should de able to create a statement', async () => {
    const response = createStatement({
      clientId: 1,
      total: 2000,
      repository: new InMemoryStatementsRepository(),
    });

    expect(response).resolves.not.toThrow();
  });
});
