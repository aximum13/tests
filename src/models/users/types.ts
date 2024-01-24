export type UsersState = {
  user: UserState | null;
  error?: string | null;
  loading?: boolean;
};

export type UserState = {
  username: string;
  password: string;
  password_confirmation: string;
  is_admin: boolean;
};
