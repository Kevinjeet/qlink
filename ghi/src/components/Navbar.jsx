import React from 'react'

const Navbar = () => {
  return (
      <div className='navbar'>
          <span className="logo">QLink</span>
          <div className="user">
              <img src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=300" alt="" />
              <span>Avisha</span>
              <button>logout</button>
          </div>
      </div>
  )
}

export default Navbar;