import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'hooks';
import { getTests } from 'models/tests';
import {
  allTests,
  isLoading as load,
  pagination as pg,
} from 'models/tests/selectors';
import { filterTests } from 'utils/filter';
import { TestState } from 'models/tests/types';
import { sorted } from 'utils/sorted';

export const useTestsData = () => {
  const [filteredTests, setFilteredTests] = useState<TestState[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortDirection, setSortDirection] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchQuery);

  const tests = useAppSelector(allTests);
  const pagination = useAppSelector(pg);
  const isLoad = useAppSelector(load);
  const dispatch = useAppDispatch();

  const itemsPerPage = 5;

  const testsPerPage = filteredTests.slice(0, itemsPerPage);
  const sortedTests = sorted(testsPerPage, sortDirection);

  const handleToggleSortDirection = () => {
    setCurrentPage(0);

    if (!sortDirection) {
      setSortDirection('created_at_asc');
      searchParams.set('sort', 'created_at_asc');
      setSearchParams(searchParams);
    } else {
      const newDirection =
        sortDirection === 'created_at_desc'
          ? 'created_at_asc'
          : 'created_at_desc';
      setSortDirection(newDirection);
      searchParams.set('sort', newDirection);
      setSearchParams(searchParams);
    }
  };

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value),
    [setSearchValue]
  );

  const handleSearchBlur = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchQuery: string = e.target.value;

      setCurrentPage(0);

      if (searchQuery.length) {
        searchParams.set('search', searchQuery);
      } else {
        searchParams.delete('search');
      }
      setSearchParams(searchParams);
      setSearchTerm(searchQuery);
    },
    [searchParams, setSearchParams]
  );

  const handlePageChange = useCallback((selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  }, []);

  useEffect(() => {
    const filtered = filterTests(tests, searchTerm);
    setFilteredTests(filtered);
  }, [searchTerm, tests]);

  useEffect(() => {
    if (!sortDirection) {
      searchParams.delete('sort');
      setSearchParams(searchParams);
    }

    dispatch(
      getTests({
        per: itemsPerPage,
        page: currentPage + 1,
        search: searchTerm,
        sort: sortDirection,
      })
    );
  }, [
    searchTerm,
    currentPage,
    sortDirection,
    dispatch,
    searchParams,
    setSearchParams,
    itemsPerPage,
  ]);

  return {
    // filteredTests,
    currentPage,
    isLoad,
    pagination,
    sortDirection,
    searchValue,
    handleToggleSortDirection,
    handleSearchChange,
    handleSearchBlur,
    handlePageChange,
    sortedTests,
  };
};
