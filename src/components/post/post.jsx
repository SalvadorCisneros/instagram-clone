import React from 'react';
import "./post.css";
import Avatar from '@mui/material/Avatar';

export default function Post({ id, post }) {
  const { image, description, user } = post;

  return (
    <div className='postContainer'>
      <div className='userContainer'>
        <Avatar>{user.charAt(0)}</Avatar>
        <h2>{user}</h2>
      </div>
      <img src={image} alt="" />
      <div className='descriptionContainer'>
        <h4>{user}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}
