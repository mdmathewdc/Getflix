import React, { FunctionComponent, useState, useEffect } from 'react';
import { LoadingIndicator } from 'components/ui';
import styled from 'styled-components';
import { Header, Body } from './components';

const EmptySearch = styled.div`
  display: flex;
  align-items: center;
  color: white;
  padding: 40px 10px 40px 20px;
  margin: 0 auto;
  background: #141414;
  border-radius: 10px;
  font-weight: 100;
  max-width: 80%;

  img {
    height: 30px;
    width: 30px;
    margin: 4px 12px 0 0;
  }
`;

const Main: FunctionComponent = () => {
  const [page, setPage] = useState(1); // Current page number - Starts from 1
  const [movieList, setMovieList] = useState<any>([]);
  const [currentSearch, setCurrentSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [listCount, setListCount] = useState<number | undefined>(undefined); // Store the total number of search results for a particular query

  const setSearchQuery = (searchQuery: string) => {
    setCurrentSearch(searchQuery);
  };

  const fetchMovieDetails = async () => {
    setLoading(true);
    const response = await fetch(`https://www.omdbapi.com/?s=${currentSearch}&apikey=8652abfa&page=${page}`);
    const movies = await response.json();

    if (movies.Response === 'False') {
      setMovieList([]);
      setLoading(false);
      return;
    }
    setListCount(Number(movies.totalResults));
    setMovieList([...movieList, ...movies.Search]);
    setLoading(false);
  };

  useEffect(() => {
    setListCount(undefined);
    setMovieList([]);
    setPage(1);
    fetchMovieDetails();
  }, [currentSearch]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      fetchMovieDetails();
    }

    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

      if (bottom) {
        if (listCount && listCount / 10 <= page) return;
        setPage((pageNumber) => pageNumber + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mounted = false;
    };
  }, [page]);

  const renderEmptySearch = () => {
    if (currentSearch === '') {
      return (
        <EmptySearch>
          <img src="https://www.seekpng.com/png/full/65-659641_white-magnifying-glass-png-png-library-download-magnifying.png" alt="Search icon" />
          Type something in the search box...
        </EmptySearch>
      );
    }
    if (currentSearch !== '' && movieList.length === 0) {
      return (
        <EmptySearch>
          {`No results found for "${currentSearch}"`}
        </EmptySearch>
      );
    }
    return null;
  };

  return (
    <>
      <Header setSearchQuery={setSearchQuery} />
      {movieList && <Body movies={movieList} />}
      {(loading && currentSearch !== '') ? <LoadingIndicator /> : renderEmptySearch()}
    </>
  );
};

export default Main;
