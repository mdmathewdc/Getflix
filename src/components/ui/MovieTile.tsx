import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import capitalizeFirstLetter from 'components/helpers/strings';
import device from '../constants/breakpoints';

interface MovieTileProps {
  Poster: string;
  Title: string;
  Year: string;
  type: string;
  imdbID: string;
  setActiveTile: any;
  isActive: boolean;
}

interface movieInfoProp {
  plot: string;
  cast: string;
}

const StyledMovieTile = styled.div`
  grid-column: span 12 / auto;
  display: flex;
  background: white;
  border-radius: 10px;
  height: 200px;
  width: 100%;
  color: white;
  background: #141414;

  .media-type {
    margin-top: 8px;
    padding: 4px;
    border: 0.5px solid white;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 100;
    width: fit-content;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(16px);
    opacity: 0;
    visibility: hidden;
    transition: .3s ease-in-out;
    transform: translate3d(0, 0, -100%);
    border-radius: 0 10px 10px 0;
    padding: 24px 24px 20px 20px;
  }

  .overlay.is-open {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  .close-sign {
    margin: 0;
    padding: 0;
    border: 0;
    background: none;
    position: absolute;
    top: 16px;
    right: 10px;
    width: 12px;
    height: 12px;
    cursor: pointer;
  }
  .close-sign:before, .close-sign:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #fff;
    border-radius: 4px;
  }
  .close-sign:before {
    transform: rotate(45deg);
  }
  .close-sign:after {
    transform: rotate(-45deg);
  }

  img {
    width: 140px;
    height: 200px;
    border-radius: 10px 2px 2px 10px;
    position: relative;
    z-index: 5;
  }

  .movie-info {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 24px 8px 8px 18px;
    position: relative;
    overflow-x: auto;
  }

  .plot {
    font-size: 14px;
    font-weight: 100;
  }

  .cast {
    font-size: 12px;
    font-weight: 100;
    margin-top: 12px;
    color: #b1b0b0;

  }

  .title {
    font-weight: 600;
    color: white;
    text-decoration: none;
    transition: transform .2s;
    cursor: pointer;
  }

  .title:hover {
    transform: scale(1.01);
  }

  .year {
    font-weight: 100;
    margin-top: 10px;
    color: #d8d8d8;
    font-size: 14px;
  }

  @media ${device.TABLET} {
    grid-column: span 6 / auto;
  }
`;

const MovieTile: FunctionComponent<MovieTileProps> = ({
  Poster, Title, Year, type, imdbID, setActiveTile, isActive,
}: MovieTileProps) => {
  const [moviePlot, setMoviePlot] = useState<movieInfoProp>();
  const [isLoading, setIsLoading] = useState(true);

  const handleTitleClick = async () => {
    setIsLoading(true);
    setActiveTile(imdbID);
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=8652abfa`);
    const movieDetails = await response.json();
    setMoviePlot({ plot: movieDetails.Plot, cast: movieDetails.Actors });
    setIsLoading(false);
  };

  const closeOverlay = () => {
    setActiveTile('');
  };

  return (
    <StyledMovieTile data-testid="movie-tile">
      <img src={Poster === 'N/A' ? '../../images/404.png' : Poster} alt={`Poster of ${Title}`} />
      <div className="movie-info">
        <span className="title" onClick={handleTitleClick} onKeyDown={handleTitleClick} role="button" tabIndex={0} aria-label="Movie title">{Title}</span>
        <p className="year">{Year}</p>
        <span className="media-type">{capitalizeFirstLetter(type)}</span>
        <div className={`overlay ${isActive ? 'is-open' : ''} `}>
          {
            isLoading
              ? (<p>Loading info...</p>)
              : (
                <>
                  <p className="plot">{moviePlot?.plot}</p>
                  <p className="cast">
                    Cast:
                    {moviePlot?.cast}
                  </p>
                  <span className="close-sign" onClick={closeOverlay} onKeyDown={closeOverlay} role="button" tabIndex={0} aria-label="Close button" />
                </>
              )
          }
        </div>
      </div>
    </StyledMovieTile>
  );
};

export default MovieTile;
