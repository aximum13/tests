import { TestState } from 'models/tests/types';

export const newTestApi = async (title: string) => {
  const response = await fetch(
    'https://interns-test-fe.snp.agency/api/v1/tests',
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify({
        title,
      }),
    }
  );
  return response;
};

export const newQuestApi = async (
  id: number,
  title: string,
  question_type: string,
  answer: number
) => {
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/tests/${id}/questions`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify({
        title,
        question_type,
        answer,
      }),
    }
  );
  return response;
};

export const newAnswerApi = async (
  id: number,
  text: string,
  is_right: boolean
) => {
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/questions/${id}/answers`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify({
        text,
        is_right,
      }),
    }
  );
  return response;
};

export const getTestsApi = async () => {
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/tests`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
    }
  );
  return response;
};

export const editTestApi = async (
  id: number,
  updatedData: Partial<TestState>
) => {
  const response = await fetch(`http://localhost:3001/tests/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
    },
    body: JSON.stringify(updatedData),
  });

  return response;
};
