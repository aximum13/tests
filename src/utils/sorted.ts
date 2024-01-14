import { TestState } from 'models/tests/types';

export const sorted = (tests: TestState[], sortDirection: string) => {
  return tests.slice().sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();

    if (sortDirection === 'created_at_asc') {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
};
