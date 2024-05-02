import React from 'react'
import "./navBar.css"
import instagramLogo from "../../assets/images/instagram-logo.png"
import Avatar from '@mui/material/Avatar';

export default function NavBar({user}) {
  return (
    <div className='navBarContainer'>
      <img src={instagramLogo} alt="" />
      <Avatar>{user.charAt(0)}</Avatar>
      
    </div>
  )
}
