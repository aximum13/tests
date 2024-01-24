import { QuestionState, TestState } from 'models/tests/types';
import { api, scopeKey } from './api';

export const newTestApi = async (title: string) => {
  const response = await fetch(`${api}/tests`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify({
      title,
    }),
  });
  return response;
};

export const newQuestApi = async (
  id: number,
  title: string,
  question_type: string,
  answer: number
) => {
  const response = await fetch(`${api}/tests/${id}/questions`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify({
      title,
      question_type,
      answer,
    }),
  });
  return response;
};

export const newAnswerApi = async (
  questionId: number,
  text: string,
  is_right: boolean
) => {
  const response = await fetch(`${api}/questions/${questionId}/answers`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify({
      text,
      is_right,
    }),
  });
  return response;
};

export const getTestsApi = async (
  page: number,
  per: number,
  search: string,
  sort: string
) => {
  const queryParams = new URLSearchParams({});

  queryParams.append('page', page.toString());
  queryParams.append('per', per.toString());

  if (search) {
    queryParams.append('search', search);
  } else {
    if (sort) {
      queryParams.append('sort', sort);
    }
  }

  const response = await fetch(`${api}/tests?${queryParams}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });

  return response;
};

export const getTestApi = async (id: number) => {
  const response = await fetch(`${api}/tests/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });
  return response;
};

export const editTestApi = async (id: number, title: string) => {
  const response = await fetch(`${api}/tests/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify({ title: title }),
  });

  return response;
};

export const editQuestApi = async (
  id: number,
  updatedData: Partial<QuestionState>
) => {
  const response = await fetch(`${api}/questions/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify(updatedData),
  });

  return response;
};

export const editAnswerApi = async (
  id: number,
  updatedData: Partial<QuestionState>
) => {
  const response = await fetch(`${api}/answers/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify(updatedData),
  });

  return response;
};

export const reorderAnswerApi = async (id: number, position: number) => {
  const response = await fetch(`${api}/answers/${id}/insert_at/${position}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
    body: JSON.stringify(position),
  });

  return response;
};

export const deleteTestApi = async (id: number) => {
  const response = await fetch(`${api}/tests/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });

  return response;
};

export const deleteQuestApi = async (id: number) => {
  const response = await fetch(`${api}/questions/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });

  return response;
};

export const deleteAnswerApi = async (id: number) => {
  const response = await fetch(`${api}/answers/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Scope-Key': scopeKey,
    },
  });

  return response;
};
