import React from 'react';
import styled from 'styled-components';

const StyledLoadingIndicator = styled.div`
margin-top: 30px 0;
.content {
  align-items: center;
  background: black;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  padding: 4rem 20px;
}

.loading {
  display: flex;
  justify-content: space-between;
  max-width: 72px;
  margin: 0 auto;
  width: 100%;
}

.dot {
  animation: loading 1s cubic-bezier(0.55, -0.77, 0.42, 1.79) 0s infinite normal both running;
  background: red;
  border-radius: 50%;
  display: block;
  height: 1rem;
  width: 1rem;
}
.dot:nth-child(2) {
  animation-name: ball-2;
}
.dot:nth-child(3) {
  animation-name: ball-3;
}

@keyframes loading {
  0% {
    transform: translateY(0);
  }
  4% {
    transform: translateY(22%);
  }
  25% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(0);
  }
}
@keyframes ball-2 {
  25% {
    transform: translateY(0);
  }
  29% {
    transform: translateY(22%);
  }
  50% {
    transform: translateY(-100%);
  }
  75% {
    transform: translateY(0);
  }
}
@keyframes ball-3 {
  50% {
    transform: translateY(0);
  }
  54% {
    transform: translateY(22%);
  }
  75% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
`;

const LoadingIndicator = () => (
  <StyledLoadingIndicator>
    <div className="loading">
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  </StyledLoadingIndicator>

);

export default LoadingIndicator;
