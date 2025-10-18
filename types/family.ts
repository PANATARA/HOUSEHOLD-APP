export interface FamilyCreate {
  name: string;
  icon: string;
}

export interface Family {
  id: string;
  name: string;
  icon: string;
  avatar_version: number;
}

export interface Member {
  id: string;
  username: string;
  name: string;
  surname: string;
}

export interface FamilyMembersResponse {
  family: Family;
  members: Member[];
}

export interface InviteUserParams {
  should_confirm_chore_completion: boolean;
}

export interface InviteQrCodeResponse {
  invite_token: string;
  life_time: string;
}

export interface FamilyUploadAvatar {
  file: {
    uri: string;
    name: string;
    type: string;
  };
}
