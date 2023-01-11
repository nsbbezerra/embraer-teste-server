import { StatementsProps } from '../types';

export interface StatementsRepository {
  create(clientId: number, total: number): Promise<StatementsProps>;
  find(clientId: number): Promise<StatementsProps[]>;
}
