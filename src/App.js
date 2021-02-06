import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import Header from './components/Header'
import Footer from './components/Footer'
import PostsContainer from './components/PostsContainer'

const App = () => {

  var firebaseConfig = {
    apiKey: "AIzaSyAnoUFerlb_vdSvIL9z-w1LfmKz0fkmEcM",
    authDomain: "forumsimplified-6cc86.firebaseapp.com",
    projectId: "forumsimplified-6cc86",
    storageBucket: "forumsimplified-6cc86.appspot.com",
    messagingSenderId: "124340009325",
    appId: "1:124340009325:web:c199802f982c56dc0ec264",
    measurementId: "G-7EQK6ET7G1"
}

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  var db = firebase.firestore()

  const [postsList, setPostsList] = useState()

  useEffect(() => {
    const collection = db.collection('posts')
    const unsubscribe = collection.onSnapshot(snapshot => {
      const temp = snapshot.docs.map((doc) => {
        return {id: doc.id, ...doc.data()}
      })
      setPostsList(temp)
    })
    return () => unsubscribe
  }, [])

  return (
    <>
    <Header />
    <PostsContainer postsList={postsList}/>
    <Footer />
    </>
  )
}

export default App;
