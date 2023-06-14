import React from 'react'
import { useNavigate } from "react-router-dom";
import './style.scss';
import ChatsPage from './ChatsPage';

const MatchesPage = ({ userInfo }) => {

  const navigate = useNavigate();
  const matches = userInfo.matches.split(', ')
  matches.shift()

  return (
    <div className='matches-page'>
      <h1>Your Matches</h1>
      {matches.length > 0 ?
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(`/users/${match}/view_profile`)}
              >
                {match}
              </button>
            </li>
          ))}
        </ul>
        : <h3>No matches yet.</h3>
      }
      <ChatsPage user={userInfo} />
    </div>
  )
}

export default MatchesPage
