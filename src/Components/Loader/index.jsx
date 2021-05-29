import React from 'react';

import styled from 'styled-components';

const AnimateLoader = styled.div`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  font-family: 'IBMPlexSansKR-Bold';
  color: #c9f5f3;

  & span {
    display: inline-black;
    margin: 0 0.05rem;
    animation: loading 1.4s infinite alternate;
    font-size: 5rem;
  }
  ${(props) => {
    let animationDelay = '';
    for (let i = 1; i < props.strSize; i += 1) {
      animationDelay += `
         & span:nth-child(${i}) {
           animation-delay: ${0.1 * i}s;
         }

         `;
    }
    return animationDelay;
  }}
`;

const BlackMask = styled.div`

  background-color: black;
  opacity: 0.4;
  z-index: 1;
  position: absolute;

  width: 100%;
  height: 100%;

`;

function Loader() {
  const loadingMsg = 'Dagather';
  return (
    <>
      <AnimateLoader strSize="8">
        {[...loadingMsg].map((msg) => <span key={msg + Math.random(3)}>{msg}</span>)}
      </AnimateLoader>
      <BlackMask />
    </>
  );
}

export default Loader;
