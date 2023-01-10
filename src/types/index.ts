interface ClientsProps {
  id: number;
  name: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

interface BanknotesProps {
  id: number;
  banknoteValue: number;
  amount: number;
}

interface StatementsProps {
  id: number;
  client_id: string;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export type { ClientsProps, BanknotesProps, StatementsProps };
