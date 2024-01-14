import { TestState } from 'models/tests/types';

export const filterTests = (tests: TestState[], searchTerm: string) => {
  return tests.filter((test) =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
