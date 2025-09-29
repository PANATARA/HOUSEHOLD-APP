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
