// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
// import { useParams } from 'react-router-dom';

// function OtherProfile() {
//   const [profile, setProfile] = useState(null);
//   const {username}= useParams();
//   const { token } = useAuthContext();

//   useEffect(() => {
//     const getProfile = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${username}`,
//           {
//             credentials: 'include',
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (response.ok) {
//           const data = await response.json();
//           setProfile(data);
//         } else {
//           // Handle error response
//           console.error('Failed to fetch profile:', response.status);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     };

//     getProfile();
//   }, [token, username]);

//   return (
//     <>
//       <h1>Profile</h1>
//       {profile ? (
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Last Name</th>
//               <th>Gender</th>
//               <th>Profile Picture</th>
//               <th>Other pictures</th>
//               <th>Pronouns</th>
//               <th>Location</th>
//               <th>Looking for</th>
//               <th>About Me</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{profile.first_name}</td>
//               <td>{profile.last_name}</td>
//               <td>{profile.gender}</td>
//               <td>
//                 <img src={profile.profile_picture_url} alt="Profile" />
//               </td>
//               <td>
//                 <img src= {profile.other_picture} alt="Other"/>
//               </td>
//               <td>{profile.pronouns}</td>
//               <td>{profile.location}</td>
//               <td>{profile.looking_for}</td>
//               <td>{profile.about_me}</td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </>
//   );
// }

// export default OtherProfile;



// style was added
import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { useParams } from 'react-router-dom';

function OtherProfile() {
  const [profile, setProfile] = useState(null);
  const { username } = useParams();
  const { token } = useAuthContext();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${username}`,
          {
            credentials: 'include',
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        } else {
          // Handle error response
          console.error('Failed to fetch profile:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getProfile();
  }, [token, username]);

  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Profile</h1>
        {profile ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Profile Picture</th>
                <th>Other pictures</th>
                <th>Pronouns</th>
                <th>Location</th>
                <th>Looking for</th>
                <th>About Me</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{profile.first_name}</td>
                <td>{profile.last_name}</td>
                <td>{profile.gender}</td>
                <td>
                  <img src={profile.profile_picture_url} alt="Profile" />
                </td>
                <td>
                  <img src={profile.other_picture} alt="Other" />
                </td>
                <td>{profile.pronouns}</td>
                <td>{profile.location}</td>
                <td>{profile.looking_for}</td>
                <td>{profile.about_me}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>
    </div>
  );
}

export default OtherProfile;
