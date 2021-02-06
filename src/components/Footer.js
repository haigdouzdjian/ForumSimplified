import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Heart } from '../images/heart.svg';

const StyledFooter = styled.footer`
    width: 75vw;
    margin: 3rem auto 0;
    padding: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid rgba(255,255,255, 0.1);
`

const CreditContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const heartAnimation = keyframes`
  0% {
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  45% {
    -moz-transform: scale(1.2);
    -ms-transform: scale(1.2);
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  75% {
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`

const HeartContainer = styled.div`
    display: inline-block;
    padding: 0 4px;
    color: rgba(0,0,0, 0);
    animation: ${heartAnimation} 1850ms ease-in-out 0s infinite normal;
`

const HeartText = styled.span`
    color: rgba(0, 0, 0, 0.55);
    font-size: 15px;
`

const ListContainer = styled.ul`
    list-style: none;
    color: rgba(0, 0, 0, 0.55);
`

const ListElement = styled.li`
    display: inline-block;
    margin: 0 0 0 30px;
`

const ListAnchor = styled.a`
    transition: all .4s ease-in-out;
    text-decoration: none;
    color: currentColor;
    font-size: 15px;
    &:hover {
    color: rgba(0, 0, 0, 0.75);
    } 
`

const Footer = () => {
    return (
        <StyledFooter>
            <CreditContainer>
                <HeartText>Made with</HeartText>
                <HeartContainer>
                    <Heart />
                </HeartContainer>
                <HeartText>Haig Douzy</HeartText>
            </CreditContainer>
            <ListContainer>
                <ListElement><ListAnchor href="https://github.com/haigdouzdjian" target="_blank">Github</ListAnchor></ListElement>
                <ListElement><ListAnchor href="https://www.linkedin.com/in/haig-douzy/" target="_blank">Linked-In</ListAnchor></ListElement>
            </ListContainer>
        </StyledFooter>
    )
}

export default Footer;