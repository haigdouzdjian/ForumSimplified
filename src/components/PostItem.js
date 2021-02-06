import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as Comment } from '../images/message-circle.svg'
import Modal from './Modal'

const CommentContainer = styled.div`
    opacity: 0;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 30px;
    bottom: 20px;
    transition: .4s ease-in-out;
`

const TileWrapper = styled.li`
    min-height: 100px;
    margin: .1rem;
    display: block;
    position: relative;
    padding: 20px 40px 20px 30px;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.75);
    background-color: rgba(0, 0, 0, 0.05);
    &:hover {
        transition: transform .4s ease-in-out;
        -ms-transform: scale(1.03);
        -webkit-transform: scale(1.03);
        transform: scale(1.03);
        cursor: pointer; 
        background-color: rgba(0, 0, 0, 0.085);
        & > ${CommentContainer} {
            transform: translate(0, 2px);
            opacity: 1;
            color: #0CABCD;
        }
    };
`

const TileHeading = styled.p`
    font-size: 18px;
    margin: 10px 10px;
    color: rgba(0, 0, 0, 0.75);
`

const DescriptionContainer = styled.p`
    font-weight: 300;
    font-size: 14px;
    margin: 10px 10px;
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



const PostItem = (props) => {

    const [show, setShow] = useState(false)

    const id = props.data.id
    const date = props.data.date
    const replies = props.data.replies
    const title = props.data.title
    const description = props.data.description

    const arr = {id: id, date: date, replies: replies, title: title, description: description}
    
    return (
        <>
            <ModalWrapper onClick={() => setShow(true)}>
                <TileWrapper>
                    <TileHeading>
                        {title}
                    </TileHeading>
                    <DescriptionContainer>
                        {description}
                    </DescriptionContainer>
                    <CommentContainer>
                        <Comment />
                    </CommentContainer>
                </TileWrapper>
            </ModalWrapper>
            <Modal arr={arr} show={show} setShow={setShow} />
        </>
    )
}

export default PostItem;