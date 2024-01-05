import { QuestState, TestState } from 'models/tests/types';

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
      credentials: 'include',
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
  testId: number,
  questionId: number,
  text: string,
  is_right: boolean
) => {
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/tests/${testId}/questions/${questionId}/answers`,
    {
      method: 'POST',
      credentials: 'include',
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

export const getTestApi = async (id: number) => {
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/tests/${id}`,
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
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/tests/${id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify(updatedData),
    }
  );

  return response;
};

export const editQuestApi = async (
  id: number,
  updatedData: Partial<QuestState>
) => {
  const response = await fetch(
    `https://interns-test-fe.snp.agency/api/v1/questions/${id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Scope-Key': 's-U6!x@$P>dAE.`r5W7q_#',
      },
      body: JSON.stringify(updatedData),
    }
  );

  return response;
};
