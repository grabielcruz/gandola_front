export interface Transaction {
  Id: number;
  Type: "input" | "output";
  Amount: number;
  Description: string;
  Balance: number;
  Actor: number;
  Executed: string;
  CreatedAt: string;
}

export interface PendingTransaction {
  Id: number;
  Type: "input" | "output";
  Amount: number;
  Description: string;
  Actor: number;
  CreatedAt: string;
}