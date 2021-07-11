export interface Transaction {
  Id: number;
  Type: "input" | "output";
  Amount: number;
  Description: string;
  Balance: number;
  Actor: {
    Id: number;
    Name: string;
  }
  Executed: string;
  CreatedAt: string;
}

export interface PendingTransaction {
  Id: number;
  Type: "input" | "output";
  Amount: number;
  Description: string;
  Actor: {
    Id: number;
    Name: string;
  }
  CreatedAt: string;
}

export interface Actor {
  Id: number;
  Name: string;
  Description: string;
  IsCompany: boolean;
  CreatedAt: string;
}