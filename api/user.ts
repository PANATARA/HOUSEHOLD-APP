import { api } from "@/api/client";
import {
  OtherUserProfileResponse,
  User,
  UserProfile,
  UserSettings,
  UserUpdate,
  UserUploadAvatar,
} from "@/types/user";

export async function getMeProfile(): Promise<UserProfile> {
  const response = await api.get<UserProfile>("/users/me/profile");
  return response.data;
}

export async function updateMeProfile(user_data: UserUpdate): Promise<User> {
  const response = await api.patch<User>("/users/me/profile", user_data);
  return response.data;
}

export async function getMeSettings(): Promise<UserSettings> {
  const response = await api.get<UserSettings>("/users/me/settings");
  return response.data;
}

export async function updateMeSettings(
  settings_data: Partial<UserSettings>,
): Promise<UserSettings> {
  const response = await api.patch<UserSettings>("/users/me/settings", settings_data);
  return response.data;
}

export async function getUserAvatar(
  user_id: string,
): Promise<{ avatar_url: string | null }> {
  const response = await api.get<{ avatar_url: string | null }>(
    `/users/${user_id}/avatar`,
  );
  return {
    avatar_url: response.data.avatar_url,
  };
}

export async function uploadAvatar(payload: UserUploadAvatar): Promise<User> {
  const formData = new FormData();
  formData.append("file", {
    uri: payload.file.uri,
    name: payload.file.name,
    type: payload.file.type,
  } as any);

  const response = await api.post<User>("/usersme/avatar/file", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function getUserProfile(
  user_id: string,
): Promise<OtherUserProfileResponse> {
  const response = await api.get<OtherUserProfileResponse>(`/users/${user_id}`);
  return response.data;
}

export async function checkToken(): Promise<number> {
  const response = await api.get<UserProfile>("/users/me/profile");
  return response.status;
}
