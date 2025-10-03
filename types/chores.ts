import { User } from "@/types/user";

export interface Chore {
  id: string;
  name: string;
  description: string;
  icon: string;
  valuation: string;
}

export interface ChoreCompletionResponse {
  id: string;
  chore: Chore;
  completed_by: User;
  completed_at: string;
  status: string;
  message: string;
}

export interface Chores {
  chores: Chore[];
}

export interface ChoreCompletionParams {
  status?: string;
  chore_id?: string;
  user_id?: string;
  offset?: number;
  limit?: number;
}

export interface ChoreConfirmationResponse {
  id: string;
  chore_completion: {
    id: string;
    chore: Chore;
    completed_by: User;
    completed_at: string;
    status: string;
    message: string;
  };
  status: "awaits" | "confirmed" | "rejected";
}

export enum StatusType {
  AWAITS = "awaits",
  CANCELED = "canceled",
  APPROVED = "approved",
}
