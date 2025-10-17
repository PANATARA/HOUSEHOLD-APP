export interface User {
  id: string;
  username: string;
  name: string;
  surname: string;
  avatar_version: number;
}

export interface UserProfile {
  user: User;
  is_family_member: boolean;
  is_profile_complete: boolean;
  wallet: {
    balance: string;
  };
}

export interface UserUpdate {
  username: string;
  name: string;
  surname: string;
}

export interface UserSettings {
  app_theme: string;
  language: string;
  date_of_birth: string;
}

export interface UserUploadAvatar {
  file: {
    uri: string;
    name: string;
    type: string;
  };
}

export interface OtherUserProfileResponse {
  user: User;
}
