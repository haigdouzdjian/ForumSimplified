import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PostItem from './PostItem';
import { ReactComponent as Plus } from '../images/plus.svg';
import NewPostModal from './NewPostModal';

const TileContainer = styled.ul`
    max-width: 80vw;
    list-style: none;
    margin: 3rem auto;
    padding: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

const PlusContainer = styled.div`
    margin: 0 auto;
    width: 28px;
    height: 28px;
    padding-top: 2rem;
    transition: .4s ease-in-out;
    text-align: center;
    &:hover {
        cursor: pointer;
        color: #0CABCD;
    }
`

const bringDownFade = keyframes`
  from {
      transform: translateY(-50%);opacity: 0;
      }
  to {
      transform: translateY(0);opacity: 1;
      }
`

const ModalWrapper = styled.a`
    text-decoration: none;
    margin: 10px;
    animation: ${bringDownFade} 1s;
`

const PostsContainer = (props) => {
    
    const [show, setShow] = useState(false)

    return (
        <>
            <PlusContainer>
                <ModalWrapper onClick={() => setShow(true)}>
                    <Plus />
                </ModalWrapper>
            </PlusContainer>
            <NewPostModal show={show} setShow={setShow} />

            {/* OR click others to reply */}
            <TileContainer>
                {
                props.postsList && props.postsList.map((e, key) => <PostItem key={key} data={e} />)
                }
            </TileContainer>
        </>
    )
}

export default PostsContainer;