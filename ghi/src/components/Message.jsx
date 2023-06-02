import React from 'react';

const Message = () => {
  return (
    <div className='message owner'>
      <div className='messageInfo'>
      <img
        src='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300'
        alt=''
      />
        <span>look i'm a cat</span>
        </div>
      <div className='messageContent'>
        <p>me 2</p>
        <img
          src='https://images.pexels.com/photos/2835623/pexels-photo-2835623.jpeg?auto=compress&cs=tinysrgb&w=300'
          alt=''
        />

      </div>
    </div>
  );
};

export default Message;
