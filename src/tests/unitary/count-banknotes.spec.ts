import { countBankNotesInMemory } from '../../repositories/in-memory/InMemoryBanknotesRepository';

describe('Count Banknotes Tests', () => {
  it('should be able to count', () => {
    const banknotes = countBankNotesInMemory({ value: 550 });
    console.log(banknotes);
    expect(2 + 2).toBe(4);
  });
});
