import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { darken } from 'polished';

import thumb from 'Assets/img/icon/thumb.svg';

const Elem = styled.div`
    background-color: ${(props) => (props.color === 'light' ? '#4cc2bb' : 'lightseagreen')};
    min-width: 30%;
    min-height: 130px;
    padding: 1rem;
    margin: 0.5rem;

    border-radius: 8px;

    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    box-shadow: 4px 4px 4px lightgray;

    &:hover {
      background-color: ${(props) => darken(0.15, props.color === 'light' ? '#4cc2bb' : 'lightseagreen')};
      transform: scale(1.05);
      transition: transform 300ms ease;
    }

  `;

const Text = styled.div`
    color: white;
    font-family: 'IBMPlexSansKR-Bold';
  `;

const Title = styled(Text)`
    font-size: 1.8rem;
`;

const Author = styled(Text)`
    font-size: 1.5rem;
    font-family: 'IBMPlexSansKR-Regular';

  `;

const LikeContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 12px;
    background-color: white;
  `;

const Like = styled.img`
    width: 1.5rem;
    height: 1.5rem;
    margin-right: 1rem;
  `;

const LikeNum = styled.span`
    color: white;
    font-family: 'IBMPlexSansKR-Regular';
    font-size: 1.5rem;
    color: black;
  `;
const Footer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position:relative;
  `;

function Slide(props) {
  const history = useHistory();
  const { title, author, likeNum, color } = props;
  const [onHover, setOnHover] = useState(false);
  const toggle = () => setOnHover(!onHover);

  const pushToRobotDetail = () => {
    history.push({
      pathname: '/script/1',
    });
  };

  return (
    <Elem
      onMouseEnter={toggle}
      onMouseLeave={toggle}
      color={color}
      onClick={pushToRobotDetail}
    >
      <Title>
        {title}
      </Title>
      <Footer>
        <Author>
          {author}
        </Author>
        <LikeContainer>
          <Like src={thumb} alt="like" />
          <LikeNum>{likeNum}</LikeNum>
        </LikeContainer>
      </Footer>
    </Elem>
  );
}

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  likeNum: PropTypes.number.isRequired,
  color: PropTypes.oneOf(['light', 'normal']).isRequired,
};

export default Slide;