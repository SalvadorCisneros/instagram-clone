 import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/post/post';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { collection, onSnapshot } from "firebase/firestore";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import NavBar from './components/navBar/navBar';

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
      console.log(authUser);
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
      {user ? (
        <NavBar user={user.displayName}/>
      ): (
        null
      )}

      {user ? (
        null
      ): (
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
      )}
      
      <Modal 
      open={openSignIn} 
      onClose={() => setOpenSignIn(false)}>
        
        <div className='signInContainer'>
        <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          
        />
          <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type='submit' variant="outlined" onClick={signIn}>Sign In</Button>
        </div>

      </Modal>
      {user ? (
        <Button variant="outlined" onClick={() => auth.signOut()}>Log Out</Button>
      ): (
        <Button variant="outlined" onClick={() => setOpenSignUp(true)}>Sign Up</Button>
      )}
      <Modal
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
        
      >
        <div className='modalContainer'>
        <TextField
          required
          id="outlined-required"
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
         
        />
          <TextField
          required
          id="outlined-required"
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          
        />
          <TextField
          required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
          <Button type='submit' variant="outlined" onClick={signUp}>Sign Up</Button>
        </div>
      </Modal>
      
      {posts.map(post => (
        <Post key={post.id} id={post.id} post={post.post} />
      ))}
    </div>
  );
}

export default App;
