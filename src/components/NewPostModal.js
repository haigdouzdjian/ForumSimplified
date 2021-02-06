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

const Title = styled.p`
    font-size: 20px;
    margin: 10px 10px;
    color: rgba(0, 0, 0, 0.75);
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
    margin-bottom: 2rem;
`

const Button = styled.button`
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

const Input = styled.input`
    background: none;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    width: 60%;
    font-size: 12px;
    margin-bottom: 2rem;
    &::placeholder {
        color: rgba(0, 0, 0, 0.35);
    }
`

const TextArea = styled.textarea`
    background: none;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    width: 60%;
    font-size: 12px;
    font-family: "Lato", sans-serif;
    &::placeholder {
        color: rgba(0, 0, 0, 0.35);
    }
`

const ItemContainer = styled.div`
    font-weight: 300;
    font-size: 12px;
    margin: 0 10px;
    color: rgba(0, 0, 0, 0.55);
    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 95%;
`

const handlePost = (postTitle, postDesc, setShow) => {
    if (postTitle != "" && postDesc != "") {
        var currentDate = moment().format('l');
        var db = firebase.firestore()
        var newPost = db.collection('posts').doc()
        newPost.set({
            date: currentDate,
            description: postDesc,
            replies: [],
            title: postTitle
        }, { merge: true }).then(docRef => {
            console.log('Successfully created post with Id: ' + newPost.id)
            setShow(false)
        })
        .catch(error => {
            console.log('Error', error)
        })
    }
}

const NewPostModal = (props) => {
    const [postTitle, setPostTitle] = useState('')
    const [postDesc, setPostDesc] = useState('')
    const res = props.show && (
        <ModalOverlay>
            <ModalContainer>
                <ModalBody>
                    <TopContainer>
                        <Title>
                            Create New Post
                        </Title>
                        <ModalClose onClick={() => props.setShow(false)}>
                            x
                        </ModalClose>
                    </TopContainer>
                    <ItemContainer>
                        <Input type='text' placeholder='Title here...' onChange={(e) => setPostTitle(e.target.value)}/>
                        <TextArea rows='4' type='text' placeholder='Description here...' onChange={(e) => setPostDesc(e.target.value)}/>
                        <Button onClick={() => handlePost(postTitle, postDesc, props.setShow)}>Post</Button>
                    </ItemContainer>
                </ModalBody>
            </ModalContainer>
        </ModalOverlay>
    )

    return res;
}

export default NewPostModal;