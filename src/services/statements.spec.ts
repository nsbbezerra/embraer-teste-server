import { InMemoryStatementsRepository } from '../repositories/in-memory/InMemoryStatementsRepository';
import { createStatement, findStatements } from './StatementsServices';

describe('Create Statements Tests', () => {
  it('should de able to create a statement', async () => {
    const response = createStatement({
      clientId: 1,
      total: 2000,
      repository: new InMemoryStatementsRepository(),
    });

    expect(response).resolves.not.toThrow();
  });

  it('should be able to get the client statements', async () => {
    const statements = findStatements({
      clientId: 1,
      repository: new InMemoryStatementsRepository(),
    });

    expect(statements).resolves.toHaveLength(0);
  });
});
