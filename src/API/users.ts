import { UserState } from 'models/users/types';

export const signUpApi = async ({
  username,
  password,
  password_confirmation,
  is_admin,
}: UserState) => {
  const response = await fetch(
    'https://interns-test-fe.snp.agency/api/v1/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation,
        is_admin,
      }),
    }
  );
  return response;
};

export const signInApi = async (username: string, password: string) => {
  const response = await fetch(
    'https://interns-test-fe.snp.agency/api/v1/signin',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  return response;
};
