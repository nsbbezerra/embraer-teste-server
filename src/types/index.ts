interface ClientsProps {
  name: string;
  balance: number;
}

interface ListClientsProps {
  id: number;
  name: string;
  balance: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface BanknotesProps {
  id: number;
  banknoteValue: number;
  amount: number;
}

interface StatementsProps {
  id: number;
  client_id: number;
  total: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type { ClientsProps, BanknotesProps, StatementsProps, ListClientsProps };
