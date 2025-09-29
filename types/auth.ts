export type VerifyCodeResponse = {
	access_token: string;
	refresh_token: string;
	token_type: string;
	is_new_user: boolean;
    is_family_member: boolean;
};