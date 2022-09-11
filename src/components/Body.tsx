import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { MovieTile } from './ui';

interface MovieDetails {
  Poster: string;
  Title: string;
  Year: string;
  Type: string;
  imdbID: string;
}

type BodyProps = { movies: MovieDetails[] };

const StyledBody = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px 16px;
  max-width: 80%;
  margin: 0 auto 50px auto;
`;

const Body: FunctionComponent<BodyProps> = ({ movies }: BodyProps) => {
  const [currentSelection, setCurrentSelection] = useState<string>();

  const setActiveTile = (imdbId: string) => {
    setCurrentSelection(imdbId);
  };

  return (
    <StyledBody data-testid="body">
      {
        // eslint-disable-next-line react/no-array-index-key
        movies && movies.map((item: MovieDetails, index: number) => <MovieTile key={`${item.imdbID}${index}`} Poster={item.Poster} Title={item.Title} Year={item.Year} imdbID={item.imdbID} type={item.Type} setActiveTile={setActiveTile} isActive={currentSelection === item.imdbID} />)
      }
    </StyledBody>
  );
};

export default Body;
