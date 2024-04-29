import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/post/post';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, onSnapshot } from "firebase/firestore";


function App() {
  const [posts, setPosts] = useState([]); 
  

  const firebaseConfig = {
    apiKey: "AIzaSyDBPqjj3lEJmgOwHpn_Q_M_a7PPctqptak",
    authDomain: "instagram-clone-9a8c9.firebaseapp.com",
    projectId: "instagram-clone-9a8c9",
    storageBucket: "instagram-clone-9a8c9.appspot.com",
    messagingSenderId: "671570169146",
    appId: "1:671570169146:web:c4b1840e870ab31b0c1403",
    measurementId: "G-T5B5D68672"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const storage = getStorage(app);
  const postsCollection = collection(db, 'post');

  useEffect(() => {
      onSnapshot(postsCollection, (snapshot) => {
          setPosts(snapshot.docs.map(doc => doc.data()));
      });
  }, []);

  return (
    <div className="App">
      {posts.map( post => (
        <Post image={post.image} description={post.description} user={post.user} />
      ))

      }
      
    </div>
  );
}

export default App;
