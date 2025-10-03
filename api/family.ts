import { api } from "@/api/client";
import {
  Family,
  FamilyCreate,
  FamilyMembersResponse,
  FamilyUploadAvatar,
  InviteQrCodeResponse,
  InviteUserParams,
} from "@/types/family";

export async function getMeFamily(): Promise<FamilyMembersResponse> {
  const response = await api.get<FamilyMembersResponse>("/families");
  return response.data;
}

export async function createMeFamily(
  payload: FamilyCreate,
): Promise<FamilyMembersResponse | null> {
  const response = await api.post<FamilyMembersResponse>("/families", payload);
  return response.data;
}

export async function logoutMeFromFamily(): Promise<boolean> {
  await api.patch("/families/logout");
  return true;
}

export async function kickUserFromFamily(user_id: string): Promise<boolean> {
  await api.delete(`/families/kick/${user_id}`);
  return true;
}

export async function changeFamilyAdmin(user_id: string): Promise<boolean> {
  await api.patch(`/families/change_admin/${user_id}`);
  return true;
}

export async function generateFamilyInviteToken(
  user_params: InviteUserParams,
): Promise<InviteQrCodeResponse> {
  const response = await api.post<InviteQrCodeResponse>("/families/invite", {
    should_confirm_chore_completion: user_params.should_confirm_chore_completion,
  });
  return response.data;
}

export async function joinMeToFamily(invite_token: string): Promise<boolean> {
  await api.post(`/families/join/${invite_token}`);
  return true;
}

export async function uploadFamilyAvatar(payload: FamilyUploadAvatar): Promise<Family> {
  const formData = new FormData();
  formData.append("file", {
    uri: payload.file.uri,
    name: payload.file.name,
    type: payload.file.type,
  } as any);

  const response = await api.post<Family>("/families/avatar/file/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
