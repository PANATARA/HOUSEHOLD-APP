import { api } from "@/api/client";
import {
  ChoreCompletionParams,
  ChoreCompletionResponse,
  ChoreConfirmationResponse,
  Chores,
  StatusType,
} from "@/types/chores";

export async function getChores(limit?: number): Promise<Chores> {
  const response = await api.get<Chores>("/chores", {
    params: { limit },
  });
  return response.data;
}

export async function getChoresCompletion(
  params: ChoreCompletionParams,
): Promise<ChoreCompletionResponse[]> {
  const { status, chore_id, user_id, offset = 0, limit = 5 } = params;

  const queryParams: Record<string, string | number> = {};

  if (status && status.trim() !== "") queryParams.status = status;
  if (chore_id && chore_id.trim() !== "") queryParams.chore_id = chore_id;
  if (user_id && user_id.trim() !== "") queryParams.user_id = user_id;

  queryParams.offset = offset;
  queryParams.limit = limit;

  const response = await api.get<ChoreCompletionResponse[]>("/chores-completions", {
    params: queryParams,
  });

  return response.data;
}

export async function getChoresConfirmations(
  status: StatusType,
): Promise<ChoreConfirmationResponse[]> {
  const response = await api.get<ChoreConfirmationResponse[]>("/chores-confirmations", {
    params: { status },
  });
  return response.data;
}

export async function createChoreCompletion(
  chore_id: string,
  message: string,
): Promise<boolean> {
  const response = await api.post(`/chores-completions/${chore_id}`, { message });
  return response.status >= 200 && response.status < 300;
}
