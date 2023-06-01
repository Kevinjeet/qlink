import React from 'react'

const Search = () => {
  return (
      <div className='search'>
          <div className='searchForm'>
              <input type='text' placeholder='Find a user' />
          </div>
          <div className='userChat'>
              <img src='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300' alt='' />
              <div className='userChatInfo'>
                  <span>Avisha</span>
              </div>
          </div>
    </div>
  )
}

export default Search;