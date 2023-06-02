// import React, {useEffect, useState} from 'react'
// import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';




// function ProfileView(props){
//     const [profile, setProfile]= useState()

//     const { token } = useAuthContext()
//     console.log(props.user)


//     const getProfile= async()=>{
//         const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`, {
//             credentials:"include",
//             headers: {Authorization: `Bearer ${token}` },
//             method: "get",
//         })
//         if (response.ok){
//             const data= await response.json();
//             setProfile(data);
//         }
//     }

//     useEffect(()=>{
//         if (props.user){
//             getProfile();
//         }
//     }, [token, props.user])

//   return (
//       <>
//         <h1>Your Profile</h1>
//         {/* add the navlink to update a profile? */}
//         {/* <div className="d-flex justify-content-end">
//             <NavLink className="nav-link" to="/technicians/create">
//                 <button type="button" className="btn btn-success">Edit profile</button>
//             </NavLink>
//         </div> */}
//         <table className="table table-striped">
//         <thead>
//             <tr>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Gender</th>
//             <th>Profile Picture</th>
//             <th>Other pictures</th>
//             <th>Pronouns</th>
//             <th>Location</th>
//             <th>Looking for</th>
//             <th>About Me</th>
//             </tr>
//         </thead>
//         <tbody>
//             {profile ? (
//                 <tr>
//                 <td>{ profile.first_name }</td>
//                 <td>{ profile.last_name }</td>
//                 <td>{ profile.gender }</td>
//                 <img src={ profile.profile_picture_url }/>
//                 <td>{profile.other_picture}</td>
//                 <td>{profile.location}</td>
//                 <td>{profile.looking_for}</td>
//                 <td>{profile.about_me}</td>
//                 </tr>
//             ):null}
//         </tbody>
//         </table>
//       </>
//   );
// }

// export default ProfileView

// // import "./input.css";
// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

// function ProfileView(props) {
//   const [profile, setProfile] = useState();
//   const { token } = useAuthContext();
//   console.log(props.user);

//   const getProfile = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`,
//       {
//         credentials: 'include',
//         headers: { Authorization: `Bearer ${token}` },
//         method: 'get',
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       setProfile(data);
//     }
//   };

//   useEffect(() => {
//     if (props.user) {
//       getProfile();
//     }
//   }, [token, props.user]);

//   return (
//     <>
//       <h1>Your Profile</h1>
//       {/* Add the navlink to update a profile? */}
//       {/* <div className="d-flex justify-content-end">
//           <NavLink className="nav-link" to="/technicians/create">
//               <button type="button" className="btn btn-success">Edit profile</button>
//           </NavLink>
//       </div> */}
//       <div className="card" style={{ width: '18rem' }}>
//         <div className="card-body">
//           <h5 className="card-title">Personal Information</h5>
//           {profile ? (
//             <>
//               <p className="card-text">First Name: {profile.first_name}</p>
//               <p className="card-text">Last Name: {profile.last_name}</p>
//               <p className="card-text">Gender: {profile.gender}</p>
//               <p className="card-text">Pronouns: {profile.pronouns}</p>
//               <p className="card-text">Location: {profile.location}</p>
//             </>
//           ) : null}
//         </div>
//       </div>
//       <div className="card" style={{ width: '35rem' }}>
//         <div className="card-body">
//           <h5 className="card-title">Profile Pictures</h5>
//           {profile ? (
//             <>
//               <img src={profile.profile_picture_url} className="card-img-top" alt="Profile" />
//               <p className="card-text">Other Pictures: {profile.other_picture}</p>
//             </>
//           ) : null}
//         </div>
//       </div>
//       <div className="card">
//         <div className="card-body">
//           <h5 className="card-title">About Me</h5>
//           {profile ? <p className="card-text">{profile.about_me}</p> : null}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ProfileView;


// this works

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

// function ProfileView(props) {
//   const [profile, setProfile] = useState();
//   const { token } = useAuthContext();
//   console.log(props.user);

//   const getProfile = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`,
//       {
//         credentials: 'include',
//         headers: { Authorization: `Bearer ${token}` },
//         method: 'get',
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       setProfile(data);
//     }
//   };

//   useEffect(() => {
//     if (props.user) {
//       getProfile();
//     }
//   }, [token, props.user]);

//  return (
//     <div className="bg-white overflow-hidden shadow rounded-lg">
//       <div className="px-4 py-5 sm:p-6">
//         <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
//         <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
//           <div className="sm:col-span-1">
//             <dt className="text-sm font-medium text-gray-500">Name</dt>
//             <dd className="mt-1 text-sm text-gray-900">{profile ? `${profile.first_name} ${profile.last_name}` : '-'}</dd>
//           </div>
//           <div className="sm:col-span-1">
//             <dt className="text-sm font-medium text-gray-500">Gender</dt>
//             <dd className="mt-1 text-sm text-gray-900">{profile ? profile.gender : '-'}</dd>
//           </div>
//           <div className="sm:col-span-1">
//             <dt className="text-sm font-medium text-gray-500">Pronouns</dt>
//             <dd className="mt-1 text-sm text-gray-900">{profile ? profile.pronouns : '-'}</dd>
//           </div>
//           <div className="sm:col-span-1">
//             <dt className="text-sm font-medium text-gray-500">Location</dt>
//             <dd className="mt-1 text-sm text-gray-900">{profile ? profile.location : '-'}</dd>
//           </div>
//           <div className="sm:col-span-2">
//             <dt className="text-sm font-medium text-gray-500">About Me</dt>
//             <dd className="mt-1 text-sm text-gray-900">{profile ? profile.about_me : '-'}</dd>
//           </div>
//           <div className="sm:col-span-2">
//             <dt className="text-sm font-medium text-gray-500">Profile Picture</dt>
//             <dd className="mt-1 text-sm text-gray-900">
//               {profile && profile.profile_picture_url && (
//                 <img src={profile.profile_picture_url} alt="Profile" className="w-20 h-20 rounded-full" />
//               )}
//             </dd>
//           </div>
//           {/* Render other pictures */}
//           {profile && profile.other_pictures && (
//             <div className="sm:col-span-2">
//               <dt className="text-sm font-medium text-gray-500">Other Pictures</dt>
//               <dd className="mt-1 text-sm text-gray-900">
//                 {profile.other_pictures.map((picture, index) => (
//                   <img key={index} src={picture} alt={`Picture ${index + 1}`} className="w-20 h-20 rounded-full" />
//                 ))}
//               </dd>
//             </div>
//           )}
//         </dl>
//       </div>
//     </div>
//   );
// }


// export default ProfileView
function ProfileView(props) {
  const [profile, setProfile] = useState();
  const { token } = useAuthContext();
  console.log(props.user);

  const getProfile = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/users/${props.user.username}`,
      {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
        method: 'get',
      }
    );
    if (response.ok) {
      const data = await response.json();
      setProfile(data);
    }
  };

  useEffect(() => {
    if (props.user) {
      getProfile();
    }
  }, [token, props.user]);

  return (
    <div className='bg-orange-300'>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Your info:</h3>
      </div>
      <div className="mt-6 border-t border-purple-500">
        <dl className="divide-y divide-purple-500">
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? `${profile.first_name} ${profile.last_name}` : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Gender</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.gender : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Pronouns</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.pronouns : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Location</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.location : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">About Me</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">{profile ? profile.about_me : '-'}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Profile Picture</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">
              {profile && profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt="Profile Picture"
                  style={{ width: '400px', height: '400px' }}
                  className="square-full"
                />
              ) : (
                '-'
              )}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Other Picture</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700">
              {profile && profile.other_picture ? <img src={profile.other_picture} alt="Other Picture" style={{ width: '300px', height: '300px' }} className="square-full"/> : '-'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
export default ProfileView
