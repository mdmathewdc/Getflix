import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import device from './constants/breakpoints';

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 16px 8px;
  background: white;
  align-items: center;
  color: white;
  background: black;
  margin: 0 20px;

  p {
    font-size: 20px;
    color: red;
    font-weight: 700;
    letter-spacing: 3px;
  }
`;

const SearchBar = styled.div`
input {
  position: relative;
  padding: 10px 10px 10px 35px;
  border-radius: 50px;
}

@media ${device.TABLET} {
  input {
    padding: 10px 100px 10px 35px;
  }
}

img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  left: 30px;
  z-index: 2;
}

`;

type HeaderProps = {
  setSearchQuery: any;
}

const Header: FunctionComponent<HeaderProps> = ({ setSearchQuery }) => {
  const handleSearch = (event: { target: HTMLInputElement }) => {
    setSearchQuery(event.target.value);
  };

  const renderSearchBar = () => (
    <SearchBar>
      <img className="search-icon" src="https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/search-512.png" alt="Search icon" />
      <input type="text" id="search-bar" placeholder="Search..." onChange={handleSearch} />
    </SearchBar>
  );

  return (
    <StyledHeader>
      <p>GETFLIX</p>
      {renderSearchBar()}
    </StyledHeader>
  );
};

export default Header;
