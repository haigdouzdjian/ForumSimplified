import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import firebase from 'firebase';
import moment from 'moment';

const bringDownFade = keyframes`
  from {
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%); 
    opacity: 0;
    }
  to {
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
    }
`

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 98;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
`

const ModalContainer = styled.div`
    position: relative;
    z-index: 99;
    width: 100%;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
    animation: ${bringDownFade} .2s;
`

const ModalBody = styled.div`
    width: 400px;
    height: 300px;
    background-color: #f4f4f4;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 20px 60px 10px rgba(0,0,0,0.2);
    margin: 0 auto;
    min-height: 100px;
    padding: 20px 40px 20px 30px;
    border-radius: 6px;
    color: rgba(0, 0, 0, 0.75);
    overflow: auto;
`

const TileHeading = styled.p`
    font-size: 20px;
    margin: 10px 10px;
    color: rgba(0, 0, 0, 0.75);
`

const DescriptionContainer = styled.p`
    font-weight: 300;
    font-size: 16px;
    margin: 10px 10px;
`

const DateContainer = styled.p`
    font-weight: 300;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.45);
    margin: 2rem 10px 1rem 10px;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const ModalClose = styled.button`
    font-size: 20px;
    border: 0;
    -webkit-appearance: none;
    background: none;
    color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
    transition: .4s ease-out;
    &:hover {
        color: #0CABCD;
    }
`

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const RepliesContainer = styled.div`
    font-weight: 300;
    font-size: 12px;
    margin: 0 10px;
    color: rgba(0, 0, 0, 0.55);
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 95%;
`

const ReplyButton = styled.button`
    margin: 2rem 0;
    background: none;
    padding: 4px 6px;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, 0.55);
    font-size: 12px;
    text-decoration: none;
    cursor: pointer;
    transition: .4s ease-out;
    &:hover {
        border-color: #0CABCD;
        color: #0CABCD;
    }
`

const ReplyInput = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    width: 60%;
    font-size: 12px;
    &::placeholder {
        color: rgba(0, 0, 0, 0.35);
    }
`

const ReplyDate = styled.div`
    color: rgba(0, 0, 0, 0.45);
`

const handleReply = (replyInput, id) => {
    if (replyInput != "") {
        var currentDate = moment().format('l');
        var db = firebase.firestore()
        var newReply = db.collection('posts').doc(id)
        newReply.update({
            replies: firebase.firestore.FieldValue.arrayUnion({
                replyDate: currentDate,
                replyDescription: replyInput
            })
        }).then(docRef => {
            console.log('Successfully replied to post id: ' + id)
        })
        .catch(error => {
            console.log('Error', error)
        })
    }
}

const Modal = (props) => {
    const [replyInput, setReplyInput] = useState('')
    const res = props.show && (
        <ModalOverlay>
            <ModalContainer>
                <ModalBody>
                    <TopContainer>
                        <TileHeading>
                            {props.arr.title}
                        </TileHeading>
                        <ModalClose onClick={() => props.setShow(false)}>
                            x
                        </ModalClose>
                    </TopContainer>
                    <DescriptionContainer>
                        {props.arr.description}
                    </DescriptionContainer>
                    <DateContainer>
                         {props.arr.replies.length} comment(s)
                         <div>
                            {props.arr.date}
                         </div>
                    </DateContainer>
                    {props.arr.replies && props.arr.replies.map((e, key) => 
                        <RepliesContainer>
                            {e.replyDescription}
                            <ReplyDate>
                                {e.replyDate}
                            </ReplyDate>
                        </RepliesContainer>   
                    )}
                    <RepliesContainer>
                        <ReplyInput type='text' placeholder='Reply here...' onChange={(e) => setReplyInput(e.target.value)}/>
                        <ReplyButton onClick={() => handleReply(replyInput, props.arr.id)}>Reply</ReplyButton>
                    </RepliesContainer>
                </ModalBody>
            </ModalContainer>
        </ModalOverlay>
    )

    return res;
}

export default Modal;