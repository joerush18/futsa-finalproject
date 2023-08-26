interface ITransaction {
  payedfor: {
    collection: string;
    id: string;
  };
  payedTo: {
    id: string;
    name: string;
  };
  payedBy: {
    id: string;
    name: string;
    number: string;
  };
  pidx: string;
  tnxId: string;
  amount: string;
  status: string;
  payedAt: Date;
  transactionId: string;
}

export type { ITransaction };
