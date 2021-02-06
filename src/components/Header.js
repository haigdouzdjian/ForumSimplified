import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Menu } from '../images/menu.svg';

const StyledHeader = styled.header`
  max-width: 80%;
  margin: 0 auto;
  padding: 20px 45px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const LogoExtension = styled.h3`
  display: inline-block;
  color: rgba(0, 0, 0, 0.75);
`

const MenuContainer = styled.div`
    padding: 5px 0 0 0;
    width: 24px;
    height: 24px;
    transition: .4s ease-out;
    color: rgba(0, 0, 0, 0.75);
    &:hover {
        cursor: pointer;
        color: #0CABCD;
        ${Menu} .first {
            transition: .4s ease-out;
            transform: translate(0, -1px);
        }
        
        ${Menu} .last {
            transition: .4s ease-out;
            transform: translate(0, 1px);
        }
    }
`

const Header = () => {
    return (
        <StyledHeader>
            <LogoExtension>Forum Simplified</LogoExtension>
            <MenuContainer>
                <Menu />
            </MenuContainer>
        </StyledHeader>
    );
}

export default Header;