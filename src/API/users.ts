import { UserState } from 'models/users/types';
import { api, scopeKey } from './api';

export const signUpApi = async ({
  username,
  password,
  password_confirmation,
  is_admin,
}: UserState) => {
  const response = await fetch(`${api}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify({
      username,
      password,
      password_confirmation,
      is_admin,
    }),
  });
  return response;
};

export const signInApi = async (username: string, password: string) => {
  const response = await fetch(`${api}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return response;
};

export const getUserApi = async () => {
  const response = await fetch(`${{ api }}/users/current`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });

  return response;
};

export const logOutApi = async () => {
  const response = await fetch(`${api}/logout`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });
  return response;
};
