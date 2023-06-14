

import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';

function ProfileView(props) {
  const [profile, setProfile] = useState();
  const { token } = useAuthContext();

  useEffect(() => {
    const getProfile = async () => {
      try {
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
      } catch (error) {
        console.error('Error:', error);
      }
    };
    if (props.user) {
      getProfile();
    }
  }, [token, props.user]);

  return (
    <div className="flex justify-center items-center h-screen bg-orange-300">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">My Profile</h1>
          {profile ? (
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="flex flex-col justify-between p-4 leading-normal">
                  <div className="data-box">
                    <dt className="text-lg font-medium">Profile Picture:</dt>
                    <dd className="mt-1">
                      <img src={profile.profile_picture_url} alt="Profile" />
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">Other pictures:</dt>
                    <dd className="mt-1">
                      <img src={profile.other_picture} alt="Other" />
                    </dd>
                  </div>
                <dl className="divide-y divide-gray-400">
                  <div className="data-box">
                    <dt className="text-lg font-medium">Name:</dt>
                    <dd className="mt-1 text-gray-900 dark:text-white">
                      {profile.first_name} {profile.last_name}
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">Gender:</dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-400">
                      {profile.gender}
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">Pronouns:</dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-400">
                      {profile.pronouns}
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">Location:</dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-400">
                      {profile.location}
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">About Me:</dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-400">
                      {profile.about_me}
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">Looking for:</dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-400">
                      {profile.looking_for}
                    </dd>
                  </div>
                  <div className="data-box">
                    <dt className="text-lg font-medium">Interests:</dt>
                    <dd className="mt-1 text-gray-700 dark:text-gray-400">
                      {profile.interests}
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-center items-center p-4 dark:bg-gray-700 md:justify-end md:rounded-b-lg">
                <Link
                  to="/users/my_profile/edit"
                  className="text-purple-600 hover:text-purple-800"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileView;
