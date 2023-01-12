import { ClientsProps, ListClientsProps } from '../types';

export interface ClientsRepository {
  findClient(name: string): Promise<ListClientsProps | null>;
  create(client: ClientsProps): Promise<ClientsProps>;
  findForBalance(id: number): Promise<{ balance: number } | null>;
  updateBalance(id: number, total: number): Promise<{ balance: number }>;
}
