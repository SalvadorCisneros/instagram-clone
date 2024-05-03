 import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/post/post';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, onSnapshot } from "firebase/firestore";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import instagramLogo from "../src/assets/images/instagram-logo.png"

function App() {
  const [posts, setPosts] = useState([]); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  

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
        setPosts(snapshot.docs.map(doc => ({
            id: doc.id,
            post: doc.data()
        })));  
    });
}, []);


const signUp = (event) => {
  event.preventDefault();

  createUserWithEmailAndPassword(auth, email, password)
    .then((authUser) => {
      return updateProfile(authUser.user, {
        displayName: username,
      });
    })
    .catch((error) => alert(error.message));
    
};

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  useEffect(() => {
  onAuthStateChanged(auth,(authUser) => {
    if (authUser){
      setUser(authUser);

      if (authUser.displayName){
        
      }  else{

        if (authUser) {
          return updateProfile(authUser, {
            displayName: username,
          });
        }
      }
    } else{
      setUser(null);
    }
  })
}, [user, username]);


  return (
    <div className="App">

      
    <div className='navBarContainer'>
      <img src={instagramLogo} alt="" />

      <div className='signContainer'>
      {user ? (
        <Avatar>{user.displayName.charAt(0)}</Avatar>
      ):(
        null
      )}

    {user ? (
        null
      ): (
        <button className='signButton' onClick={() => setOpenSignIn(true)}>Sign In</button>
      )}
      
      <Modal 
      open={openSignIn} 
      onClose={() => setOpenSignIn(false)}>
        
        <div className='signInContainer'>
          <div className='signInButtonsContainer'>
          <TextField
          className='inputTextField'
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          
        />
          <TextField
          className='inputTextField'
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button className='signButton' type='submit' onClick={signIn}>Sign In</button>
            
          </div>
        

        
        </div>

      </Modal>
      {user ? (
        <button className='signButton' variant="outlined" onClick={() => auth.signOut()}>Log Out</button>
      ): (
        <button className='signButton' variant="outlined" onClick={() => setOpenSignUp(true)}>Sign Up</button>
      )}
      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
        
      >
        <div className='modalContainer'>
        <TextField
          className='inputTextField'
          required
          id="outlined-required"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
         
        />
          <TextField
          className='inputTextField'
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          
        />
          <TextField
          className='inputTextField'
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
          <button className='signButton' type='submit' variant="outlined" onClick={signUp}>Sign Up</button>
        </div>
      </Modal>

      </div>

      
      
      
    </div>
     

      
      
      {posts.map(post => (
        <Post key={post.id} id={post.id} post={post.post} />
      ))}
    </div>
  );
}

export default App;
