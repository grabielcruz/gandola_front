export interface Transaction {
  Id: number;
  Type: string;
  Amount: number;
  Description: string;
  Balance: number;
  Actor: number;
  Executed: string;
  CreatedAt: string;
}