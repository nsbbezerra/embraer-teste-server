import { Request, Response, NextFunction } from 'express';
import { countBankNotesInMemory } from '../../repositories/in-memory/InMemoryBanknotesRepository';

async function WithDraw(
  request: Request<{}, {}, { amount: number }>,
  response: Response,
  next: NextFunction
) {
  const { amount } = request.body;

  try {
    const banknotes = await countBankNotesInMemory({ value: amount });

    if (!banknotes) {
      throw new Error(
        'Unable to process withdrawal, no notes in required remaining amount'
      );
    }

    return response.status(200).json(banknotes);
  } catch (error) {
    next(error);
  }
}

export { WithDraw };
