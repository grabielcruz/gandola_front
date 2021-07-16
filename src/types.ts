export interface Transaction {
  Id: number;
  Type: "input" | "output";
  Currency: "USD" | "VES";
  Amount: number;
  Description: string;
  USDBalance: number;
  VESBalance: number;
  Actor: {
    Id: number;
    Name: string;
  };
  Executed: string;
  CreatedAt: string;
}

export interface PendingTransaction {
  Id: number;
  Type: "input" | "output";
  Currency: "USD" | "VES";
  Amount: number;
  Description: string;
  Actor: {
    Id: number;
    Name: string;
  };
  CreatedAt: string;
}

export interface Actor {
  Id: number;
  Name: string;
  Description: string;
  IsCompany: boolean;
  CreatedAt: string;
}

export interface Note {
  Id: number;
  Description: string;
  Urgency: "low" | "medium" | "high" | "critical";
  Attended: boolean;
  CreatedAt: string;
  AttendedAt: string;
}
